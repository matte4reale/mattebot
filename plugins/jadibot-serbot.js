import { makeWASocket, useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys'
import pino from 'pino'
import fs from 'fs'
import path from 'path'

if (!global.conns) global.conns = []
if (!global.plugins) global.plugins = {}

// Carica plugin da cartella plugins
const pluginsFolder = path.join(process.cwd(), 'plugins')
for (let file of fs.readdirSync(pluginsFolder)) {
  if (file.endsWith('.js')) {
    let filepath = path.join(pluginsFolder, file)
    try {
      delete require.cache[require.resolve(filepath)]
      let plugin = require(filepath)
      global.plugins[file] = plugin.default || plugin
    } catch (e) {
      console.error('Errore caricando plugin', file, e)
    }
  }
}

let handler = async (m, { command }) => {
  if (command === 'serbot') {
    let sessionPath = `./jadibot/${m.sender.split('@')[0]}`
    let { state, saveCreds } = await useMultiFileAuthState(sessionPath)

    let sock = makeWASocket({
      logger: pino({ level: 'silent' }),
      printQRInTerminal: true,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
      },
      browser: ['SubBot', 'Chrome', '1.0.0']
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
      if (connection === 'open') {
        m.reply(`✅ SubBot avviato per ${m.sender}`)
      } else if (connection === 'close') {
        let reason = lastDisconnect?.error?.output?.statusCode
        if (reason === DisconnectReason.loggedOut) {
          fs.rmSync(sessionPath, { recursive: true, force: true })
          global.conns = global.conns.filter(c => c !== sock)
          m.reply(`❌ SubBot disconnesso per ${m.sender}`)
        }
      }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
      let msg = messages[0]
      if (!msg.message) return
      let body = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
      if (!body.startsWith('.')) return

      let args = body.slice(1).trim().split(/ +/)
      let cmd = args.shift().toLowerCase()

      for (let name in global.plugins) {
        let plugin = global.plugins[name]
        try {
          if (plugin.command && plugin.command.includes(cmd)) {
            await plugin.handler(msg, { conn: sock, args, command: cmd })
          }
        } catch (e) {
          console.error(`Errore nel plugin ${name}:`, e)
        }
      }
    })

    global.conns.push(sock)
  }

  if (command === 'stopbot') {
    let user = m.sender.split('@')[0]
    let bot = global.conns.find(c => c?.user?.id?.startsWith(user))
    if (bot) {
      try {
        bot.ws.close()
        fs.rmSync(`./jadibot/${user}`, { recursive: true, force: true })
        global.conns = global.conns.filter(c => c !== bot)
        m.reply(`🛑 SubBot fermato per ${m.sender}`)
      } catch (e) {
        m.reply(`⚠️ Errore: ${e.message}`)
      }
    } else {
      m.reply(`❌ Nessun SubBot attivo per ${m.sender}`)
    }
  }
}

handler.command = ['serbot', 'stopbot']
export default handler