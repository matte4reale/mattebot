import { createCanvas } from 'canvas'

const NUMERO_AUTORIZZATO = '66621409462@s.whatsapp.net' // puoi togliere se vuoi tutti possano usarlo
const CAMERE = 6

let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('❌ Questo comando funziona solo nei gruppi.')

  // estrazione colpo
  const colpo = Math.floor(Math.random() * CAMERE) + 1
  const proiettile = Math.floor(Math.random() * CAMERE) + 1
  const morto = colpo === proiettile

  // canvas
  const canvas = createCanvas(500, 500)
  const ctx = canvas.getContext('2d')

  // sfondo
  ctx.fillStyle = '#222'
  ctx.fillRect(0, 0, 500, 500)

  // cerchio tamburo
  ctx.beginPath()
  ctx.arc(250, 250, 200, 0, Math.PI * 2)
  ctx.fillStyle = '#444'
  ctx.fill()
  ctx.strokeStyle = '#999'
  ctx.lineWidth = 8
  ctx.stroke()

  // 6 camere
  for (let i = 0; i < CAMERE; i++) {
    const angle = (i / CAMERE) * Math.PI * 2
    const cx = 250 + Math.cos(angle) * 120
    const cy = 250 + Math.sin(angle) * 120

    ctx.beginPath()
    ctx.arc(cx, cy, 40, 0, Math.PI * 2)
    ctx.fillStyle = (i + 1 === proiettile) ? 'red' : '#222'
    ctx.fill()
    ctx.strokeStyle = '#bbb'
    ctx.lineWidth = 4
    ctx.stroke()
  }

  // risultato
  ctx.fillStyle = morto ? 'red' : 'lime'
  ctx.font = 'bold 40px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(morto ? '💀 COLPITO!' : '✅ SALVO!', 250, 480)

  // invio
  const buffer = canvas.toBuffer()
  await conn.sendMessage(m.chat, { image: buffer, caption: `🎲 Roulette russa: ${morto ? '☠️ Sei stato colpito!' : '😮‍💨 Sei salvo questa volta!'}` }, { quoted: m })

  // se colpito = kikkato per 30 secondi
  if (morto) {
    try {
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
      setTimeout(() => {
        conn.groupParticipantsUpdate(m.chat, [m.sender], 'add')
      }, 30000)
    } catch (e) {
      m.reply('⚠️ Non sono riuscito a kikkarti, ma eri morto lo stesso 💀')
    }
  }
}

handler.command = /^roulette$/i
handler.help = ['roulette']
handler.tags = ['game']
handler.group = true

export default handler