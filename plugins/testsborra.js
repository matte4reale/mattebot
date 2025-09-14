import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    let url = 'https://chatunitycenter.netlify.app/chatunity-bot'
    let res = await fetch(url)
    if (!res.ok) throw new Error(`Errore HTTP ${res.status}`)
    let html = await res.text()

    // 🔍 Semplice parsing con regex
    let online = (html.match(/online/gi) || []).length
    let offline = (html.match(/offline/gi) || []).length
    let totale = online + offline

    let caption = `🌐 *ChatUnity Bots*\n\n` +
                  `✅ Online: *${online}*\n` +
                  `❌ Offline: *${offline}*\n` +
                  `📊 Totale: *${totale}*\n\n` +
                  `🔗 Fonte: ${url}`

    await conn.sendMessage(m.chat, { text: caption }, { quoted: m })
  } catch (e) {
    await conn.reply(m.chat, `❌ Errore: ${e.message}`, m)
  }
}

handler.command = ['chatunitybots']
handler.help = ['chatunitybots']
handler.tags = ['info']

export default handler