import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import qrcode from 'qrcode'
import pino from 'pino'
import { 
    makeWASocket, 
    DisconnectReason, 
    useMultiFileAuthState, 
    fetchLatestBaileysVersion, 
    makeCacheableSignalKeyStore,
} from '@whiskeysockets/baileys'

const activeBots = new Map()

const handler = async (m, { conn }) => {
    try {
        const sender = m.sender.split('@')[0]
        const botSessionPath = join(process.cwd(), 'bot_sessions', sender)
        
        if (!existsSync(join(process.cwd(), 'bot_sessions'))) {
            mkdirSync(join(process.cwd(), 'bot_sessions'), { recursive: true })
        }
        if (!existsSync(botSessionPath)) {
            mkdirSync(botSessionPath, { recursive: true })
        }

        const { version } = await fetchLatestBaileysVersion()
        const { state, saveCreds } = await useMultiFileAuthState(botSessionPath)
        
        const newBot = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
            },
            browser: ['SubBot', 'Chrome', '1.0.0'],
            generateHighQualityLinkPreview: true,
        })

        let qrSent = false

        newBot.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update

            if (qr && !qrSent) {
                qrSent = true
                const qrImage = await qrcode.toDataURL(qr, { scale: 8 })
                await conn.sendMessage(m.chat, { 
                    image: Buffer.from(qrImage.split(',')[1], 'base64'),
                    caption: `Scansiona per attivare il tuo sub-bot\nSessione: ${sender}`
                }, { quoted: m })
            }

            if (connection === 'open') {
                activeBots.set(sender, newBot)

                await conn.sendMessage(m.chat, { 
                    text: `✅ Sub-bot attivo per ${sender}\nOra ha accesso a tutti i plugin!`
                }, { quoted: m })

                if (!global.conns) global.conns = []
                global.conns.push(newBot)

                // 🔥 Handler universale per i plugin
                newBot.ev.on('messages.upsert', async (chatUpdate) => {
                    try {
                        if (!chatUpdate.messages) return
                        const msg = chatUpdate.messages[0]
                        if (!msg.message) return

                        msg.isBaileys = msg.key.id.startsWith('BAE5')
                        msg.fromMe = msg.key.fromMe
                        msg.chat = msg.key.remoteJid
                        msg.sender = msg.key.participant || msg.key.remoteJid

                        for (let name in global.plugins) {
                            let plugin = global.plugins[name]
                            if (!plugin) continue

                            try {
                                // before
                                if (plugin.before) {
                                    let stop = await plugin.before(msg, { conn: newBot })
                                    if (stop) return
                                }

                                // command
                                if (plugin.command) {
                                    let commands = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
                                    for (let cmd of commands) {
                                        if (msg.message.conversation?.startsWith(global.prefix + cmd)) {
                                            await plugin.call(newBot, msg, { conn: newBot })
                                        }
                                    }
                                }

                                // after
                                if (plugin.after) {
                                    await plugin.after(msg, { conn: newBot })
                                }
                            } catch (e) {
                                console.error(`Errore plugin ${name}:`, e)
                            }
                        }
                    } catch (e) {
                        console.error('Errore handler sub-bot:', e)
                    }
                })
            }

            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
                if (shouldReconnect) {
                    console.log('Riconnessione sub-bot...')
                    setTimeout(() => handler(m, { conn }), 5000)
                } else {
                    activeBots.delete(sender)
                    const index = global.conns?.indexOf(newBot)
                    if (index !== -1) global.conns.splice(index, 1)
                    await conn.sendMessage(m.chat, { 
                        text: `❌ Sub-bot disconnesso per ${sender}`
                    }, { quoted: m })
                }
            }
        })

        newBot.ev.on('creds.update', saveCreds)

        setTimeout(() => {
            if (!qrSent && !newBot.user) {
                conn.sendMessage(m.chat, {
                    text: '⏰ Timeout: riprova il comando se non hai ricevuto il QR'
                }, { quoted: m })
            }
        }, 60000)

    } catch (error) {
        console.error('Errore creazione sub-bot:', error)
        await conn.sendMessage(m.chat, { 
            text: '❌ Errore: ' + error.message
        }, { quoted: m })
    }
}

export const stopbot = async (m, { conn }) => {
    const sender = m.sender.split('@')[0]
    if (activeBots.has(sender)) {
        const bot = activeBots.get(sender)
        await bot.logout()
        activeBots.delete(sender)
        const index = global.conns?.indexOf(bot)
        if (index !== -1) global.conns.splice(index, 1)
        await conn.sendMessage(m.chat, {
            text: '✅ Sub-bot disconnesso'
        }, { quoted: m })
    } else {
        await conn.sendMessage(m.chat, {
            text: '❌ Non hai nessun sub-bot attivo'
        }, { quoted: m })
    }
}

stopbot.command = ['stopbot', 'logout']

handler.command = ['newbot', 'serbot']
handler.help = ['Crea un nuovo sub-bot con tutti i plugin']
handler.tags = ['tools']

export default handler