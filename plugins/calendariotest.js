import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn, args }) => {
  if (!m.mentionedJid[0]) return m.reply('⚠️ Tagga qualcuno!\n\nEsempio: .roulette @user')

  let player1 = m.sender
  let player2 = m.mentionedJid[0]

  const width = 1000, height = 700
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // sfondo scuro
  ctx.fillStyle = '#111'
  ctx.fillRect(0, 0, width, height)

  // foto profili
  let pp1 = await conn.profilePictureUrl(player1, 'image').catch(() => null)
  let pp2 = await conn.profilePictureUrl(player2, 'image').catch(() => null)
  let img1 = pp1 ? await loadImage(pp1) : null
  let img2 = pp2 ? await loadImage(pp2) : null

  // posizioni
  let x1 = width / 4, y1 = height / 2
  let x2 = (width / 4) * 3, y2 = height / 2

  function drawPlayer(img, x, y, tag) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, 120, 0, Math.PI * 2)
    ctx.clip()
    if (img) ctx.drawImage(img, x - 120, y - 120, 240, 240)
    ctx.restore()

    ctx.strokeStyle = '#facc15'
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.arc(x, y, 120, 0, Math.PI * 2)
    ctx.stroke()

    ctx.fillStyle = '#fff'
    ctx.font = 'bold 26px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(tag.split('@')[0], x, y + 160)
  }

  drawPlayer(img1, x1, y1, player1)
  drawPlayer(img2, x2, y2, player2)

  // pistola PNG (serve avere un file nella cartella)
  try {
    let gun = await loadImage('./media/pistol.png') // metti un'immagine pistola vera qui
    ctx.save()
    ctx.translate(width / 2, height / 2)
    ctx.rotate(Math.random() < 0.5 ? Math.PI : 0) // ruota verso sinistra o destra
    ctx.drawImage(gun, -150, -80, 300, 160)
    ctx.restore()
  } catch {
    ctx.fillStyle = '#888'
    ctx.fillRect(width / 2 - 100, height / 2 - 30, 200, 60) // fallback pistola stilizzata
  }

  const buffer = canvas.toBuffer('image/jpeg')

  // messaggio con bottoni
  return conn.sendMessage(m.chat, {
    image: buffer,
    caption: `🔫 **Roulette Russa**\n\n${m.sender.split('@')[0]} sfida ${player2.split('@')[0]}!\n\n👉 Chi rischia?`,
    buttons: [
      { buttonId: '.risk ' + player1, buttonText: { displayText: '👉 Rischia' }, type: 1 },
      { buttonId: '.quit', buttonText: { displayText: '❌ Ritirati' }, type: 1 }
    ],
    headerType: 4,
    mentions: [player1, player2]
  })
}

handler.command = /^roulette$/i
handler.group = true

export default handler