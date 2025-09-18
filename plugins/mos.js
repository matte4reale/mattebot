import fs from 'fs'
import path from 'path'

const AUTH_NUMBERS = ['66621409462@s.whatsapp.net'] // numeri autorizzati

global.activeTarget = null // id gruppo attivo

let handler = async (m, { conn, args, command }) => {
  if (command === 'target') {
    if (!AUTH_NUMBERS.includes(m.sender)) 
      return m.reply('❌ Non sei autorizzato a usare questo comando.')

    if (!args[0]) 
      return m.reply('📌 Usa:\n.target <link gruppo>')

    let regex = /https:\/\/chat\.whatsapp\.com\/([a-zA-Z0-9]+)/;
    let match = args[0].match(regex);
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

// intercetta i messaggi del gruppo target
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

// blocca tutti gli altri plugin
handler.all = async (m, { isOwner }) => {
  if (global.activeTarget && m.chat === global.activeTarget) {
    return // consente solo il salvataggio
  }
}

handler.command = /^target$/i
export default handler