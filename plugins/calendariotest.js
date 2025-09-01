import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn, participants }) => {
  if (!m.isGroup) return m.reply('❌ Questo comando funziona solo nei gruppi!')

  let players = participants
    .filter(p => !p.admin) // non colpisce admin
    .map(p => p.id)

  if (players.length < 2) return m.reply('❌ Servono almeno 2 giocatori!')

  let victim = players[Math.floor(Math.random() * players.length)]

  const width = 1200
  const height = 1000
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // sfondo elegante
  let grad = ctx.createLinearGradient(0, 0, width, height)
  grad.addColorStop(0, '#0f172a')
  grad.addColorStop(1, '#1e293b')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  // cerchio giocatori
  const cx = width / 2
  const cy = height / 2
  const r = 370

  for (let i = 0; i < players.length; i++) {
    let angle = (i / players.length) * (2 * Math.PI) - Math.PI / 2
    let x = cx + r * Math.cos(angle)
    let y = cy + r * Math.sin(angle)

    try {
      let pp = await conn.profilePictureUrl(players[i], 'image').catch(() => null)
      if (pp) {
        let img = await loadImage(pp)
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, 65, 0, Math.PI * 2)
        ctx.shadowColor = 'rgba(255,255,255,0.6)'
        ctx.shadowBlur = 12
        ctx.clip()
        ctx.drawImage(img, x - 65, y - 65, 130, 130)
        ctx.restore()
      }

      ctx.strokeStyle = '#facc15'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.arc(x, y, 68, 0, Math.PI * 2)
      ctx.stroke()

      ctx.fillStyle = '#fff'
      ctx.font = '20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(i + 1, x, y + 95)

      // effetto sparo sulla vittima
      if (players[i] === victim) {
        ctx.fillStyle = 'rgba(220,0,0,0.4)'
        ctx.beginPath()
        ctx.arc(x, y, 85, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#ff4444'
        ctx.font = 'bold 26px Arial'
        ctx.fillText('💀 COLPITO', x, y - 95)

        // "buco" e sangue
        ctx.fillStyle = '#660000'
        ctx.beginPath()
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fill()

        for (let j = 0; j < 12; j++) {
          let bx = x + Math.cos(Math.random() * 2 * Math.PI) * (30 + Math.random() * 30)
          let by = y + Math.sin(Math.random() * 2 * Math.PI) * (30 + Math.random() * 30)
          ctx.fillStyle = 'rgba(200,0,0,0.8)'
          ctx.beginPath()
          ctx.arc(bx, by, 6 + Math.random() * 8, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    } catch {}
  }

  // pistola realistica (laterale che punta verso la vittima)
  let gunX = cx - 80
  let gunY = cy - 80

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(Math.random() * Math.PI * 2) // punta random
  ctx.translate(-cx, -cy)

  // canna
  ctx.fillStyle = '#444'
  ctx.fillRect(gunX, gunY, 180, 35)

  // parte frontale
  ctx.fillStyle = '#666'
  ctx.fillRect(gunX + 180, gunY + 5, 30, 25)

  // manico
  ctx.fillStyle = '#2e2e2e'
  ctx.beginPath()
  ctx.moveTo(gunX, gunY + 35)
  ctx.lineTo(gunX + 60, gunY + 150)
  ctx.lineTo(gunX + 100, gunY + 150)
  ctx.lineTo(gunX + 60, gunY + 35)
  ctx.closePath()
  ctx.fill()

  // grilletto
  ctx.strokeStyle = '#aaa'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(gunX + 40, gunY + 60, 15, Math.PI / 2, Math.PI)
  ctx.stroke()

  ctx.restore()

  // titolo
  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 54px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('ROULETTE RUSSA', cx, 90)

  let buffer = canvas.toBuffer()
  return conn.sendMessage(
    m.chat,
    { image: buffer, caption: `🔫 È stato colpito: @${victim.split('@')[0]}` },
    { quoted: m, mentions: [victim] }
  )
}

handler.command = /^roulette$/i
handler.group = true

export default handler