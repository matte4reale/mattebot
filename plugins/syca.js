import { createCanvas } from 'canvas'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  const users = Object.entries(global.db.data.users)
    .map(([id, data]) => ({ id, exp: data.exp || 0, euro: data.euro || 0 }))
    .sort((a, b) => (b.exp || 0) - (a.exp || 0))
    .slice(0, 10)

  if (!users.length) return m.reply('❌ Nessun utente trovato nella classifica.')

  const width = 1280
  const height = 720
  const frames = 60 // 2 secondi a 30fps
  const fps = 30

  const tmpDir = path.join(process.cwd(), 'tmp_frames')
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir)

  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  for (let i = 0; i < frames; i++) {
    ctx.fillStyle = '#1e3a8a'
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = '#facc15'
    ctx.font = 'bold 60px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('HARUSS CLASSIFICA', width / 2, 80)

    let tableX = -600 + (i / frames) * 700
    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.fillRect(tableX, 150, 500, 500)

    ctx.fillStyle = '#facc15'
    ctx.font = 'bold 38px Arial'
    ctx.textAlign = 'left'
    ctx.fillText('TOP 10:', tableX + 20, 200)

    ctx.font = '22px Arial'
    for (let u = 0; u < users.length; u++) {
      const y = 250 + u * 40
      ctx.fillStyle = '#fff'
      ctx.fillText(`#${u + 1} ${users[u].id.split('@')[0]}`, tableX + 30, y)
      ctx.fillStyle = '#cbd5e1'
      ctx.fillText(`${users[u].euro || 0}€ | ${users[u].exp || 0}xp`, tableX + 320, y)
    }

    let trophyY = -200 + (i / frames) * 350
    const cx = width - 350
    const cy = trophyY
    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    ctx.moveTo(cx - 40, cy)
    ctx.lineTo(cx + 40, cy)
    ctx.lineTo(cx + 30, cy + 80)
    ctx.lineTo(cx - 30, cy + 80)
    ctx.closePath()
    ctx.fill()

    const file = path.join(tmpDir, `frame_${String(i).padStart(3, '0')}.png`)
    fs.writeFileSync(file, canvas.toBuffer('image/png'))
  }

  const outPath = path.join(process.cwd(), 'classifica.mp4')
  await new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-y',
      '-framerate', `${fps}`,
      '-i', `${tmpDir}/frame_%03d.png`,
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      outPath
    ])

    ffmpeg.on('close', code => {
      if (code === 0) resolve()
      else reject(new Error('ffmpeg error'))
    })
  })

  await conn.sendMessage(m.chat, {
    video: { url: outPath },
    caption: '🏆 Classifica animata Haruss'
  }, { quoted: m })

  fs.rmSync(tmpDir, { recursive: true, force: true })
  fs.unlinkSync(outPath)
}

handler.command = /^haruss$/i
export default handler