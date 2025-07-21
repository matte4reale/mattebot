let handler = async (m, { conn, isAdmin, isROwner }) => {
  global.marchioGame = global.marchioGame || {}

  if (m.text.toLowerCase() === '.skipmarchio') {
    if (!m.isGroup) return m.reply('⚠️ Solo nei gruppi.')
    if (!global.marchioGame[m.chat]) return m.reply('❌ Nessun gioco attivo.')
    if (!isAdmin && !isROwner) return m.reply('🔒 Solo admin o owner possono farlo.')

    clearTimeout(global.marchioGame[m.chat].timeout)
    await conn.sendMessage(m.chat, { text: `🛑 Gioco saltato!\n✅ Era: *${global.marchioGame[m.chat].answer}*` }, { quoted: m })
    delete global.marchioGame[m.chat]
    return
  }

  if (global.marchioGame[m.chat]) return m.reply('⚠️ C\'è già un gioco attivo! Usa `.skipmarchio` per annullare.')

  const marchi = [
    { url: 'https://i.imgur.com/nPgyRsF.png', name: 'BMW' },
    { url: 'https://i.imgur.com/GW7ZmUT.png', name: 'Ferrari' },
    { url: 'https://i.imgur.com/L8DbWJc.png', name: 'Audi' },
    { url: 'https://i.imgur.com/kGbpvMU.png', name: 'Mercedes' },
    { url: 'https://i.imgur.com/RD9kUrB.png', name: 'Lamborghini' },
    { url: 'https://i.imgur.com/N8l5IX2.png', name: 'Nissan' }
  ]

  const scelto = marchi[Math.floor(Math.random() * marchi.length)]

  await conn.sendFile(m.chat, scelto.url, 'marchio.jpg', '🚗 *Indovina il marchio!*', m)

  global.marchioGame[m.chat] = {
    answer: scelto.name.toLowerCase(),
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, { text: `⏱️ Tempo scaduto!\nLa risposta era: *${scelto.name}*` }, { quoted: m })
      delete global.marchioGame[m.chat]
    }, 30000)
  }
}

handler.command = /^marchio|skipmarchio$/i
handler.tags = ['giochi']
handler.help = ['marchio']
handler.group = true
handler.register = true

export default handler