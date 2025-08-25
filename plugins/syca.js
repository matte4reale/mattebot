import { createCanvas, loadImage } from 'canvas'

async function generaPodio(users, topN = 10, conn) {
  const width = 1100
  const height = 800
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // --- SFONDO (gradient blu notte) ---
  const grad = ctx.createLinearGradient(0, 0, width, height)
  grad.addColorStop(0, '#0f172a')
  grad.addColorStop(1, '#1e293b')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  // --- CORIANDOLI ---
  for (let i = 0; i < 120; i++) {
    ctx.beginPath()
    const x = Math.random() * width
    const y = Math.random() * height
    const r = Math.random() * 5 + 2
    const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa']
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  // --- TITOLO ---
  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 54px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('HARUSS CLASSIFICA', width / 2, 80)

  // --- PODIO ---
  const podium = [
    { pos: 2, x: width / 2 - 250, h: 200, color: '#c0c0c0' }, // argento
    { pos: 1, x: width / 2, h: 280, color: '#ffd700' },       // oro
    { pos: 3, x: width / 2 + 250, h: 160, color: '#cd7f32' }  // bronzo
  ]

  for (let i = 0; i < 3 && i < users.length; i++) {
    const u = users.find(x => x.rank === podium[i].pos)
    const p = podium[i]

    // base podio
    ctx.fillStyle = p.color
    ctx.fillRect(p.x - 100, height - p.h - 220, 200, p.h)

    // avatar sopra
    try {
      let ppUrl = await conn.profilePictureUrl(u.id, 'image').catch(_ => null)
      if (ppUrl) {
        const img = await loadImage(ppUrl)
        const r = 70
        const cx = p.x
        const cy = height - p.h - 320

        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2)
        ctx.restore()
      }
    } catch (e) {
      ctx.beginPath()
      ctx.arc(p.x, height - p.h - 320, 70, 0, Math.PI * 2)
      ctx.fillStyle = '#334155'
      ctx.fill()
    }

    // medaglia sopra
    ctx.beginPath()
    ctx.arc(p.x, height - p.h - 420, 40, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.fill()
    ctx.fillStyle = '#000'
    ctx.font = 'bold 26px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(`#${p.pos}`, p.x, height - p.h - 410)

    // nome o numero
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 24px Arial'
    ctx.fillText(u.name || u.id.split('@')[0], p.x, height - p.h - 180)

    // punti
    ctx.fillStyle = '#e2e8f0'
    ctx.font = '20px Arial'
    ctx.fillText(`${u.euro || 0}€ | ${u.exp || 0}xp`, p.x, height - p.h - 150)
  }

  // --- LISTA TOP 4-10 ---
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.fillRect(60, 200, 420, 350)

  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 30px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('TOP 10:', 80, 240)

  ctx.font = '20px Arial'
  for (let i = 3; i < Math.min(topN, users.length); i++) {
    const u = users[i]
    const y = 280 + (i - 3) * 35
    ctx.fillStyle = '#fff'
    ctx.fillText(`#${i + 1} ${u.id.split('@')[0]}`, 100, y)
    ctx.fillStyle = '#cbd5e1'
    ctx.fillText(`${u.euro || 0}€ | ${u.exp || 0}xp`, 350, y)
  }

  // firma
  ctx.fillStyle = '#94a3b8'
  ctx.font = '16px Arial'
  ctx.textAlign = 'right'
  ctx.fillText('Dev by Matte', width - 20, height - 20)

  return canvas.toBuffer()
}

let handler = async (m, { conn }) => {
  const chat = m.chat
  const dbUsers = Object.entries(global.db.data.users)
    .map(([id, u], i) => ({
      id,
      name: u.name || null,
      euro: u.euro || 0,
      exp: u.exp || 0,
      rank: i + 1
    }))
    .sort((a, b) => (b.euro + b.exp) - (a.euro + a.exp))

  const buffer = await generaPodio(dbUsers, 10, conn)
  await conn.sendMessage(chat, { image: buffer, caption: '📊 Classifica aggiornata 🎉' }, { quoted: m })
}

handler.command = /^haruss$/i
handler.group = true

export default handler