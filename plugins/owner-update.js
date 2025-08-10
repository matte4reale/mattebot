import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
  await m.react('🕓')

  let numeroAutorizzato = "66621409462@s.whatsapp.net"

  if (m.sender !== numeroAutorizzato) {
    await conn.reply(m.chat, "⛔ Non sei autorizzato ad usare questo comando.", m)
    await m.react('❌')
    return
  }

  if (conn.user.jid === conn.user.jid) {
    try {
      let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''))
      await conn.reply(m.chat, stdout.toString(), m)
      await m.react('✅')
    } catch (err) {
      await conn.reply(m.chat, `❌ Errore:\n${err}`, m)
      await m.react('⚠️')
    }
  }
}

handler.help = ['aggiornabot']
handler.tags = ['owner']
handler.command = ['aggiorna', 'update', 'aggiornabot']
handler.rowner = true

export default handler