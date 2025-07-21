import fetch from 'node-fetch'

let handler = async (m, { conn, isAdmin }) => {
  if (m.text?.toLowerCase() === '.skipmarchio') {
    if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!')
    if (!global.marchioGame?.[m.chat]) return m.reply('⚠️ Non c\'è nessuna partita attiva in questo gruppo!')
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo gli admin possono usare questo comando.')

    clearTimeout(global.marchioGame[m.chat].timeout)
    await conn.reply(
      m.chat,
      `🛑 *Gioco interrotto dall'admin*\n✨ La risposta era: *${global.marchioGame[m.chat].risposta}*`,
      m
    )
    delete global.marchioGame[m.chat]
    return
  }

  if (global.marchioGame?.[m.chat]) {
    return m.reply('⚠️ C\'è già una partita attiva in questo gruppo!')
  }

  const cooldownKey = `marchio_${m.chat}`
  const now = Date.now()
  const cooldownTime = 10000

  global.cooldowns = global.cooldowns || {}
  const lastGame = global.cooldowns[cooldownKey] || 0
  if (now - lastGame < cooldownTime) {
    const remaining = Math.ceil((cooldownTime - (now - lastGame)) / 1000)
    return m.reply(`⏳ Aspetta ${remaining} secondi prima di avviare un nuovo gioco.`)
  }
  global.cooldowns[cooldownKey] = now

  const marchi = [
    { url: 'https://i.imgur.com/GW7ZmUT.png', nome: 'Ferrari' },
    { url: 'https://i.imgur.com/nPgyRsF.png', nome: 'BMW' },
    { url: 'https://i.imgur.com/L8DbWJc.png', nome: 'Audi' },
    { url: 'https://i.imgur.com/kGbpvMU.png', nome: 'Mercedes' },
    { url: 'https://i.imgur.com/RD9kUrB.png', nome: 'Lamborghini' },
    { url: 'https://i.imgur.com/D5FM7vK.png', nome: 'Toyota' },
    { url: 'https://i.imgur.com/3Vkx8ql.png', nome: 'Honda' },
    { url: 'https://i.imgur.com/fcNoIcd.png', nome: 'Volkswagen' },
    { url: 'https://i.imgur.com/TrBgDiX.png', nome: 'Ford' },
    { url: 'https://i.imgur.com/Y0iVkgy.png', nome: 'Porsche' },
    { url: 'https://i.imgur.com/X09NNFF.png', nome: 'Chevrolet' },
    { url: 'https://i.imgur.com/O1mcAMd.png', nome: 'Nissan' },
    { url: 'https://i.imgur.com/MPs4CQ9.png', nome: 'Hyundai' },
    { url: 'https://i.imgur.com/0RjCTDx.png', nome: 'Kia' },
    { url: 'https://i.imgur.com/1dUfjGH.png', nome: 'Tesla' },
    { url: 'https://i.imgur.com/YHUmBD0.png', nome: 'Mazda' },
    { url: 'https://i.imgur.com/B1LgIVq.png', nome: 'Peugeot' },
    { url: 'https://i.imgur.com/oMQWg5F.png', nome: 'Renault' },
    { url: 'https://i.imgur.com/ZVrAznN.png', nome: 'Citroën' },
    { url: 'https://i.imgur.com/K2WExMY.png', nome: 'Subaru' }
  ]

  let brand = marchi[Math.floor(Math.random() * marchi.length)]
  let res = await fetch(brand.url)
  let buffer = await res.buffer()

  await conn.sendMessage(m.chat, {
    image: buffer,
    caption: '🚗 *Indovina il marchio!*'
  }, { quoted: m })

  global.marchioGame = global.marchioGame || {}
  global.marchioGame[m.chat] = {
    risposta: brand.nome.toLowerCase(),
    timeout: setTimeout(() => {
      conn.reply(m.chat, `⏱️ Tempo scaduto! La risposta era: *${brand.nome}*`, m)
      delete global.marchioGame[m.chat]
    }, 30000)
  }
}

handler.command = /^(marchio|skipmarchio)$/i
handler.help = ['marchio']
handler.tags = ['giochi']
handler.group = true
handler.register = true

export default handler