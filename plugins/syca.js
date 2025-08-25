import { createCanvas } from 'canvas'
import { spawn } from 'child_process'

let handler = async (m, { conn }) => {
  const users = Object.entries(global.db.data.users)
    .map(([id, data]) => ({ id, exp: data.exp || 0, euro: data.euro || 0 }))
    .sort((a, b) => (b.exp || 0) - (a.exp || 0))
    .slice(0, 10)

  if (!users.length) return m.reply('❌ Nessun utente trovato nella classifica.')

  const width = 1280
  const height = 720
  const frames = 120
  const fps = 30

  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'rawvideo',
    '-pix_fmt', 'rgba',
    '-s', `${width}x${height}`,
    '-r', `${fps}`,
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '/tmp/classifica.mp4'
  ])

  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  for (let i = 0; i < frames; i++) {
    ctx.fillStyle = '#1e3a8a'
    ctx.fillRect(0, 0, width, height)

    for (let j = 0; j < 150; j++) {
      ctx.beginPath()
      ctx.fillStyle = `hsl(${Math.random() * 360}, 80%, 60%)`
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 2, 0, Math.PI * 2)
      ctx.fill()
    }

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
    ctx.fillRect(cx - 15, cy + 80, 30, 25)
    ctx.fillRect(cx - 40, cy + 105, 80, 15)

    ctx.strokeStyle = '#ffcc99'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(cx - 80, cy + 40, 25, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(cx + 80, cy + 40, 25, 0, Math.PI * 2)
    ctx.stroke()

    ffmpeg.stdin.write(canvas.toBuffer('raw'))
  }

  ffmpeg.stdin.end()
  ffmpeg.on('close', async () => {
    await conn.sendMessage(m.chat, {
      video: { url: '/tmp/classifica.mp4' },
      caption: '🏆 Classifica animata Haruss'
    }, { quoted: m })
  })
}

handler.command = /^harussvideo$/i
export default handler