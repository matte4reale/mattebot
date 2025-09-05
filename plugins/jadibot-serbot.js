import {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} from '@whiskeysockets/baileys'
import pino from 'pino'
import fs from 'fs'
import path from 'path'

const subBots = new Map()

const handler = async (m, { conn, args }) => {
  try {
    const targetNumber = (args[0] || '').replace(/[^0-9]/g, '')

    if (!targetNumber) {
      return conn.sendMessage(m.chat, {
        text: '❌ Devi scrivere un numero.\nEsempio: *.conectar +393123456789*'
      }, { quoted: m })
    }

    if (subBots.has(targetNumber)) {
      return conn.sendMessage(m.chat, {
        text: `⚠️ C’è già un subbot attivo per *${targetNumber}*`
      }, { quoted: m })
    }

    const sessionPath = path.join(process.cwd(), 'subsessions', targetNumber)
    if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true })

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath)
    const { version } = await fetchLatestBaileysVersion()

    const bot = makeWASocket({
      version,
      logger: pino({ level: 'silent' }),
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
      },
      browser: ['SubBot', 'Chrome', '1.0.0']
    })

    bot.ev.on('creds.update', saveCreds)

    // QUI generiamo il pairing code
    if (!bot.authState.creds.registered) {
      const code = await bot.requestPairingCode(targetNumber)
      await conn.sendMessage(m.chat, {
        text: `🔑 Codice di connessione per *${targetNumber}*:\n\n*${code}*`
      }, { quoted: m })
    }

    bot.ev.on('connection.update', async ({ connection }) => {
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
    await conn.sendMessage(m.chat, {
      text: `Errore: ${e.message}`
    }, { quoted: m })
  }
}

handler.command = ['conectar']
handler.help = ['conectar <numero>']
handler.tags = ['tools']

export default handler