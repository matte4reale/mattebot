import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    let url = 'https://chatunitycenter.netlify.app/chatunity-bot'
    let res = await fetch(url)
    if (!res.ok) throw new Error(`Errore HTTP ${res.status}`)
    let html = await res.text()

    // Conta "attivo" e "ban"
    let attivi = (html.match(/attivo/gi) || []).length
    let bannati = (html.match(/ban/gi) || []).length
    let totale = attivi + bannati

    let caption = `🤖 *ChatUnity - Stato Bot*\n\n` +
                  `🟢 Attivi: *${attivi}*\n` +
                  `⛔ Bannati: *${bannati}*\n` +
                  `📊 Totale: *${totale}*\n\n` +
                  `🌐 Fonte: ${url}`

    await conn.sendMessage(m.chat, { text: caption }, { quoted: m })
  } catch (e) {
    await conn.reply(m.chat, `❌ Errore: ${e.message}`, m)
  }
}

handler.command = ['chatunitybots']
handler.help = ['chatunitybots']
handler.tags = ['info']

export default handler