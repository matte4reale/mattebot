import { createCanvas, loadImage } from 'canvas'

let games = {}

let handler = async (m, { conn, command }) => {
  const chat = m.chat
  games[chat] = games[chat] || { players: [], turn: 0, active: false }

  if (command === 'roulette') {
    if (!m.mentionedJid[0]) return m.reply('⚠️ Tagga un utente per sfidarlo.\nEsempio: .roulette @utente')

    const player1 = m.sender
    const player2 = m.mentionedJid[0]

    games[chat] = { players: [player1, player2], turn: 0, active: true }

    return m.reply(
      `🎲 Roulette russa iniziata!\n👤 @${player1.split('@')[0]} VS 👤 @${player2.split('@')[0]}\n\nUsa *.risk* per sparare.`,
      null,
      { mentions: [player1, player2] }
    )
  }

  if (command === 'risk') {
    let game = games[chat]
    if (!game || !game.active) return m.reply('❌ Nessuna partita attiva. Usa .roulette @utente per iniziare.')

    let shooter = game.players[game.turn]
    if (m.sender !== shooter) return m.reply('⏳ Non è il tuo turno!')

    let target = game.players[1 - game.turn]

    let shot = Math.floor(Math.random() * 6) === 0

    const width = 1000, height = 600
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // sfondo sfumato accattivante
    const gradient = ctx.createRadialGradient(width/2, height/2, 200, width/2, height/2, 700)
    gradient.addColorStop(0, '#0f172a')
    gradient.addColorStop(1, '#1e293b')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // titolo
    ctx.fillStyle = '#facc15'
    ctx.font = 'bold 60px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('ROULETTE RUSSA', width / 2, 90)

    // avatar
    const radius = 120
    const positions = [
      { x: 250, y: 320, id: game.players[0] },
      { x: 750, y: 320, id: game.players[1] }
    ]

    for (let pos of positions) {
      try {
        let pp = await conn.profilePictureUrl(pos.id, 'image').catch(() => null)
        let img = pp ? await loadImage(pp) : null
        ctx.save()
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        ctx.clip()
        if (img) ctx.drawImage(img, pos.x - radius, pos.y - radius, radius * 2, radius * 2)
        ctx.restore()

        ctx.lineWidth = 8
        ctx.strokeStyle = '#facc15'
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        ctx.stroke()

        let name = await conn.getName(pos.id)
        name = name.replace(/[^\x00-\x7F]/g, '') // niente caratteri strani
        ctx.fillStyle = '#fff'
        ctx.font = '26px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(name, pos.x, pos.y + radius + 45)
      } catch {}
    }

    // pistola
    const pistol = await loadImage('https://upload.wikimedia.org/wikipedia/commons/6/65/AK-47_type_II_noBG.png')
    ctx.save()
    ctx.translate(width / 2, height / 2)

    if (game.turn === 0) {
      // punta a destra
      ctx.scale(0.7, 0.7)
      ctx.drawImage(pistol, -100, -70, 400, 200)
    } else {
      // punta a sinistra
      ctx.scale(-0.7, 0.7)
      ctx.drawImage(pistol, -100, -70, 400, 200)
    }
    ctx.restore()

    // se colpisce
    if (shot) {
      const victimPos = positions[1 - game.turn]

      ctx.fillStyle = 'black'
      ctx.beginPath()
      ctx.arc(victimPos.x, victimPos.y - 40, 18, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'red'
      ctx.lineWidth = 5
      ctx.beginPath()
      ctx.moveTo(victimPos.x, victimPos.y - 22)
      ctx.lineTo(victimPos.x, victimPos.y + 120)
      ctx.stroke()

      game.active = false
    } else {
      game.turn = 1 - game.turn
    }

    const buffer = canvas.toBuffer('image/jpeg')
    return conn.sendMessage(
      m.chat,
      { image: buffer, caption: shot ? '💥 Colpito! Fine partita.' : '😮 Click a vuoto! Prossimo turno.' },
      { quoted: m }
    )
  }
}

handler.command = /^(roulette|risk)$/i
export default handler