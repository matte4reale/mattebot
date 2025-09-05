import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys'
import qrcode from 'qrcode'
import pino from 'pino'
import fs from 'fs'
import path from 'path'

const subBots = new Map()

const loadPlugins = async (bot) => {
  const pluginsDir = path.join(process.cwd(), 'plugins')
  if (!fs.existsSync(pluginsDir)) return

  const files = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'))
  for (const file of files) {
    try {
      const plugin = await import(path.join(pluginsDir, file))
      if (plugin.default && plugin.default.command) {
        bot.plugin = bot.plugin || {}
        bot.plugin[file] = plugin.default
      }
    } catch (e) {
      console.error(`Errore nel caricamento plugin ${file}:`, e)
    }
  }
}

const handler = async (m, { conn }) => {
  try {
    const sender = m.sender.split('@')[0]
    if (subBots.has(sender)) {
      return conn.sendMessage(m.chat, { text: '❌ Hai già un subbot attivo.' }, { quoted: m })
    }

    const sessionPath = path.join(process.cwd(), 'subsessions', sender)
    if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true })

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath)
    const { version } = await fetchLatestBaileysVersion()

    const bot = makeWASocket({
      version,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
      },
      browser: ['SubBot', 'Chrome', '1.0.0']
    })

    bot.ev.on('creds.update', saveCreds)

    let qrSent = false
    bot.ev.on('connection.update', async (update) => {
      const { connection, qr, pairingCode } = update

      if (qr && !qrSent) {
        qrSent = true
        const qrImg = await qrcode.toBuffer(qr, { scale: 8 })
        await conn.sendMessage(m.chat, {
          image: qrImg,
          caption: `📲 Scansiona questo QR per collegare il tuo subbot`
        }, { quoted: m })
      }

      if (pairingCode && !qrSent) {
        qrSent = true
        await conn.sendMessage(m.chat, {
          text: `🔑 Usa questo codice per collegare il tuo subbot:\n\n*${pairingCode}*`
        }, { quoted: m })
      }

      if (connection === 'open') {
        subBots.set(sender, bot)
        await loadPlugins(bot)
        await conn.sendMessage(m.chat, {
          text: `✅ Subbot attivato per ${sender}`
        }, { quoted: m })
      }

      if (connection === 'close') {
        subBots.delete(sender)
        await conn.sendMessage(m.chat, { text: `❌ Subbot disconnesso per ${sender}` }, { quoted: m })
      }
    })
  } catch (e) {
    console.error('Errore serbot:', e)
    await conn.sendMessage(m.chat, { text: `Errore: ${e.message}` }, { quoted: m })
  }
}

handler.command = ['serbot', 'conectar']
handler.help = ['serbot']
handler.tags = ['tools']

export default handler