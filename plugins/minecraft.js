import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, args }) => {
  let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
  let pp
  try {
    pp = await conn.profilePictureUrl(user, 'image')
  } catch {
    pp = 'https://telegra.ph/file/24fa902ead26340f3df2c.png' // immagine default
  }

  const img = await loadImage(pp)

  const size = 256
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')

  ctx.drawImage(img, 0, 0, size, size)

  let pixelSize = 16 // grandezza blocchi
  let imgData = ctx.getImageData(0, 0, size, size)
  let data = imgData.data

  for (let y = 0; y < size; y += pixelSize) {
    for (let x = 0; x < size; x += pixelSize) {
      let red = data[((y * size + x) * 4) + 0]
      let green = data[((y * size + x) * 4) + 1]
      let blue = data[((y * size + x) * 4) + 2]
      ctx.fillStyle = `rgb(${red},${green},${blue})`
      ctx.fillRect(x, y, pixelSize, pixelSize)
    }
  }

  const buffer = canvas.toBuffer('image/png')

  await conn.sendMessage(m.chat, { 
    image: buffer, 
    caption: `🟩 Ecco la skin Minecraft di @${user.split('@')[0]}`, 
    mentions: [user] 
  }, { quoted: m })
}

handler.command = /^minecrafts$/i
handler.help = ['minecraft @user']
handler.tags = ['fun']

export default handler