import { createCanvas, loadImage } from 'canvas'
import { writeFileSync, unlinkSync } from 'fs'
import { spawn } from 'child_process'
import path from 'path'

let handler = async (m, { conn, participants }) => {
  if (!m.isGroup) return m.reply('❌ Solo nei gruppi!')

  let players = participants.map(p => p.id)
  if (players.length < 2) return m.reply('❌ Servono almeno 2 giocatori!')

  let victim = players[Math.floor(Math.random() * players.length)]

  const width = 1000, height = 1000
  const frames = 60
  const dir = './tmp_frames'
  const victimIndex = players.indexOf(victim)

  let ppCache = {}
  for (let id of players) {
    let url = await conn.profilePictureUrl(id, 'image').catch(() => null)
    ppCache[id] = url ? await loadImage(url) : null
  }

  for (let f = 0; f < frames; f++) {
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // sfondo
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, width, height)

    // titolo
    ctx.fillStyle = '#facc15'
    ctx.font = 'bold 50px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('ROULETTE RUSSA', width / 2, 70)

    // cerchio giocatori
    let cx = width / 2, cy = height / 2
    let r = 300

    players.forEach((id, i) => {
      let angle = (i / players.length) * (2 * Math.PI) - Math.PI / 2
      let x = cx + r * Math.cos(angle)
      let y = cy + r * Math.sin(angle)

      ctx.save()
      ctx.beginPath()
      ctx.arc(x, y, 60, 0, Math.PI * 2)
      ctx.clip()
      if (ppCache[id]) ctx.drawImage(ppCache[id], x - 60, y - 60, 120, 120)
      ctx.restore()

      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(x, y, 62, 0, Math.PI * 2)
      ctx.stroke()
    })

    // pistola che gira
    let gunAngle = (f / frames) * (2 * Math.PI) * 2 // 2 giri
    if (f === frames - 1 && victimIndex !== -1) {
      gunAngle = (victimIndex / players.length) * (2 * Math.PI) - Math.PI / 2
    }

    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(gunAngle)
    ctx.fillStyle = '#444'
    ctx.fillRect(-50, -20, 200, 40) // canna
    ctx.fillStyle = '#222'
    ctx.fillRect(150, -10, 30, 20) // bocca
    ctx.restore()

    // ultimo frame → effetto colpo
    if (f === frames - 1) {
      let angle = (victimIndex / players.length) * (2 * Math.PI) - Math.PI / 2
      let x = cx + r * Math.cos(angle)
      let y = cy + r * Math.sin(angle)
      ctx.fillStyle = 'rgba(255,0,0,0.6)'
      ctx.beginPath()
      ctx.arc(x, y, 80, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 40px Arial'
      ctx.fillText('💥 COLPITO!', x, y - 100)
    }

    let buffer = canvas.toBuffer('image/png')
    writeFileSync(path.join(dir, `frame_${String(f).padStart(3, '0')}.png`), buffer)
  }

  // genera mp4 con ffmpeg
  let output = './roulette.mp4'
  await new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', [
      '-y', '-framerate', '20', '-i', `${dir}/frame_%03d.png`,
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', output
    ])

    ff.on('close', code => code === 0 ? resolve() : reject(new Error('FFmpeg errore')))
  })

  // invia video
  await conn.sendMessage(m.chat, {
    video: { url: output },
    caption: `🔫 È stato colpito: @${victim.split('@')[0]}`
  }, { quoted: m, mentions: [victim] })

  // pulizia
  unlinkSync(output)
  for (let f = 0; f < frames; f++) {
    unlinkSync(path.join(dir, `frame_${String(f).padStart(3, '0')}.png`))
  }
}

handler.command = /^roulette$/i
handler.group = true

export default handler