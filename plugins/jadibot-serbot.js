import { makeWASocket, useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys'
import fs from 'fs'
import path from 'path'
import pino from 'pino'

if (!global.conns) global.conns = []
if (!global.plugins) global.plugins = {}

const pluginsFolder = path.join(process.cwd(), 'plugins')
fs.readdirSync(pluginsFolder).forEach(file => {
  if (file.endsWith('.js')) {
    let pluginPath = path.join(pluginsFolder, file)
    try {
      let plugin = require(pluginPath)
      global.plugins[file] = plugin.default || plugin
    } catch (e) {
      console.error(`Errore caricamento plugin ${file}:`, e)
    }
  }
})

let handler = async (m, { command, conn }) => {
  if (command === 'serbot') {
    let { state, saveCreds } = await useMultiFileAuthState(`./jadibot/${m.sender}`)
    let sock = makeWASocket({
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
      },
      printQRInTerminal: true,
      logger: pino({ level: 'silent' }),
      browser: ['SubBot', 'Chrome', '1.0.0']
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update
      if (connection === 'close') {
        let reason = lastDisconnect?.error?.output?.statusCode
        if (reason === DisconnectReason.loggedOut) {
          fs.rmSync(`./jadibot/${m.sender}`, { recursive: true, force: true })
          let i = global.conns.indexOf(sock)
          if (i !== -1) global.conns.splice(i, 1)
          m.reply(`❌ Bot disconnesso per *${m.sender}*`)
        }
      } else if (connection === 'open') {
        m.reply(`✅ Bot avviato per *${m.sender}*`)
      }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
      let msg = messages[0]
      if (!msg.message) return

      for (let name in global.plugins) {
        let plugin = global.plugins[name]
        try {
          if (plugin.command) {
            let body = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
            let prefix = body[0]
            let args = body.slice(1).trim().split(/ +/)
            let cmd = args.shift().toLowerCase()

            if (plugin.command.includes(cmd)) {
              await plugin(sock, { m: msg, conn: sock, args, command: cmd })
            }
          }
        } catch (e) {
          console.error(`Errore plugin ${name}:`, e)
        }
      }
    })

    global.conns.push(sock)
  }

  if (command === 'stopbot') {
    let connUser = global.conns.find(c => c?.user?.id?.split(':')[0] === m.sender.split('@')[0])
    if (connUser) {
      try {
        connUser.ws.close()
        let i = global.conns.indexOf(connUser)
        if (i !== -1) global.conns.splice(i, 1)
        fs.rmSync(`./jadibot/${m.sender}`, { recursive: true, force: true })
        m.reply(`🛑 Bot fermato e sessione eliminata per *${m.sender}*`)
      } catch (e) {
        m.reply(`⚠️ Errore nello stop: ${e.message}`)
      }
    } else {
      m.reply(`❌ Nessun bot trovato per *${m.sender}*`)
    }
  }
}

handler.command = ['serbot', 'stopbot']
export default handler