import { createCanvas, loadImage } from 'canvas'

async function generaClassifica(conn, chat, users, topN = 10) {
  const width = 850
  const height = 150 + topN * 100
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1e3a8a')
  gradient.addColorStop(1, '#6d28d9')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 46px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('🏆 CLASSIFICA', width / 2, 80)

  for (let i = 0; i < Math.min(topN, users.length); i++) {
    const u = users[i]
    const y = 170 + i * 90

    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.beginPath()
    ctx.roundRect(60, y - 50, width - 120, 80, 20)
    ctx.fill()

    try {
      const url = await conn.profilePictureUrl(u.id, 'image').catch(() => null)
      if (url) {
        const avatar = await loadImage(url)
        ctx.save()
        ctx.beginPath()
        ctx.arc(110, y - 10, 35, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(avatar, 75, y - 45, 70, 70)
        ctx.restore()
      }
    } catch {}

    ctx.fillStyle = '#fff'
    ctx.font = 'bold 26px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(`#${i + 1} ${u.name}`, 160, y)

    ctx.font = '22px Arial'
    ctx.fillStyle = '#e2e8f0'
    ctx.textAlign = 'right'
    ctx.fillText(`💰 ${u.euro || 0}€   ⭐ ${u.exp || 0}xp`, width - 90, y)
  }

  ctx.fillStyle = '#cbd5e1'
  ctx.font = '18px Arial'
  ctx.textAlign = 'right'
  ctx.fillText('Dev by Matte', width - 25, height - 25)

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

  const buffer = await generaClassifica(conn, chat, dbUsers, 10)
  await conn.sendMessage(chat, { image: buffer, caption: '📊 Classifica del gruppo' }, { quoted: m })
}

handler.command = /^classifica$/i
handler.group = true

export default handler