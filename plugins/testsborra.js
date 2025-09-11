import fetch from 'node-fetch'
import { createCanvas } from 'canvas'

let handler = async (m, { conn }) => {
  const sito = 'https://chatunitycenter.netlify.app/chatunity-bot'
  
  try {
    await conn.sendMessage(m.chat, { text: '⏳ Raccolgo i dati dei bot online...' }, { quoted: m })

    const res = await fetch(sito)
    const html = await res.text()

    const regex = /<div class="bot">.*?<h2>(.*?)<\/h2>.*?<span class="status (online|offline)">/gs
    let bots = []
    let match
    while ((match = regex.exec(html)) !== null) {
      bots.push({
        name: match[1].trim(),
        status: match[2] === 'online'
      })
    }

    const width = 800
    const height = 250 + bots.length * 50
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#1e1e2f'
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 32px Sans'
    ctx.fillText('📊 Stato Bot - ChatUnity', 40, 60)

    ctx.font = '24px Sans'
    let y = 120
    let countOnline = 0
    let countOffline = 0

    for (let bot of bots) {
      ctx.fillStyle = '#ffffff'
      ctx.fillText(bot.name, 60, y)

      ctx.fillStyle = bot.status ? '#00ff66' : '#ff3333'
      ctx.beginPath()
      ctx.arc(30, y - 8, 10, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#cccccc'
      ctx.font = '20px Sans'
      ctx.fillText(bot.status ? 'Online' : 'Offline', 250, y)

      if (bot.status) countOnline++
      else countOffline++

      y += 50
    }

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 26px Sans'
    ctx.fillText(`✅ Online: ${countOnline} | ❌ Offline: ${countOffline}`, 40, height - 40)

    const buffer = canvas.toBuffer('image/jpeg')

    await conn.sendMessage(m.chat, {
      image: buffer,
      mimetype: 'image/jpeg',
      caption: `✅ Report generato da *ChatUnity Center*\n🌐 ${sito}`
    }, { quoted: m })

  } catch (err) {
    console.error('Errore botsonline-canvas:', err)
    await conn.sendMessage(m.chat, { text: '❌ Errore nel generare il report bot online.' }, { quoted: m })
  }
}

handler.command = ['botsonline', 'statusbot']
handler.tags = ['tools']
handler.help = ['botsonline']
export default handler