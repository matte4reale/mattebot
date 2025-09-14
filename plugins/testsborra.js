import axios from 'axios'
import { createCanvas } from 'canvas'

let handler = async (m, { conn }) => {
  const url = 'https://chatunitycenter.netlify.app/chatunity-bot'

  try {
    // Prendi i dati JSON dal sito (assumendo che esponga info in JSON)
    let { data } = await axios.get(url)

    // Qui supponiamo che il sito ritorni un array di bot [{name, status}, ...]
    // status = "active" o "banned"
    let activeBots = data.filter(bot => bot.status === 'active')
    let bannedBots = data.filter(bot => bot.status === 'banned')

    // Creiamo il canvas
    const width = 800
    const height = 600
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // Sfondo bianco
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    // Titolo
    ctx.fillStyle = '#222'
    ctx.font = 'bold 36px Poppins'
    ctx.fillText('📊 Stato Bot ChatUnity', 200, 60)

    // Attivi
    ctx.fillStyle = '#28a745'
    ctx.font = 'bold 28px Poppins'
    ctx.fillText(`✅ Bot Attivi (${activeBots.length})`, 50, 120)

    ctx.font = '22px Poppins'
    activeBots.forEach((bot, i) => {
      ctx.fillText(`${i + 1}. ${bot.name}`, 70, 160 + i * 30)
    })

    // Bannati
    ctx.fillStyle = '#dc3545'
    ctx.font = 'bold 28px Poppins'
    ctx.fillText(`🚫 Bot Bannati (${bannedBots.length})`, 400, 120)

    ctx.font = '22px Poppins'
    bannedBots.forEach((bot, i) => {
      ctx.fillText(`${i + 1}. ${bot.name}`, 420, 160 + i * 30)
    })

    // Converte in JPEG
    let buffer = canvas.toBuffer('image/jpeg')

    await conn.sendMessage(
      m.chat,
      { image: buffer, caption: '🟢 Online • 🔴 Bannati' },
      { quoted: m }
    )
  } catch (err) {
    console.error('Errore botstatus:', err)
    await conn.reply(m.chat, '❌ Errore nel recuperare i dati dal sito.', m)
  }
}

handler.command = ['botstatuscanvas', 'status']
handler.help = ['botstatuscanvas']
handler.tags = ['tools']

export default handler