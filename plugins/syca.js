import { createCanvas } from 'canvas'

let handler = async (m, { conn, command }) => {
  const users = Object.entries(global.db.data.users)
    .map(([id, data]) => ({ id, exp: data.exp || 0, euro: data.euro || 0 }))
    .sort((a, b) => (b.exp || 0) - (a.exp || 0))
    .slice(0, 10)

  if (!users.length) return m.reply('❌ Nessun utente trovato nella classifica.')

  const width = 1200
  const height = 800
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Sfondo
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, width, height)

  // Coriandoli
  for (let i = 0; i < 250; i++) {
    ctx.beginPath()
    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 4 + 2, 0, Math.PI * 2)
    ctx.fill()
  }

  // Titolo
  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 50px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('HARUSS CLASSIFICA', width / 2, 80)

  // Podio
  const podiumX = [350, 550, 750] // posizioni X
  const podiumY = [450, 300, 500] // posizioni Y
  const podiumH = [200, 350, 150] // altezze colonne
  const colors = ['#e5e7eb', '#facc15', '#d97706'] // 2°, 1°, 3°

  for (let i = 0; i < 3; i++) {
    if (!users[i]) continue
    ctx.fillStyle = colors[i]
    ctx.fillRect(podiumX[i], podiumY[i], 200, podiumH[i])

    // Cerchio sopra con medaglia
    ctx.beginPath()
    ctx.arc(podiumX[i] + 100, podiumY[i] - 60, 50, 0, Math.PI * 2)
    ctx.fillStyle = colors[i]
    ctx.fill()

    ctx.fillStyle = '#000'
    ctx.font = 'bold 28px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(`#${i + 1}`, podiumX[i] + 100, podiumY[i] - 50 + 10)

    // Nome + exp
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 22px Arial'
    ctx.fillText(users[i].id.split('@')[0], podiumX[i] + 100, podiumY[i] + podiumH[i] / 2)

    ctx.font = '18px Arial'
    ctx.fillText(`${users[i].euro || 0}€ | ${users[i].exp}xp`, podiumX[i] + 100, podiumY[i] + podiumH[i] / 2 + 30)
  }

  // Tabella TOP 4–10 (a sinistra)
  const boxX = 50
  const boxY = 200
  const boxW = 380
  const boxH = 400

  ctx.fillStyle = 'rgba(0,0,0,0.4)'
  ctx.fillRect(boxX, boxY, boxW, boxH)

  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 30px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('TOP 10:', boxX + 20, boxY + 40)

  ctx.font = '20px Arial'
  for (let i = 3; i < Math.min(10, users.length); i++) {
    const u = users[i]
    const y = boxY + 80 + (i - 3) * 35
    ctx.fillStyle = '#fff'
    ctx.fillText(`#${i + 1} ${u.id.split('@')[0]}`, boxX + 30, y)
    ctx.fillStyle = '#cbd5e1'
    ctx.fillText(`${u.euro || 0}€ | ${u.exp || 0}xp`, boxX + boxW - 160, y)
  }

  // Firma
  ctx.fillStyle = '#9ca3af'
  ctx.font = '16px Arial'
  ctx.textAlign = 'right'
  ctx.fillText('Dev by Matte', width - 20, height - 20)

  const buffer = canvas.toBuffer()
  return conn.sendMessage(m.chat, { image: buffer, caption: '📊 Classifica aggiornata!' }, { quoted: m })
}

handler.command = /^haruss$/i
export default handler