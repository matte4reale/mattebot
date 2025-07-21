let handler = async (m, { conn, isAdmin, isROwner }) => {
  global.marchioGame = global.marchioGame || {}

  if (m.text.toLowerCase() === '.skipmarchio') {
    if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi.')
    if (!global.marchioGame[m.chat]) return m.reply('❌ Nessun gioco in corso.')
    if (!isAdmin && !isROwner) return m.reply('🔒 Solo gli admin possono saltare.')

    clearTimeout(global.marchioGame[m.chat].timeout)
    await conn.sendMessage(m.chat, { text: `🛑 Gioco saltato!\n✅ La risposta era: *${global.marchioGame[m.chat].answer}*` }, { quoted: m })
    delete global.marchioGame[m.chat]
    return
  }

  if (global.marchioGame[m.chat]) return m.reply('⚠️ Un gioco è già in corso! Usa `.skipmarchio` per annullare.')

  const marchi = [
    { url: 'https://i.imgur.com/GW7ZmUT.png', name: 'Ferrari' },
    { url: 'https://i.imgur.com/nPgyRsF.png', name: 'BMW' },
    { url: 'https://i.imgur.com/L8DbWJc.png', name: 'Audi' },
    { url: 'https://i.imgur.com/kGbpvMU.png', name: 'Mercedes' },
    { url: 'https://i.imgur.com/RD9kUrB.png', name: 'Lamborghini' },
    { url: 'https://i.imgur.com/N8l5IX2.png', name: 'Nissan' } // aggiunta
  ]

  const chosen = marchi[Math.floor(Math.random() * marchi.length)]

  await conn.sendFile(m.chat, chosen.url, 'marchio.jpg', '🚗 *Indovina il marchio!*', m)

  global.marchioGame[m.chat] = {
    answer: chosen.name.toLowerCase(),
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, { text: `⏱️ Tempo scaduto!\nLa risposta era: *${chosen.name}*` }, { quoted: m })
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