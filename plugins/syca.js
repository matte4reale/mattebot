import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn, command }) => {
  const users = Object.entries(global.db.data.users)
    .map(([id, data]) => ({ id, exp: data.exp || 0, euro: data.euro || 0 }))
    .sort((a, b) => (b.exp || 0) - (a.exp || 0))
    .slice(0, 10)

  if (!users.length) return m.reply('❌ Nessun utente trovato nella classifica.')

  const width = 1300
  const height = 900
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Sfondo
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, width, height)

  // Coriandoli
  for (let i = 0; i < 300; i++) {
    ctx.beginPath()
    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 4 + 2, 0, Math.PI * 2)
    ctx.fill()
  }

  // Titolo
  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 55px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('HARUSS CLASSIFICA', width / 2, 100)

  // Podio (spostato a destra)
  const podiumX = [550, 850, 1100] // posizioni X (più a destra)
  const podiumY = [500, 320, 600]
  const podiumH = [220, 370, 170]
  const colors = ['#e5e7eb', '#facc15', '#d97706'] // 2°, 1°, 3°

  for (let i = 0; i < 3; i++) {
    if (!users[i]) continue
    ctx.fillStyle = colors[i]
    ctx.fillRect(podiumX[i], podiumY[i], 200, podiumH[i])

    // Cerchio sopra
    ctx.beginPath()
    ctx.arc(podiumX[i] + 100, podiumY[i] - 80, 60, 0, Math.PI * 2)
    ctx.fillStyle = colors[i]
    ctx.fill()

    // Prova a caricare la foto profilo
    try {
      let pp = await conn.profilePictureUrl(users[i].id, 'image').catch(() => null)
      if (pp) {
        let img = await loadImage(pp)
        ctx.save()
        ctx.beginPath()
        ctx.arc(podiumX[i] + 100, podiumY[i] - 80, 55, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(img, podiumX[i] + 45, podiumY[i] - 135, 110, 110)
        ctx.restore()
      }
    } catch (e) {
      console.log('Errore caricamento pp:', e)
    }

    // Numero posizione dentro al cerchio
    ctx.fillStyle = '#000'
    ctx.font = 'bold 28px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(`#${i + 1}`, podiumX[i] + 100, podiumY[i] - 80 + 100)

    // Nome e xp
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 22px Arial'
    ctx.fillText(users[i].id.split('@')[0], podiumX[i] + 100, podiumY[i] + podiumH[i] / 2)

    ctx.font = '18px Arial'
    ctx.fillText(`${users[i].euro || 0}€ | ${users[i].exp}xp`, podiumX[i] + 100, podiumY[i] + podiumH[i] / 2 + 30)
  }

  // Tabella TOP 4–10 (a sinistra)
  const boxX = 50
  const boxY = 250
  const boxW = 420
  const boxH = 500

  ctx.fillStyle = 'rgba(0,0,0,0.4)'
  ctx.fillRect(boxX, boxY, boxW, boxH)

  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 32px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('TOP 10:', boxX + 20, boxY + 40)

  ctx.font = '22px Arial'
  for (let i = 3; i < Math.min(10, users.length); i++) {
    const u = users[i]
    const y = boxY + 80 + (i - 3) * 50

    ctx.fillStyle = '#fff'
    ctx.fillText(`#${i + 1} ${u.id.split('@')[0]}`, boxX + 30, y)

    ctx.fillStyle = '#cbd5e1'
    ctx.fillText(`${u.euro || 0}€ | ${u.exp || 0}xp`, boxX + 250, y)
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