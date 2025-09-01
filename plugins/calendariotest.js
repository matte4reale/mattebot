import { createCanvas } from 'canvas'

const CAMERE = 6

let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('❌ Questo comando funziona solo nei gruppi.')

  const colpo = Math.floor(Math.random() * CAMERE) + 1
  const proiettile = Math.floor(Math.random() * CAMERE) + 1
  const morto = colpo === proiettile

  const canvas = createCanvas(600, 600)
  const ctx = canvas.getContext('2d')

  // sfondo gradiente metallico
  const grad = ctx.createRadialGradient(300, 300, 100, 300, 300, 400)
  grad.addColorStop(0, '#1f2937')
  grad.addColorStop(1, '#111')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 600, 600)

  // tamburo pistola
  ctx.beginPath()
  ctx.arc(300, 300, 220, 0, Math.PI * 2)
  ctx.fillStyle = '#444'
  ctx.fill()
  ctx.strokeStyle = '#aaa'
  ctx.lineWidth = 12
  ctx.stroke()

  // cerchio interno
  ctx.beginPath()
  ctx.arc(300, 300, 80, 0, Math.PI * 2)
  ctx.fillStyle = '#333'
  ctx.fill()
  ctx.strokeStyle = '#888'
  ctx.lineWidth = 6
  ctx.stroke()

  // camere
  for (let i = 0; i < CAMERE; i++) {
    const angle = (i / CAMERE) * Math.PI * 2 - Math.PI / 2
    const cx = 300 + Math.cos(angle) * 130
    const cy = 300 + Math.sin(angle) * 130

    // camera esterna
    ctx.beginPath()
    ctx.arc(cx, cy, 50, 0, Math.PI * 2)
    ctx.fillStyle = (i + 1 === proiettile) ? '#b91c1c' : '#222'
    ctx.fill()
    ctx.strokeStyle = '#999'
    ctx.lineWidth = 5
    ctx.stroke()

    // piccolo cerchio interno (effetto 3D)
    ctx.beginPath()
    ctx.arc(cx, cy, 20, 0, Math.PI * 2)
    ctx.fillStyle = '#555'
    ctx.fill()
  }

  // testo risultato
  ctx.font = 'bold 50px Arial'
  ctx.textAlign = 'center'
  ctx.lineWidth = 8
  ctx.strokeStyle = morto ? '#7f1d1d' : '#065f46'
  ctx.strokeText(morto ? '💀 COLPITO!' : '✅ SALVO!', 300, 560)

  ctx.fillStyle = morto ? '#ef4444' : '#22c55e'
  ctx.fillText(morto ? '💀 COLPITO!' : '✅ SALVO!', 300, 560)

  const buffer = canvas.toBuffer()
  await conn.sendMessage(m.chat, { image: buffer, caption: `🔫 Roulette russa: ${morto ? '☠️ BOOM! Sei stato colpito!' : '😮‍💨 Click! Sei salvo questa volta.'}` }, { quoted: m })

  if (morto) {
    try {
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
      setTimeout(() => {
        conn.groupParticipantsUpdate(m.chat, [m.sender], 'add')
      }, 30000)
    } catch {
      m.reply('⚠️ Non sono riuscito a kikkarti, ma eri morto lo stesso 💀')
    }
  }
}

handler.command = /^roulette$/i
handler.group = true

export default handler