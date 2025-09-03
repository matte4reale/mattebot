import { existsSync, mkdirSync, readdirSync } from 'fs'
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
            syncFullHistory: false
        })

        let qrSent = false

        newBot.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update

            if (qr && !qrSent) {
                qrSent = true
                const qrImage = await qrcode.toDataURL(qr, { scale: 8 })
                await conn.sendMessage(m.chat, {
                    image: Buffer.from(qrImage.split(',')[1], 'base64'),
                    caption: `🔑 Scansiona il QR per avviare il tuo bot personale\n👤 Sessione: ${sender}`
                }, { quoted: m })
            }

            if (connection === 'open') {
                activeBots.set(sender, newBot)
                await conn.sendMessage(m.chat, {
                    text: `✅ SubBot attivo per ${sender}\nCaricamento plugin in corso...`
                }, { quoted: m })

                const pluginsDir = join(process.cwd(), 'plugins')
                const pluginFiles = readdirSync(pluginsDir).filter(file => file.endsWith('.js'))

                for (let file of pluginFiles) {
                    try {
                        const pluginPath = join(pluginsDir, file)
                        const plugin = (await import(`file://${pluginPath}`)).default
                        
                        if (plugin && typeof plugin === 'function') {
                            newBot.ev.on('messages.upsert', async (chatUpdate) => {
                                try {
                                    await plugin.call(newBot, chatUpdate)
                                } catch (e) {
                                    console.error(`Errore nel plugin ${file}:`, e)
                                }
                            })
                        } else if (plugin && typeof plugin.handler === 'function') {
                            newBot.ev.on('messages.upsert', async (chatUpdate) => {
                                try {
                                    await plugin.handler.call(newBot, chatUpdate)
                                } catch (e) {
                                    console.error(`Errore nel plugin ${file}:`, e)
                                }
                            })
                        }

                        console.log(`✅ Plugin caricato: ${file}`)
                    } catch (e) {
                        console.error(`❌ Errore caricando plugin ${file}:`, e)
                    }
                }

                if (!global.conns) global.conns = []
                global.conns.push(newBot)
            }

            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
                if (shouldReconnect) {
                    console.log('🔄 Riconnessione subbot...')
                    setTimeout(() => handler(m, { conn }), 5000)
                } else {
                    activeBots.delete(sender)
                    const index = global.conns?.indexOf(newBot)
                    if (index !== -1) global.conns.splice(index, 1)
                    await conn.sendMessage(m.chat, {
                        text: `❌ SubBot disconnesso per ${sender}`
                    }, { quoted: m })
                }
            }
        })

        newBot.ev.on('creds.update', saveCreds)

        setTimeout(() => {
            if (!qrSent && !newBot.user) {
                conn.sendMessage(m.chat, {
                    text: '⏰ Timeout: riprova se non hai ricevuto il QR'
                }, { quoted: m })
            }
        }, 60000)

    } catch (e) {
        console.error('Errore creazione SubBot:', e)
        await conn.sendMessage(m.chat, {
            text: '❌ Errore: ' + e.message
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
            text: '✅ SubBot disconnesso'
        }, { quoted: m })
    } else {
        await conn.sendMessage(m.chat, {
            text: '❌ Nessun SubBot attivo'
        }, { quoted: m })
    }
}

stopbot.command = ['stopbot', 'logout']
handler.command = ['newbot', 'serbot']
handler.help = ['Crea un nuovo bot separato']
handler.tags = ['tools']

export default handler