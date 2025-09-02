import { createCanvas, loadImage } from 'canvas'

const GUN_URL = 'https://upload.wikimedia.org/wikipedia/commons/6/65/AK-47_type_II_noBG.png'

global.roulette = global.roulette || {}

let handler = async (m, { conn, args, command }) => {
  const chat = m.chat

  if (command === 'roulette') {
    if (!global.roulette[chat]) {
      global.roulette[chat] = { players: [], turn: 0, alive: {} }
    }
    let game = global.roulette[chat]

    if (args[0] === 'join') {
      if (game.players.length >= 2) return m.reply('❌ Giocano solo 2 persone.')
      if (game.players.includes(m.sender)) return m.reply('⚠️ Sei già dentro!')
      game.players.push(m.sender)
      game.alive[m.sender] = true
      return m.reply(`✅ Sei entrato! (${game.players.length}/2)`)
    }

    if (args[0] === 'start') {
      if (game.players.length < 2) return m.reply('❌ Servono 2 giocatori.')
      game.turn = Math.floor(Math.random() * 2)
      await sendBoard(conn, chat, game)
      return m.reply(`🎲 Inizia la Roulette Russa!\n👉 Tocca a @${game.players[game.turn].split('@')[0]}`, { mentions: [game.players[game.turn]] })
    }

    if (args[0] === 'spara') {
      if (!game.players.length) return m.reply('❌ Nessuna partita attiva.')
      let current = game.players[game.turn]
      if (m.sender !== current) return m.reply('❌ Non è il tuo turno!')

      let shot = Math.random() < 0.3
      if (shot) {
        game.alive[current] = false
        await sendBoard(conn, chat, game, current, true)
        await m.reply(`💥 BOOM! @${current.split('@')[0]} è morto!`, { mentions: [current] })
        delete global.roulette[chat]
      } else {
        game.turn = 1 - game.turn
        await sendBoard(conn, chat, game)
        await m.reply(`😮 Click! Sei salvo!\n👉 Tocca a @${game.players[game.turn].split('@')[0]}`, { mentions: [game.players[game.turn]] })
      }
    }

    if (args[0] === 'passa') {
      let current = game.players[game.turn]
      if (m.sender !== current) return m.reply('❌ Non è il tuo turno!')
      game.turn = 1 - game.turn
      await sendBoard(conn, chat, game)
      await m.reply(`🔄 Hai passato!\n👉 Tocca a @${game.players[game.turn].split('@')[0]}`, { mentions: [game.players[game.turn]] })
    }
  }
}

handler.command = /^roulette$/i
export default handler

async function sendBoard(conn, chat, game, dead = null, shot = false) {
  const width = 1200, height = 600
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = "#111"
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = "#facc15"
  ctx.font = "bold 60px Arial"
  ctx.textAlign = "center"
  ctx.fillText("ROULETTE RUSSA", width / 2, 80)

  const positions = [
    { x: 250, y: 350 },
    { x: 950, y: 350 }
  ]

  for (let i = 0; i < game.players.length; i++) {
    const id = game.players[i]
    try {
      let pp = await conn.profilePictureUrl(id, 'image').catch(() => null)
      if (pp) {
        let img = await loadImage(pp)
        ctx.save()
        ctx.beginPath()
        ctx.arc(positions[i].x, positions[i].y, 120, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(img, positions[i].x - 120, positions[i].y - 120, 240, 240)
        ctx.restore()

        ctx.lineWidth = 8
        ctx.strokeStyle = dead === id ? "red" : "white"
        ctx.beginPath()
        ctx.arc(positions[i].x, positions[i].y, 120, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = "#fff"
        ctx.font = "28px Arial"
        ctx.textAlign = "center"
        ctx.fillText(id.split('@')[0], positions[i].x, positions[i].y + 170)

        if (shot && dead === id) {
          ctx.fillStyle = "black"
          ctx.beginPath()
          ctx.arc(positions[i].x, positions[i].y - 30, 18, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = "rgba(255,0,0,0.7)"
          ctx.beginPath()
          ctx.arc(positions[i].x, positions[i].y - 25, 35, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    } catch {}
  }

  try {
    let gun = await loadImage(GUN_URL)
    ctx.save()
    if (game.turn === 0) {
      ctx.translate(positions[0].x + 200, positions[0].y)
      ctx.scale(-1, 1)
      ctx.drawImage(gun, -200, -80, 250, 160)
    } else {
      ctx.drawImage(gun, positions[1].x - 250, positions[1].y - 80, 250, 160)
    }
    ctx.restore()
  } catch {}

  const buffer = canvas.toBuffer('image/jpeg')
  await conn.sendMessage(chat, { image: buffer, caption: "🎲 Roulette Russa" })
}