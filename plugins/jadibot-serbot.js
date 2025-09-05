import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys'
import qrcode from 'qrcode'
import pino from 'pino'
import fs from 'fs'
import path from 'path'

const subBots = new Map()

const handler = async (m, { conn, args }) => {
  try {
    const sender = m.sender.split('@')[0]
    const targetNumber = (args[0] || '').replace(/[^0-9]/g, '') // pulisce il numero

    if (!targetNumber) {
      return conn.sendMessage(m.chat, { text: '❌ Devi scrivere un numero. Esempio:\n.conectar +393123456789' }, { quoted: m })
    }

    if (subBots.has(targetNumber)) {
      return conn.sendMessage(m.chat, { text: `⚠️ C\'è già un subbot attivo per *${targetNumber}*` }, { quoted: m })
    }

    const sessionPath = path.join(process.cwd(), 'subsessions', targetNumber)
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

    bot.ev.on('connection.update', async (update) => {
      const { connection, pairingCode } = update

      if (pairingCode) {
        await conn.sendMessage(m.chat, {
          text: `🔑 Codice di connessione per *${targetNumber}*:\n\n*${pairingCode}*`
        }, { quoted: m })
      }

      if (connection === 'open') {
        subBots.set(targetNumber, bot)
        await conn.sendMessage(m.chat, {
          text: `✅ Subbot collegato con *${targetNumber}*`
        }, { quoted: m })
      }

      if (connection === 'close') {
        subBots.delete(targetNumber)
        await conn.sendMessage(m.chat, {
          text: `❌ Subbot disconnesso per *${targetNumber}*`
        }, { quoted: m })
      }
    })
  } catch (e) {
    console.error('Errore conectar:', e)
    await conn.sendMessage(m.chat, { text: `Errore: ${e.message}` }, { quoted: m })
  }
}

handler.command = ['conectar']
handler.help = ['conectar <numero>']
handler.tags = ['tools']

export default handler