import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn }) => {
  const users = Object.entries(global.db.data.users)
    .map(([id, data]) => ({ id, exp: data.exp || 0 }))
    .sort((a, b) => (b.exp || 0) - (a.exp || 0))
    .slice(0, 10)

  if (!users.length) return m.reply('❌ Nessun utente trovato nella classifica.')

  const width = 1500
  const height = 950
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1e3a8a')
  gradient.addColorStop(1, '#6d28d9')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#fff'
  ctx.font = 'bold 50px Sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('🏆 CLASSIFICA TOP 10 🏆', width / 2, 70)

  const podiumX = 950
  const podiumY = 500
  const podiumW = 120
  const podiumH = [250, 200, 150]

  ;[0,1,2].forEach((i) => {
    const x = podiumX + i * (podiumW + 30)
    const y = podiumY - podiumH[i]
    ctx.fillStyle = ['#FFD700','#C0C0C0','#CD7F32'][i]
    ctx.beginPath()
    ctx.roundRect(x, y, podiumW, podiumH[i], 20)
    ctx.fill()
    ctx.lineWidth = 4
    ctx.strokeStyle = '#fff'
    ctx.stroke()

    ctx.fillStyle = '#000'
    ctx.font = 'bold 40px Sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(`${i+1}`, x + podiumW/2, y + podiumH[i] - 20)
  })

  try {
    const avatar1 = await loadImage(await conn.profilePictureUrl(users[0].id, 'image').catch(_=>'https://telegra.ph/file/24fa902ead26340f3df2c.png'))
    ctx.save()
    ctx.beginPath()
    ctx.arc(podiumX + podiumW/2, podiumY - podiumH[0] - 70, 60, 0, Math.PI*2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatar1, podiumX, podiumY - podiumH[0] - 130, 120, 120)
    ctx.restore()

    // COPPA sopra la testa, più in alto
    ctx.fillStyle = '#FFD700'
    ctx.font = '90px Sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🏆', podiumX + podiumW/2, podiumY - podiumH[0] - 170)
  } catch {}

  ctx.fillStyle = '#fff'
  ctx.font = '30px Sans-serif'
  ctx.textAlign = 'left'
  for (let i = 3; i < users.length; i++) {
    ctx.fillText(`${i+1}. ${users[i].id.split('@')[0]} - ${users[i].exp} XP`, 80, 200 + (i-3)*60)
  }

  ctx.fillStyle = '#fff'
  ctx.font = 'italic 22px Sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('dev by matte', width - 30, height - 20)

  const buffer = canvas.toBuffer()
  return conn.sendMessage(m.chat, { image: buffer, caption: '📊 Classifica aggiornata!' }, { quoted: m })
}

handler.command = /^haruss$/i
handler.group = true
export default handler