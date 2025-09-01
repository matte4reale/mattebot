import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn, participants }) => {
  if (!m.isGroup) return m.reply('❌ Solo nei gruppi!')

  let players = participants.map(p => p.id)
  if (players.length < 2) return m.reply('❌ Servono almeno 2 giocatori!')

  // scelgo vittima casuale
  let victim = players[Math.floor(Math.random() * players.length)]

  const width = 1200, height = 1200
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // sfondo
  ctx.fillStyle = '#0f0f0f'
  ctx.fillRect(0, 0, width, height)

  // titolo
  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 70px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('ROULETTE RUSSA', width / 2, 100)

  // cerchio giocatori
  let cx = width / 2, cy = height / 2
  let r = 400

  // cache immagini profilo
  let ppCache = {}
  for (let id of players) {
    let url = await conn.profilePictureUrl(id, 'image').catch(() => null)
    ppCache[id] = url ? await loadImage(url) : null
  }

  players.forEach((id, i) => {
    let angle = (i / players.length) * (2 * Math.PI) - Math.PI / 2
    let x = cx + r * Math.cos(angle)
    let y = cy + r * Math.sin(angle)

    if (id === victim) {
      // glow rosso dietro la testa
      ctx.fillStyle = 'rgba(255,0,0,0.5)'
      ctx.beginPath()
      ctx.arc(x, y, 90, 0, Math.PI * 2)
      ctx.fill()
    }

    // cerchio profilo
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, 70, 0, Math.PI * 2)
    ctx.clip()
    if (ppCache[id]) ctx.drawImage(ppCache[id], x - 70, y - 70, 140, 140)
    ctx.restore()

    // cornice dorata
    ctx.strokeStyle = '#facc15'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(x, y, 72, 0, Math.PI * 2)
    ctx.stroke()

    // nick
    ctx.fillStyle = '#fff'
    ctx.font = '20px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(id.split('@')[0], x, y + 100)
  })

  // pistola centrale che punta alla vittima
  let victimIndex = players.indexOf(victim)
  let victimAngle = (victimIndex / players.length) * (2 * Math.PI) - Math.PI / 2
  let gunAngle = victimAngle

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(gunAngle)
  ctx.fillStyle = '#444'
  ctx.fillRect(-50, -20, 220, 40) // canna
  ctx.fillStyle = '#222'
  ctx.fillRect(170, -12, 40, 24) // bocca
  ctx.restore()

  // scritta COLPITO
  ctx.fillStyle = '#ff0000'
  ctx.font = 'bold 60px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('💀 COLPITO!', width / 2, height - 80)

  const buffer = canvas.toBuffer('image/jpeg')
  return conn.sendMessage(m.chat, {
    image: buffer,
    caption: `🔫 È stato colpito: @${victim.split('@')[0]}`
  }, { quoted: m, mentions: [victim] })
}

handler.command = /^roulette$/i
handler.group = true

export default handler