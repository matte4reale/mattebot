import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'

let handler = async (m, { conn, args }) => {
  try {
    let who = m.mentionedJid?.[0] || m.sender
    let ppUrl
    try {
      ppUrl = await conn.profilePictureUrl(who, 'image')
    } catch {
      ppUrl = 'https://telegra.ph/file/24fa902ead26340f3df2c.png'
    }

    const avatar = await loadImage(ppUrl)
    const width = 512
    const height = 512
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(avatar, 0, 0, width, height)

    ctx.strokeStyle = 'rgba(0,0,0,0.8)'
    ctx.lineWidth = 15
    let numberOfBars = 6
    let barSpacing = width / numberOfBars

    for (let i = 1; i < numberOfBars; i++) {
      ctx.beginPath()
      ctx.moveTo(i * barSpacing, 0)
      ctx.lineTo(i * barSpacing, height)
      ctx.stroke()
    }

    ctx.lineWidth = 10
    for (let j = 1; j < 5; j++) {
      ctx.beginPath()
      ctx.moveTo(0, j * (height / 5))
      ctx.lineTo(width, j * (height / 5))
      ctx.stroke()
    }

    const out = fs.createWriteStream('./tmp/jail.jpg')
    const stream = canvas.createJPEGStream()
    stream.pipe(out)
    out.on('finish', async () => {
      await conn.sendMessage(m.chat, { image: fs.readFileSync('./tmp/jail.jpg'), caption: '🚔 In gabbia!' }, { quoted: m })
      fs.unlinkSync('./tmp/jail.jpg')
    })
  } catch (e) {
    console.error(e)
    m.reply('❌ Errore nel generare l\'immagine.')
  }
}

handler.command = ['jail']
handler.help = ['jail @user']
handler.tags = ['fun']

export default handler