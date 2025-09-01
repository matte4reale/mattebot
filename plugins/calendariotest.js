import { createCanvas, loadImage } from 'canvas'

const pistolUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/AK-47_type_II_noBG.png/330px-AK-47_type_II_noBG.png'

global.rouletteChallenge = {}

let handler = async (m, { conn }) => {
  if (!m.mentionedJid?.[0]) return m.reply('⚠️ Usa: `.roulette @utente` per sfidare qualcuno.')

  const player1 = m.sender
  const player2 = m.mentionedJid[0]
  if (player2 === player1) return m.reply('⚠️ Non puoi sfidare te stesso.')

  global.rouletteChallenge[m.chat] = { player1, player2 }

  const width = 1000, height = 700
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#111'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 60px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('ROULETTE RUSSA', width / 2, 80)

  async function drawPlayer(id, x, y) {
    const ppUrl = await conn.profilePictureUrl(id, 'image').catch(() => null)
    const img = ppUrl ? await loadImage(ppUrl) : null
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
    ctx.font = 'bold 28px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(id.split('@')[0], x, y + 160)
  }

  // avatar più spostati
  await drawPlayer(player1, 200, height / 2)
  await drawPlayer(player2, width - 200, height / 2)

  try {
    const gun = await loadImage(pistolUrl)
    ctx.save()
    ctx.translate(width / 2, height / 2)
    ctx.rotate(Math.PI / 2) // pistola girata 90°
    ctx.drawImage(gun, -200, -100, 400, 200)
    ctx.restore()
  } catch {
    ctx.fillStyle = '#666'
    ctx.fillRect(width / 2 - 100, height / 2 - 30, 200, 60)
  }

  const buffer = canvas.toBuffer('image/jpeg')
  await conn.sendMessage(m.chat, {
    image: buffer,
    caption: `🔫 ${player1.split('@')[0]} sfida ${player2.split('@')[0]}!\nChi rischia?`,
    buttons: [
      { buttonId: '.risk', buttonText: { displayText: '👉 Rischia' }, type: 1 },
      { buttonId: '.quit', buttonText: { displayText: '❌ Ritirati' }, type: 1 }
    ],
    headerType: 4,
    mentions: [player1, player2]
  })
}

handler.command = /^roulette$/i
handler.group = true

handler.all = async (m, { conn }) => {
  const chat = m.chat
  const challenge = global.rouletteChallenge[chat]
  if (!challenge) return

  if (m.text === '.risk' && (m.sender === challenge.player1 || m.sender === challenge.player2)) {
    const challenger = m.sender
    const opponent = (challenger === challenge.player1) ? challenge.player2 : challenge.player1
    const victim = (Math.random() < 0.5) ? challenger : opponent

    const width = 1000, height = 700
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = '#facc15'
    ctx.font = 'bold 60px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('💥 LO SPARO!', width / 2, 80)

    async function drawPlayerHit(id, x, y, hit) {
      const ppUrl = await conn.profilePictureUrl(id, 'image').catch(() => null)
      const img = ppUrl ? await loadImage(ppUrl) : null
      if (img) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, 120, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(img, x - 120, y - 120, 240, 240)
        ctx.restore()
      }
      ctx.strokeStyle = '#facc15'
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.arc(x, y, 120, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 28px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(id.split('@')[0], x, y + 160)

      if (hit) {
        ctx.fillStyle = 'rgba(255,0,0,0.6)'
        ctx.beginPath()
        ctx.arc(x, y, 130, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 32px Arial'
        ctx.fillText('💀 COLPITO', x, y - 140)
      }
    }

    await drawPlayerHit(challenge.player1, 200, height / 2, victim === challenge.player1)
    await drawPlayerHit(challenge.player2, width - 200, height / 2, victim === challenge.player2)

    const buffer = canvas.toBuffer('image/jpeg')
    await conn.sendMessage(chat, {
      image: buffer,
      caption: `🔫 Vittima: @${victim.split('@')[0]}`,
      mentions: [victim]
    }, { quoted: m })

    delete global.rouletteChallenge[chat]
  }

  if (m.text === '.quit') {
    delete global.rouletteChallenge[m.chat]
    await conn.sendMessage(m.chat, { text: '❌ Sfida ritirata.' }, { quoted: m })
  }
}

export default handler