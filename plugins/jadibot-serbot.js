import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

let subProcess = null

let handler = async (m, { command }) => {
  if (command === 'subbot') {
    if (subProcess) return m.reply('⚠️ Sub-bot già attivo!')

    const subCode = `
      import makeWASocket, { useMultiFileAuthState } from '@realvare/based'
      import Pino from 'pino'
      import fs from 'fs'
      import path from 'path'
      import syntaxerror from 'syntax-error'
      import { fileURLToPath } from 'url'

      const __filename = fileURLToPath(import.meta.url)
      const __dirname = path.dirname(__filename)
      const SESSION_DIR = './subbot_session'
      let plugins = {}

      async function loadPlugin(file) {
        const filepath = path.join(__dirname, 'plugins', file)
        if (!fs.existsSync(filepath)) return delete plugins[file]
        const src = fs.readFileSync(filepath)
        const err = syntaxerror(src, filepath)
        if (err) return console.error('❌ Errore in ' + file + ':\\n' + err)

        try {
          delete import.cache?.[import.resolve(filepath)]
          const plugin = await import(filepath + '?update=' + Date.now())
          plugins[file] = plugin.default || plugin
          console.log('✅ Plugin caricato:', file)
        } catch (e) {
          console.error('❌ Errore importando ' + file, e)
        }
      }

      async function loadPlugins() {
        const dir = path.join(__dirname, 'plugins')
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'))
        for (let f of files) await loadPlugin(f)

        fs.watch(dir, (event, filename) => {
          if (filename && filename.endsWith('.js')) {
            console.log('♻️ Ricarico plugin:', filename)
            loadPlugin(filename)
          }
        })
      }

      async function startSubBot() {
        const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR)
        const sock = makeWASocket({
          logger: Pino({ level: 'silent' }),
          printQRInTerminal: true,
          auth: state
        })

        sock.ev.on('creds.update', saveCreds)
        await loadPlugins()

        sock.ev.on('messages.upsert', async ({ messages }) => {
          let msg = messages[0]
          if (!msg.message) return

          const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            msg.message.imageMessage?.caption ||
            msg.message.videoMessage?.caption ||
            ''

          if (!text) return
          let prefix = /^[.!?#]/.test(text) ? text[0] : '.'
          let [command, ...args] = text.trim().slice(prefix.length).split(/\\s+/)
          command = (command || '').toLowerCase()

          for (let name in plugins) {
            let plugin = plugins[name]
            try {
              if (plugin.command && plugin.command.test(command)) {
                await plugin(msg, {
                  conn: sock,
                  args,
                  command,
                  text: args.join(' ')
                })
              }
            } catch (e) {
              console.error('❌ Errore in ' + name, e)
            }
          }
        })

        console.log('✅ Sub-bot avviato con hot-reload!')
      }

      startSubBot()
    `

    const tempFile = path.join(process.cwd(), 'subbot-runner.mjs')
    fs.writeFileSync(tempFile, subCode)

    subProcess = spawn('node', [tempFile], { stdio: 'inherit', shell: true })
    m.reply('✅ Sub-bot avviato! Scannerizza il QR in console.')
  }

  if (command === 'substop') {
    if (!subProcess) return m.reply('⚠️ Nessun sub-bot attivo.')
    subProcess.kill('SIGTERM')
    subProcess = null
    m.reply('🛑 Sub-bot fermato.')
  }
}

handler.command = /^(subbot|substop)$/i
handler.owner = true

export default handler