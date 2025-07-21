import fetch from 'node-fetch'

let handler = async (m, { conn, isAdmin }) => {
  global.marchioGame = global.marchioGame || {}

  if (m.text?.toLowerCase() === '.skipmarchio') {
    if (!m.isGroup) return m.reply('⚠️ Solo nei gruppi!')
    if (!global.marchioGame[m.chat]) return m.reply('⚠️ Nessuna partita in corso.')
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin.')

    clearTimeout(global.marchioGame[m.chat].timeout)
    await conn.reply(m.chat, `🛑 *Gioco interrotto*\n💡 La risposta era: *${global.marchioGame[m.chat].risposta}*`, m)
    delete global.marchioGame[m.chat]
    return
  }

  if (global.marchioGame[m.chat]) return m.reply('⚠️ Una partita è già in corso!')

  const marchi = [
    { url: 'https://i.imgur.com/GW7ZmUT.png', nome: 'Ferrari' },
    { url: 'https://i.imgur.com/nPgyRsF.png', nome: 'BMW' },
    { url: 'https://i.imgur.com/L8DbWJc.png', nome: 'Audi' },
    { url: 'https://i.imgur.com/kGbpvMU.png', nome: 'Mercedes' },
    { url: 'https://i.imgur.com/RD9kUrB.png', nome: 'Lamborghini' }
  ]

  let brand = marchi[Math.floor(Math.random() * marchi.length)]

  try {
    let res = await fetch(brand.url)
    let buffer = await res.buffer()

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `🚗 *Indovina il marchio!*`
    }, { quoted: m })

    global.marchioGame[m.chat] = {
      risposta: brand.nome.toLowerCase(),
      timeout: setTimeout(() => {
        conn.reply(m.chat, `⏱️ Tempo scaduto! La risposta era: *${brand.nome}*`, m)
        delete global.marchioGame[m.chat]
      }, 30000)
    }
  } catch (e) {
    console.error(e)
    m.reply('❌ Errore nell\'invio dell\'immagine.')
  }
}

handler.command = /^(marchio|skipmarchio)$/i
handler.help = ['marchio']
handler.tags = ['giochi']
handler.group = true
handler.register = true

export default handler