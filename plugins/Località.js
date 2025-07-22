import fs from 'fs'

let handler = async (m, { conn, isAdmin }) => {
  const text = m.text?.toLowerCase()

  if (text === '.skipmap') {
    if (!m.isGroup) return m.reply('⚠️ Solo nei gruppi!')
    if (!global.geoGame?.[m.chat]) return m.reply('⚠️ Nessuna partita attiva!')
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin!')
    clearTimeout(global.geoGame[m.chat].timeout)
    await conn.reply(m.chat, `🛑 Gioco interrotto. Risposta: *${global.geoGame[m.chat].rispostaOriginale}*`, m)
    delete global.geoGame[m.chat]
    return
  }

  if (text === '.mappa') {
    if (global.geoGame?.[m.chat]) return m.reply('⚠️ Partita già in corso!')
    global.cooldowns = global.cooldowns || {}
    const key = `geo_${m.chat}`, now = Date.now()
    if (now - (global.cooldowns[key] || 0) < 15000)
      return m.reply(`⏳ Attendi ancora ${Math.ceil((15000 - (now - global.cooldowns[key]))/1000)}s`)
    global.cooldowns[key] = now

    let data = JSON.parse(fs.readFileSync('./plugins/localita_dataset.json'))
    const scelta = data[Math.floor(Math.random() * data.length)]
    const intro = '🌍 *Indovina la città dall’immagine!*'

    await conn.sendMessage(
      m.chat,
      { image: { url: scelta.url }, caption: `${intro}\n⌛ Hai 60 secondi. RISPONDI con il nome della città!` },
      { quoted: m }
    )

    global.geoGame = global.geoGame || {}
    global.geoGame[m.chat] = {
      risposta: scelta.city.toLowerCase(),
      rispostaOriginale: scelta.city,
      startTime: Date.now(),
      timeout: setTimeout(() => {
        if (global.geoGame?.[m.chat]) {
          conn.reply(m.chat, `⏰ Tempo scaduto! Risposta: *${scelta.city}*`, m)
          delete global.geoGame[m.chat]
        }
      }, 60000)
    }
  }
}

handler.before = async (m, { conn }) => {
  const game = global.geoGame?.[m.chat]
  if (!game || m.key.fromMe) return
  const text = m.text?.toLowerCase().trim()
  if (!text) return
  if (text !== game.risposta) return

  clearTimeout(game.timeout)
  const timeTaken = Math.round((Date.now() - game.startTime) / 1000)
  const reward = Math.floor(Math.random() * 100) + 100
  const exp = Math.floor(Math.random() * 10) + 10

  const congrats = `
╭━『 🎉 *RISPOSTA CORRETTA!* 』━╮
┃
┃ 🗺️ *Città:* ${game.rispostaOriginale}
┃ ⏱️ *Tempo impiegato:* ${timeTaken}s
┃
┃ 🎁 *Ricompense:*
┃ • ${reward} 💰 euro
┃ • ${exp} 🆙 EXP
╰━━━━━━━━━━━━━━━━╯

> \`vare ✧ bot\``

  await conn.reply(m.chat, congrats, m)
  delete global.geoGame[m.chat]
}

handler.help = ['mappa', 'skipmap']
handler.tags = ['game']
handler.command = ['mappa', 'skipmap']
export default handler