import { createCanvas, loadImage } from 'canvas'

let games = {} // salviamo le partite per chat

let handler = async (m, { conn, command, args, participants }) => {
  const chat = m.chat
  games[chat] = games[chat] || { players: [], turn: 0, active: false }

  if (command === 'roulette') {
    if (!m.mentionedJid[0]) return m.reply('⚠️ Tagga un utente per sfidarlo.\nEsempio: .roulette @utente')

    const player1 = m.sender
    const player2 = m.mentionedJid[0]

    games[chat] = { players: [player1, player2], turn: 0, active: true }

    return m.reply(`🎲 Roulette russa iniziata tra @${player1.split('@')[0]} e @${player2.split('@')[0]}!\nUsa .risk per sparare.`, null, { mentions: [player1, player2] })
  }

  if (command === 'risk') {
    let game = games[chat]
    if (!game || !game.active) return m.reply('❌ Nessuna partita attiva. Usa .roulette @utente per iniziare.')
    let shooter = game.players[game.turn]
    if (m.sender !== shooter) return m.reply('⏳ Non è il tuo turno!')

    let target = game.players[1 - game.turn]

    // 1 probabilità su 6
    let shot = Math.floor(Math.random() * 6) === 0

    const width = 1000, height = 600
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // sfondo
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, width, height)

    // titolo
    ctx.fillStyle = '#facc15'
    ctx.font = 'bold 50px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('ROULETTE RUSSA', width / 2, 70)

    // avatar
    const radius = 120
    const positions = [
      { x: 220, y: 300, id: game.players[0] },
      { x: 780, y: 300, id: game.players[1] }
    ]

    for (let pos of positions) {
      try {
        let pp = await conn.profilePictureUrl(pos.id, 'image').catch(() => null)
        let img = pp ? await loadImage(pp) : null
        ctx.save()
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        if (img) ctx.drawImage(img, pos.x - radius, pos.y - radius, radius * 2, radius * 2)
        ctx.restore()

        ctx.lineWidth = 8
        ctx.strokeStyle = '#facc15'
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        ctx.stroke()

        // nome
        let name = await conn.getName(pos.id)
        name = name.replace(/[^\x00-\x7F]/g, '') // normalizza
        ctx.fillStyle = '#fff'
        ctx.font = '24px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(name, pos.x, pos.y + radius + 40)
      } catch {}
    }

    // pistola
    const pistol = await loadImage('https://upload.wikimedia.org/wikipedia/commons/6/65/AK-47_type_II_noBG.png')
    ctx.save()
    if (game.turn === 0) {
      // punta a destra
      ctx.translate(width / 2, height / 2)
      ctx.rotate(0.1)
      ctx.drawImage(pistol, -150, -100, 300, 200)
    } else {
      // punta a sinistra
      ctx.translate(width / 2, height / 2)
      ctx.rotate(Math.PI - 0.1)
      ctx.drawImage(pistol, -150, -100, 300, 200)
    }
    ctx.restore()

    if (shot) {
      // colpito
      const victimPos = positions[1 - game.turn]

      // buco in fronte
      ctx.fillStyle = 'black'
      ctx.beginPath()
      ctx.arc(victimPos.x, victimPos.y - 40, 18, 0, Math.PI * 2)
      ctx.fill()

      // sangue
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 5
      ctx.beginPath()
      ctx.moveTo(victimPos.x, victimPos.y - 22)
      ctx.lineTo(victimPos.x, victimPos.y + 120)
      ctx.stroke()

      game.active = false
    } else {
      // cambia turno
      game.turn = 1 - game.turn
    }

    const buffer = canvas.toBuffer('image/jpeg')
    return conn.sendMessage(m.chat, { image: buffer, caption: shot ? '💥 Colpito! Fine partita.' : '😮 Click a vuoto! Prossimo turno.' }, { quoted: m })
  }
}

handler.command = /^(roulette|risk)$/i
export default handler