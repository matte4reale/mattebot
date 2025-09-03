import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import qrcode from 'qrcode'
import pino from 'pino'
import { 
    makeWASocket, 
    DisconnectReason, 
    useMultiFileAuthState, 
    fetchLatestBaileysVersion, 
    makeCacheableSignalKeyStore
} from '@whiskeysockets/baileys'

const activeBots = new Map()

const handler = async (m, { conn, args, usedPrefix, command }) => {
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
            browser: ['Bot Secondario', 'Chrome', '1.0.0'],
            generateHighQualityLinkPreview: true,
            syncFullHistory: false,
            getMessage: async (key) => {
                if (global.store) {
                    const msg = await global.store.loadMessage(key.remoteJid, key.id)
                    return msg?.message || undefined
                }
                return { conversation: 'Hello' }
            }
        })

        let qrSent = false

        newBot.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update

            if (qr && !qrSent) {
                qrSent = true
                const qrImage = await qrcode.toDataURL(qr, { scale: 8 })
                await conn.sendMessage(m.chat, { 
                    image: Buffer.from(qrImage.split(',')[1], 'base64'),
                    caption: `Scansiona per attivare il tuo bot personale\nSessione: ${sender}`
                }, { quoted: m })
            }

            if (connection === 'open') {
                activeBots.set(sender, newBot)
                await conn.sendMessage(m.chat, { 
                    text: `✅ Bot attivo per ${sender}\nIl tuo bot è ora online con tutti i plugin!`
                }, { quoted: m })

                if (global.plugins) {
                    newBot.plugin = {}
                    for (let name in global.plugins) {
                        let plugin = global.plugins[name]
                        if (plugin && plugin.command) {
                            newBot.plugin[name] = plugin
                        }
                    }
                }

                newBot.ev.on('messages.upsert', async (chatUpdate) => {
                    try {
                        const msg = chatUpdate.messages[0]
                        if (!msg.message) return
                        const text = msg.message.conversation || msg.message.extendedTextMessage?.text
                        if (!text) return

                        const prefix = text[0]
                        const [cmd, ...args] = text.slice(1).trim().split(/\s+/)
                        
                        for (let name in newBot.plugin) {
                            let plugin = newBot.plugin[name]
                            let commands = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
                            if (commands.includes(cmd)) {
                                await plugin(msg, { conn: newBot, args, usedPrefix: prefix, command: cmd, text: args.join(' ') })
                            }
                        }
                    } catch (e) {
                        console.error('Errore subbot handler:', e)
                    }
                })
            }

            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
                if (shouldReconnect) {
                    setTimeout(() => {
                        handler(m, { conn, args, usedPrefix, command })
                    }, 5000)
                } else {
                    activeBots.delete(sender)
                    const index = global.conns?.indexOf(newBot)
                    if (index !== -1) global.conns.splice(index, 1)
                    await conn.sendMessage(m.chat, { 
                        text: `❌ Bot disconnesso per ${sender}`
                    }, { quoted: m })
                }
            }
        })

        newBot.ev.on('creds.update', saveCreds)

        setTimeout(() => {
            if (!qrSent && !newBot.user) {
                conn.sendMessage(m.chat, {
                    text: '⏰ Timeout: Riprova il comando se non hai ricevuto il QR'
                }, { quoted: m })
            }
        }, 60000)

    } catch (error) {
        console.error('Errore creazione bot:', error)
        await conn.sendMessage(m.chat, { 
            text: '❌ Errore: ' + error.message
        }, { quoted: m })
    }
}

handler.before = async function (m) {
    const sender = m.sender.split('@')[0]
    if (activeBots.has(sender)) {
        const bot = activeBots.get(sender)
        if (!bot.user) {
            activeBots.delete(sender)
        }
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
            text: '✅ Bot secondario disconnesso'
        }, { quoted: m })
    } else {
        await conn.sendMessage(m.chat, {
            text: '❌ Non hai nessun bot attivo'
        }, { quoted: m })
    }
}

stopbot.command = ['stopbot', 'logout']
handler.command = ['newbot', 'serbot']
handler.help = ['Crea un nuovo bot separato']
handler.tags = ['tools']
export default handler