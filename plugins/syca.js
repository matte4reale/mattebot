import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn }) => {
  const users = Object.entries(global.db.data.users)
    .map(([id, data]) => ({ id, exp: data.exp || 0, euro: data.euro || 0 }))
    .sort((a, b) => (b.exp || 0) - (a.exp || 0))
    .slice(0, 10)

  if (!users.length) return m.reply('❌ Nessun utente trovato nella classifica.')

  const width = 1400
  const height = 900
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // SFONDO sfumato
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1e3a8a')
  gradient.addColorStop(1, '#6d28d9')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // CORIANDOLI
  for (let i = 0; i < 250; i++) {
    ctx.beginPath()
    ctx.fillStyle = `hsl(${Math.random() * 360}, 80%, 60%)`
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 2, 0, Math.PI * 2)
    ctx.fill()
  }

  // TITOLO
  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 60px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('HARUSS CLASSIFICA', width / 2, 80)

  // P O D I O (a destra)
  const podiumX = [width - 600, width - 300, width - 900] // 2°, 1°, 3°
  const podiumY = [500, 350, 600]
  const podiumH = [220, 370, 170]
  const colors = ['#9ca3af', '#facc15', '#d97706']

  for (let i = 0; i < 3; i++) {
    if (!users[i]) continue

    // Colonne
    ctx.fillStyle = colors[i]
    ctx.fillRect(podiumX[i], podiumY[i], 180, podiumH[i])

    // Cerchio sopra
    ctx.beginPath()
    ctx.arc(podiumX[i] + 90, podiumY[i] - 100, 70, 0, Math.PI * 2)
    ctx.fillStyle = colors[i]
    ctx.fill()

    // Foto profilo
    try {
      let pp = await conn.profilePictureUrl(users[i].id, 'image').catch(() => null)
      if (pp) {
        let img = await loadImage(pp)
        ctx.save()
        ctx.beginPath()
        ctx.arc(podiumX[i] + 90, podiumY[i] - 100, 65, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(img, podiumX[i] + 25, podiumY[i] - 165, 130, 130)
        ctx.restore()
      }
    } catch {}

    // Nome + stats
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 22px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(users[i].id.split('@')[0], podiumX[i] + 90, podiumY[i] + podiumH[i] + 30)

    ctx.font = '18px Arial'
    ctx.fillText(`${users[i].euro || 0}€ | ${users[i].exp}xp`, podiumX[i] + 90, podiumY[i] + podiumH[i] + 55)
  }

  // COPPA + MANI disegnate sopra al 1°
  const centerX = width - 300 + 90
  const topY = 350 - 200

  // Coppa
  ctx.fillStyle = '#FFD700'
  ctx.beginPath()
  ctx.moveTo(centerX - 50, topY)
  ctx.lineTo(centerX + 50, topY)
  ctx.lineTo(centerX + 40, topY + 80)
  ctx.lineTo(centerX - 40, topY + 80)
  ctx.closePath()
  ctx.fill()

  ctx.fillRect(centerX - 20, topY + 80, 40, 40) // stelo
  ctx.fillRect(centerX - 50, topY + 120, 100, 20) // base

  // Manine
  ctx.strokeStyle = '#ffcc99'
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.arc(centerX - 90, topY + 40, 30, 0, Math.PI * 2) // sx
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(centerX + 90, topY + 40, 30, 0, Math.PI * 2) // dx
  ctx.stroke()

  // LISTA (4–10) a sinistra
  const boxX = 80
  const boxY = 200
  const boxW = 450
  const boxH = 550

  ctx.fillStyle = 'rgba(0,0,0,0.55)'
  ctx.fillRect(boxX, boxY, boxW, boxH)

  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 36px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('TOP 10:', boxX + 20, boxY + 50)

  ctx.font = '22px Arial'
  for (let i = 3; i < Math.min(10, users.length); i++) {
    const u = users[i]
    const y = boxY + 100 + (i - 3) * 60

    ctx.fillStyle = '#fff'
    ctx.fillText(`#${i + 1} ${u.id.split('@')[0]}`, boxX + 30, y)

    ctx.fillStyle = '#cbd5e1'
    ctx.fillText(`${u.euro || 0}€ | ${u.exp || 0}xp`, boxX + 280, y)
  }

  // FIRMA
  ctx.fillStyle = '#9ca3af'
  ctx.font = '18px Arial'
  ctx.textAlign = 'right'
  ctx.fillText('Dev by Matte', width - 20, height - 20)

  const buffer = canvas.toBuffer()
  return conn.sendMessage(m.chat, { image: buffer, caption: '📊 Classifica aggiornata!' }, { quoted: m })
}

handler.command = /^haruss$/i
export default handler