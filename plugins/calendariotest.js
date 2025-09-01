import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
import { exec } from 'child_process'

const FRAME_COUNT = 90 // 3 secondi a 30fps
const WIDTH = 600, HEIGHT = 600

let handler = async (m, { conn }) => {
  const players = Object.keys(global.db.data.users).slice(0, 6) // max 6 player

  if (players.length < 2) return m.reply("❌ Servono almeno 2 giocatori")

  // scarico pp di tutti
  let avatars = []
  for (let id of players) {
    let pp = await conn.profilePictureUrl(id, 'image').catch(() => null)
    if (pp) avatars.push(await loadImage(pp))
  }

  // creo frames
  for (let f = 0; f < FRAME_COUNT; f++) {
    const canvas = createCanvas(WIDTH, HEIGHT)
    const ctx = canvas.getContext('2d')

    // sfondo
    ctx.fillStyle = "#111"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    // pistola tamburo
    let angle = (f / FRAME_COUNT) * Math.PI * 6 // gira
    ctx.save()
    ctx.translate(WIDTH/2, HEIGHT/2)
    ctx.rotate(angle)
    ctx.fillStyle = "#444"
    ctx.beginPath()
    ctx.arc(0, 0, 200, 0, Math.PI*2)
    ctx.fill()
    ctx.restore()

    // disegna player come cerchio attorno
    let radius = 250
    avatars.forEach((img, i) => {
      let theta = (i / avatars.length) * Math.PI * 2
      let x = WIDTH/2 + Math.cos(theta) * radius
      let y = HEIGHT/2 + Math.sin(theta) * radius
      ctx.drawImage(img, x-40, y-40, 80, 80)
    })

    // salva frame
    fs.writeFileSync(`frames/frame${String(f).padStart(4, '0')}.png`, canvas.toBuffer())
  }

  // crea video
  exec(`ffmpeg -framerate 30 -i frames/frame%04d.png -c:v libx264 -pix_fmt yuv420p roulette.mp4`, async (err) => {
    if (err) return m.reply("❌ Errore ffmpeg")
    await conn.sendMessage(m.chat, { video: fs.readFileSync("roulette.mp4"), caption: "🔫 Roulette Russa 🎥" }, { quoted: m })
  })
}

handler.command = /^roulettevid$/i
export default handler