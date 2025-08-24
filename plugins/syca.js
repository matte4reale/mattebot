import { createCanvas, loadImage } from 'canvas'

async function generaPodio(conn, chat, users, topN = 10) {
  const width = 900
  const height = 700
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#0f172a')
  gradient.addColorStop(1, '#1e3a8a')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 50px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('🏆 HARUSS PODIO', width / 2, 70)

  // --- PODIO ---
  const podium = [
    { pos: 1, x: width / 2, y: 250, color: '#ffd700' }, // oro
    { pos: 2, x: width / 2 - 200, y: 300, color: '#c0c0c0' }, // argento
    { pos: 3, x: width / 2 + 200, y: 320, color: '#cd7f32' }  // bronzo
  ]

  for (let i = 0; i < 3 && i < users.length; i++) {
    const u = users[i]
    const p = podium.find(p => p.pos === i + 1)

    // Base podio
    ctx.fillStyle = p.color
    ctx.fillRect(p.x - 70, p.y, 140, height - p.y - 300)

    // Avatar
    try {
      const url = await conn.profilePictureUrl(u.id, 'image').catch(() => null)
      if (url) {
        const avatar = await loadImage(url)
        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y - 70, 60, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(avatar, p.x - 60, p.y - 130, 120, 120)
        ctx.restore()
      }
    } catch {}

    // Nome
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 28px Arial'
    ctx.fillText(u.name, p.x, p.y + 50)

    // Punti
    ctx.fillStyle = '#e2e8f0'
    ctx.font = '22px Arial'
    ctx.fillText(`💰${u.euro || 0}€ ⭐${u.exp || 0}xp`, p.x, p.y + 80)
  }

  // --- CLASSIFICA DAL 4° AL 10° ---
  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 32px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('TOP 10:', 100, 450)

  ctx.font = '22px Arial'
  for (let i = 3; i < Math.min(topN, users.length); i++) {
    const u = users[i]
    const y = 500 + (i - 3) * 40
    ctx.fillStyle = '#fff'
    ctx.fillText(`#${i + 1} ${u.name}`, 120, y)
    ctx.fillStyle = '#cbd5e1'
    ctx.fillText(`💰${u.euro || 0}€ ⭐${u.exp || 0}xp`, 500, y)
  }

  ctx.fillStyle = '#94a3b8'
  ctx.font = '18px Arial'
  ctx.textAlign = 'right'
  ctx.fillText('Dev by Matte', width - 20, height - 20)

  return canvas.toBuffer()
}

let handler = async (m, { conn }) => {
  const chat = m.chat
  const dbUsers = Object.entries(global.db.data.users)
    .map(([id, u]) => ({
      id,
      name: u.name || id.split('@')[0],
      euro: u.euro || 0,
      exp: u.exp || 0
    }))
    .sort((a, b) => (b.euro + b.exp) - (a.euro + a.exp))

  const buffer = await generaPodio(conn, chat, dbUsers, 10)
  await conn.sendMessage(chat, { image: buffer, caption: '📊 HARUSS PODIO' }, { quoted: m })
}

handler.command = /^haruss$/i
handler.group = true

export default handler