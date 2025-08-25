import { createCanvas, loadImage } from 'canvas'

async function generaPodio(users, topN = 10, conn) {
  const width = 1000
  const height = 750
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // --- SFONDO (gradient) ---
  const grad = ctx.createLinearGradient(0, 0, width, height)
  grad.addColorStop(0, '#0f172a')
  grad.addColorStop(1, '#1e293b')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  // titolo
  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 52px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('HARUSS CLASSIFICA', width / 2, 80)

  // --- PODIO ---
  const podium = [
    { pos: 2, x: width / 2 - 250, h: 180, color: '#c0c0c0' }, // argento
    { pos: 1, x: width / 2, h: 260, color: '#ffd700' },       // oro
    { pos: 3, x: width / 2 + 250, h: 140, color: '#cd7f32' }  // bronzo
  ]

  for (let i = 0; i < 3 && i < users.length; i++) {
    const u = users.find(x => x.rank === podium[i].pos)
    const p = podium[i]

    // base podio
    ctx.fillStyle = p.color
    ctx.fillRect(p.x - 90, height - p.h - 250, 180, p.h)

    // --- avatar sopra ---
    try {
      let ppUrl = await conn.profilePictureUrl(u.id, 'image').catch(_ => null)
      if (ppUrl) {
        const img = await loadImage(ppUrl)
        const r = 60
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
      // se fallisce, disegno un cerchio vuoto
      ctx.beginPath()
      ctx.arc(p.x, height - p.h - 320, 60, 0, Math.PI * 2)
      ctx.fillStyle = '#334155'
      ctx.fill()
    }

    // medaglia sopra
    ctx.beginPath()
    ctx.arc(p.x, height - p.h - 420, 35, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.fill()
    ctx.fillStyle = '#000'
    ctx.font = 'bold 24px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(`#${p.pos}`, p.x, height - p.h - 410)

    // nome o numero
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 22px Arial'
    ctx.fillText(u.name || u.id.split('@')[0], p.x, height - p.h - 190)

    // punti
    ctx.fillStyle = '#e2e8f0'
    ctx.font = '18px Arial'
    ctx.fillText(`${u.euro || 0}€ | ${u.exp || 0}xp`, p.x, height - p.h - 160)
  }

  // --- LISTA DAL 4° AL 10° ---
  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 32px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('TOP 10:', 100, height - 320)

  ctx.font = '20px Arial'
  for (let i = 3; i < Math.min(topN, users.length); i++) {
    const u = users[i]
    const y = height - 280 + (i - 3) * 30
    ctx.fillStyle = '#fff'
    ctx.fillText(`#${i + 1} ${u.id.split('@')[0]}`, 120, y)
    ctx.fillStyle = '#cbd5e1'
    ctx.fillText(`${u.euro || 0}€ | ${u.exp || 0}xp`, 500, y)
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
  await conn.sendMessage(chat, { image: buffer, caption: '📊 Classifica aggiornata' }, { quoted: m })
}

handler.command = /^haruss$/i
handler.group = true

export default handler