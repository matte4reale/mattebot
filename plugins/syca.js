import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn }) => {
  const users = Object.entries(global.db.data.users)
    .map(([id, data]) => ({ id, exp: data.exp || 0, euro: data.euro || 0 }))
    .sort((a, b) => (b.exp || 0) - (a.exp || 0))
    .slice(0, 10)

  if (!users.length) return m.reply('❌ Nessun utente trovato nella classifica.')

  const width = 1500
  const height = 950
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1e3a8a')
  gradient.addColorStop(1, '#6d28d9')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  for (let i = 0; i < 200; i++) {
    ctx.beginPath()
    ctx.fillStyle = `hsl(${Math.random() * 360}, 80%, 60%)`
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 2, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 60px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('HARUSS CLASSIFICA', width / 2, 90)

  const baseY = 620
  const colW = 180
  const spacing = 240
  const centerX = width - 420

  const positions = [
    { rank: 2, x: centerX - spacing, h: 250, color: '#9ca3af' },
    { rank: 1, x: centerX, h: 350, color: '#facc15' },
    { rank: 3, x: centerX + spacing, h: 200, color: '#d97706' }
  ]

  for (let pos of positions) {
    const user = users[pos.rank - 1]
    if (!user) continue

    ctx.fillStyle = pos.color
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 5
    const radius = 20
    const y = baseY - pos.h

    ctx.beginPath()
    ctx.moveTo(pos.x + radius, y)
    ctx.lineTo(pos.x + colW - radius, y)
    ctx.quadraticCurveTo(pos.x + colW, y, pos.x + colW, y + radius)
    ctx.lineTo(pos.x + colW, baseY - radius)
    ctx.quadraticCurveTo(pos.x + colW, baseY, pos.x + colW - radius, baseY)
    ctx.lineTo(pos.x + radius, baseY)
    ctx.quadraticCurveTo(pos.x, baseY, pos.x, baseY - radius)
    ctx.lineTo(pos.x, y + radius)
    ctx.quadraticCurveTo(pos.x, y, pos.x + radius, y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    try {
      let pp = await conn.profilePictureUrl(user.id, 'image').catch(() => null)
      if (pp) {
        let img = await loadImage(pp)
        ctx.save()
        ctx.beginPath()
        ctx.arc(pos.x + colW / 2, y - 80, 65, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(img, pos.x + colW / 2 - 65, y - 145, 130, 130)
        ctx.restore()
      }
    } catch {}

    ctx.fillStyle = '#fff'
    ctx.font = 'bold 22px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(user.id.split('@')[0], pos.x + colW / 2, baseY + 35)

    ctx.font = '18px Arial'
    ctx.fillText(`${user.euro || 0}€ | ${user.exp}xp`, pos.x + colW / 2, baseY + 60)
  }

  const first = positions.find(p => p.rank === 1)
  if (first) {
    const cx = first.x + colW / 2
    const cy = baseY - first.h - 200

    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    ctx.moveTo(cx - 40, cy)
    ctx.lineTo(cx + 40, cy)
    ctx.lineTo(cx + 30, cy + 70)
    ctx.lineTo(cx - 30, cy + 70)
    ctx.closePath()
    ctx.fill()
    ctx.fillRect(cx - 15, cy + 70, 30, 30)
    ctx.fillRect(cx - 40, cy + 100, 80, 15)

    ctx.strokeStyle = '#ffcc99'
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.arc(cx - 80, cy + 35, 25, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(cx + 80, cy + 35, 25, 0, Math.PI * 2)
    ctx.stroke()
  }

  const boxX = 100
  const boxY = 220
  const boxW = 500
  const boxH = 580

  ctx.fillStyle = 'rgba(0,0,0,0.55)'
  ctx.fillRect(boxX, boxY, boxW, boxH)

  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 38px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('TOP 10:', boxX + 20, boxY + 50)

  ctx.font = '22px Arial'
  for (let i = 3; i < Math.min(10, users.length); i++) {
    const u = users[i]
    const y = boxY + 100 + (i - 3) * 60

    ctx.fillStyle = '#fff'
    ctx.fillText(`#${i + 1} ${u.id.split('@')[0]}`, boxX + 30, y)

    ctx.fillStyle = '#cbd5e1'
    ctx.fillText(`${u.euro || 0}€ | ${u.exp || 0}xp`, boxX + 310, y)
  }

  ctx.fillStyle = '#9ca3af'
  ctx.font = '18px Arial'
  ctx.textAlign = 'right'
  ctx.fillText('Dev by Matte', width - 20, height - 20)

  const buffer = canvas.toBuffer()
  return conn.sendMessage(m.chat, { image: buffer, caption: '📊 Classifica aggiornata!' }, { quoted: m })
}

handler.command = /^haruss$/i
export default handler