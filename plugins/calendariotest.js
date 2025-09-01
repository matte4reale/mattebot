import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn, participants }) => {
  if (!m.isGroup) return m.reply('❌ Questo comando funziona solo nei gruppi!')

  let players = participants
    .filter(p => !p.admin) // facciamo che non colpisce gli admin
    .map(p => p.id)

  if (players.length < 2) return m.reply('❌ Servono almeno 2 partecipanti!')

  // scegli la vittima
  let victim = players[Math.floor(Math.random() * players.length)]

  const width = 1000
  const height = 1000
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // sfondo
  ctx.fillStyle = '#111'
  ctx.fillRect(0, 0, width, height)

  // cerchio dei giocatori
  const centerX = width / 2
  const centerY = height / 2
  const radius = 350

  for (let i = 0; i < players.length; i++) {
    let angle = (i / players.length) * (2 * Math.PI) - Math.PI / 2
    let x = centerX + radius * Math.cos(angle)
    let y = centerY + radius * Math.sin(angle)

    try {
      let pp = await conn.profilePictureUrl(players[i], 'image').catch(() => null)
      if (pp) {
        let img = await loadImage(pp)
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, 70, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(img, x - 70, y - 70, 140, 140)
        ctx.restore()
      }

      // cerchietto bianco attorno
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 5
      ctx.beginPath()
      ctx.arc(x, y, 72, 0, Math.PI * 2)
      ctx.stroke()

      // scrivi il numero
      ctx.fillStyle = '#fff'
      ctx.font = '22px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(i + 1, x, y + 100)

      // se è la vittima → disegno splash rosso
      if (players[i] === victim) {
        ctx.fillStyle = 'rgba(220, 20, 60, 0.7)'
        ctx.beginPath()
        ctx.arc(x, y, 80, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#fff'
        ctx.font = 'bold 26px Arial'
        ctx.fillText('💀 COLPITO', x, y - 100)
      }
    } catch {}
  }

  // pistola al centro che punta verso la vittima
  ctx.fillStyle = '#444'
  ctx.beginPath()
  ctx.rect(centerX - 40, centerY - 80, 80, 160)
  ctx.fill()
  ctx.strokeStyle = '#999'
  ctx.lineWidth = 5
  ctx.stroke()

  ctx.fillStyle = '#666'
  ctx.fillRect(centerX - 15, centerY - 200, 30, 120)

  ctx.fillStyle = '#999'
  ctx.fillRect(centerX - 60, centerY + 40, 120, 40)

  // scritta finale
  ctx.fillStyle = '#f00'
  ctx.font = 'bold 48px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('💥 Roulette Russa 💥', centerX, 80)

  let buffer = canvas.toBuffer()
  await conn.sendMessage(m.chat, { image: buffer, caption: `🔫 Colpito: @${victim.split('@')[0]}` }, { quoted: m, mentions: [victim] })
}

handler.command = /^roulette$/i
handler.group = true

export default handler