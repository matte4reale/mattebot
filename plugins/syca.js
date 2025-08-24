import { createCanvas, loadImage } from 'canvas'

async function generaLeaderboard(conn, chat, users, topN = 10) {
  const width = 800
  const height = 120 + topN * 90
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // sfondo
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, width, height)

  // titolo
  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 40px Poppins, Arial'
  ctx.textAlign = 'center'
  ctx.fillText('🏆 CLASSIFICA TOP', width / 2, 70)

  for (let i = 0; i < Math.min(topN, users.length); i++) {
    const u = users[i]
    const y = 130 + i * 90

    // riga
    ctx.fillStyle = i % 2 === 0 ? '#1e293b' : '#334155'
    ctx.fillRect(50, y - 50, width - 100, 80)

    // avatar
    try {
      const url = await conn.profilePictureUrl(u.id, 'image').catch(() => null)
      if (url) {
        const avatar = await loadImage(url)
        ctx.save()
        ctx.beginPath()
        ctx.arc(90, y - 10, 30, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(avatar, 60, y - 40, 60, 60)
        ctx.restore()
      }
    } catch {}

    // posizione + nome
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 24px Poppins, Arial'
    ctx.textAlign = 'left'
    ctx.fillText(`#${i + 1} ${u.name}`, 140, y)

    // stats
    ctx.font = '20px Poppins, Arial'
    ctx.fillStyle = '#cbd5e1'
    ctx.textAlign = 'right'
    ctx.fillText(`💰 ${u.euro || 0}€   ⭐ ${u.exp || 0}xp`, width - 70, y)
  }

  // firma
  ctx.fillStyle = '#94a3b8'
  ctx.font = '16px Poppins, Arial'
  ctx.textAlign = 'right'
  ctx.fillText('Dev by Matte', width - 20, height - 20)

  return canvas.toBuffer()
}

let handler = async (m, { conn, command }) => {
  const chat = m.chat
  const dbUsers = Object.entries(global.db.data.users)
    .map(([id, u]) => ({
      id,
      name: u.name || id.split('@')[0],
      euro: u.euro || 0,
      exp: u.exp || 0
    }))
    .sort((a, b) => (b.euro + b.exp) - (a.euro + a.exp))

  const buffer = await generaLeaderboard(conn, chat, dbUsers, 10)
  await conn.sendMessage(chat, { image: buffer, caption: '📊 Classifica del gruppo' }, { quoted: m })
}

handler.command = /^top$/i
handler.group = true

export default handler