import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn }) => {
  const users = Object.entries(global.db.data.users)
    .map(([id, data]) => ({ id, exp: data.exp || 0, euro: data.euro || 0 }))
    .sort((a, b) => (b.exp || 0) - (a.exp || 0))
    .slice(0, 10)

  if (!users.length) return m.reply('❌ Nessun utente trovato nella classifica.')

  const width = 1400
  const height = 900
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // SFONDO sfumato
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1e3a8a')
  gradient.addColorStop(1, '#6d28d9')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // CORIANDOLI
  for (let i = 0; i < 200; i++) {
    ctx.beginPath()
    ctx.fillStyle = `hsl(${Math.random() * 360}, 80%, 60%)`
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 2, 0, Math.PI * 2)
    ctx.fill()
  }

  // TITOLO
  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 60px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('HARUSS CLASSIFICA', width / 2, 80)

  // PODIO
  const baseY = 600
  const colW = 180
  const spacing = 220
  const centerX = width - 400

  const positions = [
    { rank: 2, x: centerX - spacing, h: 250, color: '#9ca3af' },
    { rank: 1, x: centerX, h: 350, color: '#facc15' },
    { rank: 3, x: centerX + spacing, h: 200, color: '#d97706' }
  ]

  for (let pos of positions) {
    const user = users[pos.rank - 1]
    if (!user) continue

    // Colonna
    ctx.fillStyle = pos.color
    ctx.fillRect(pos.x, baseY - pos.h, colW, pos.h)

    // Foto sopra
    try {
      let pp = await conn.profilePictureUrl(user.id, 'image').catch(() => null)
      if (pp) {
        let img = await loadImage(pp)
        ctx.save()
        ctx.beginPath()
        ctx.arc(pos.x + colW / 2, baseY - pos.h - 70, 65, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(img, pos.x + colW / 2 - 65, baseY - pos.h - 135, 130, 130)
        ctx.restore()
      }
    } catch {}

    // Nome + stats
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(user.id.split('@')[0], pos.x + colW / 2, baseY + 30)

    ctx.font = '18px Arial'
    ctx.fillText(`${user.euro || 0}€ | ${user.exp}xp`, pos.x + colW / 2, baseY + 55)
  }

  // COPPA con mani sul 1°
  const first = positions.find(p => p.rank === 1)
  if (first) {
    const cx = first.x + colW / 2
    const cy = baseY - first.h - 200

    // Coppa
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

    // Mani
    ctx.strokeStyle = '#ffcc99'
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.arc(cx - 80, cy + 35, 25, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(cx + 80, cy + 35, 25, 0, Math.PI * 2)
    ctx.stroke()
  }

  // LISTA 4–10 a sinistra
  const boxX = 80
  const boxY = 200
  const boxW = 450
  const boxH = 550

  ctx.fillStyle = 'rgba(0,0,0,0.55)'
  ctx.fillRect(boxX, boxY, boxW, boxH)

  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 36px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('TOP 10:', boxX + 20, boxY + 50)

  ctx.font = '22px Arial'
  for (let i = 3; i < Math.min(10, users.length); i++) {
    const u = users[i]
    const y = boxY + 100 + (i - 3) * 60

    ctx.fillStyle = '#fff'
    ctx.fillText(`#${i + 1} ${u.id.split('@')[0]}`, boxX + 30, y)

    ctx.fillStyle = '#cbd5e1'
    ctx.fillText(`${u.euro || 0}€ | ${u.exp || 0}xp`, boxX + 280, y)
  }

  // FIRMA
  ctx.fillStyle = '#9ca3af'
  ctx.font = '18px Arial'
  ctx.textAlign = 'right'
  ctx.fillText('Dev by Matte', width - 20, height - 20)

  const buffer = canvas.toBuffer()
  return conn.sendMessage(m.chat, { image: buffer, caption: '📊 Classifica aggiornata!' }, { quoted: m })
}

handler.command = /^haruss$/i
export default handler