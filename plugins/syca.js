import { createCanvas, loadImage } from 'canvas'

async function generaPodio(conn, chat, users, topN = 10) {
  const width = 950
  const height = 750
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // --- SFONDO FESTOSO ---
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1e3a8a')
  gradient.addColorStop(1, '#0f172a')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // coriandoli 🎉
  for (let i = 0; i < 200; i++) {
    ctx.fillStyle = ['#f87171', '#34d399', '#60a5fa', '#fbbf24', '#a78bfa'][Math.floor(Math.random() * 5)]
    ctx.beginPath()
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 5 + 2, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 55px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('🏆 HARUSS PODIO', width / 2, 70)

  // --- POSIZIONI PODIO ---
  const podium = [
    { pos: 2, x: width / 2 - 220, y: 320, h: 180, color: '#c0c0c0' }, // argento
    { pos: 1, x: width / 2, y: 260, h: 240, color: '#ffd700' },       // oro
    { pos: 3, x: width / 2 + 220, y: 350, h: 150, color: '#cd7f32' }  // bronzo
  ]

  for (let i = 0; i < 3 && i < users.length; i++) {
    const u = users.find(x => x.rank === podium[i].pos)
    const p = podium[i]

    // base podio
    ctx.fillStyle = p.color
    ctx.fillRect(p.x - 80, height - p.h - 200, 160, p.h)

    // avatar
    try {
      const url = await conn.profilePictureUrl(u.id, 'image').catch(() => null)
      if (url) {
        const avatar = await loadImage(url)
        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, height - p.h - 260, 70, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(avatar, p.x - 70, height - p.h - 330, 140, 140)
        ctx.restore()
      }
    } catch {}

    // nome
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 26px Arial'
    ctx.fillText(u.name, p.x, height - p.h - 100)

    // punti
    ctx.fillStyle = '#e2e8f0'
    ctx.font = '22px Arial'
    ctx.fillText(`💰${u.euro || 0}€ ⭐${u.exp || 0}xp`, p.x, height - p.h - 70)

    // il primo ha la coppa + manine 🙌
    if (p.pos === 1) {
      ctx.fillText('🙌 🏆 🙌', p.x, height - p.h - 160)
    }
  }

  // --- LISTA DAL 4° AL 10° ---
  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 32px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('TOP 10:', 120, height - 250)

  ctx.font = '22px Arial'
  for (let i = 3; i < Math.min(topN, users.length); i++) {
    const u = users[i]
    const y = height - 200 + (i - 3) * 40
    ctx.fillStyle = '#fff'
    ctx.fillText(`#${i + 1} ${u.name}`, 140, y)
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
    .map(([id, u], i) => ({
      id,
      name: u.name || id.split('@')[0],
      euro: u.euro || 0,
      exp: u.exp || 0,
      rank: i + 1
    }))
    .sort((a, b) => (b.euro + b.exp) - (a.euro + a.exp))

  const buffer = await generaPodio(conn, chat, dbUsers, 10)
  await conn.sendMessage(chat, { image: buffer, caption: '🎉 HARUSS CLASSIFICA 🎉' }, { quoted: m })
}

handler.command = /^haruss$/i
handler.group = true

export default handler