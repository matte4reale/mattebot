import { createCanvas, loadImage } from 'canvas'

const GUN_URL = 'https://upload.wikimedia.org/wikipedia/commons/6/65/AK-47_type_II_noBG.png'

global.roulette = global.roulette || {}

let handler = async (m, { conn, args, command }) => {
  const chat = m.chat

  if (command === 'roulette') {
    if (!global.roulette[chat]) {
      global.roulette[chat] = {
        players: [],
        turn: 0,
        alive: {}
      }
    }

    let game = global.roulette[chat]

    if (args[0] === 'join') {
      if (game.players.length >= 2) return m.reply('❌ Sono già entrati 2 giocatori.')
      if (game.players.includes(m.sender)) return m.reply('⚠️ Sei già in gioco!')
      game.players.push(m.sender)
      game.alive[m.sender] = true
      return m.reply(`✅ Sei entrato! (${game.players.length}/2)`)
    }

    if (args[0] === 'start') {
      if (game.players.length < 2) return m.reply('❌ Servono 2 giocatori per iniziare.')
      game.turn = Math.floor(Math.random() * 2)

      await sendBoard(conn, chat, game)

      return conn.sendMessage(chat, {
        text: `🎲 Inizia la Roulette Russa!\n👉 Tocca a @${game.players[game.turn].split('@')[0]}`,
        footer: "Roulette Russa",
        buttons: [
          { buttonId: 'risk', buttonText: { displayText: '🎯 Spara' }, type: 1 },
          { buttonId: 'pass', buttonText: { displayText: '⏭️ Passa' }, type: 1 }
        ],
        headerType: 1,
        mentions: [game.players[game.turn]]
      })
    }
  }

  if (m.message?.buttonsResponseMessage) {
    const id = m.message.buttonsResponseMessage.selectedButtonId
    const game = global.roulette[chat]
    if (!game) return

    const player = game.players[game.turn]
    if (m.sender !== player) return m.reply('❌ Non è il tuo turno!')

    if (id === 'risk') {
      let shot = Math.random() < 0.3
      if (shot) {
        game.alive[player] = false
        await sendBoard(conn, chat, game, player, true)
        conn.sendMessage(chat, { text: `💥 BOOM! @${player.split('@')[0]} è stato eliminato!`, mentions: [player] })
        delete global.roulette[chat]
      } else {
        game.turn = 1 - game.turn
        await sendBoard(conn, chat, game)
        return conn.sendMessage(chat, {
          text: `😮 Click! Sei salvo!\n👉 Tocca a @${game.players[game.turn].split('@')[0]}`,
          footer: "Roulette Russa",
          buttons: [
            { buttonId: 'risk', buttonText: { displayText: '🎯 Spara' }, type: 1 },
            { buttonId: 'pass', buttonText: { displayText: '⏭️ Passa' }, type: 1 }
          ],
          headerType: 1,
          mentions: [game.players[game.turn]]
        })
      }
    }

    if (id === 'pass') {
      game.turn = 1 - game.turn
      await sendBoard(conn, chat, game)
      return conn.sendMessage(chat, {
        text: `🔄 Passato! Ora tocca a @${game.players[game.turn].split('@')[0]}`,
        footer: "Roulette Russa",
        buttons: [
          { buttonId: 'risk', buttonText: { displayText: '🎯 Spara' }, type: 1 },
          { buttonId: 'pass', buttonText: { displayText: '⏭️ Passa' }, type: 1 }
        ],
        headerType: 1,
        mentions: [game.players[game.turn]]
      })
    }
  }
}

handler.command = /^roulette$/i
export default handler

async function sendBoard(conn, chat, game, dead = null, shot = false) {
  const width = 1200
  const height = 600
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = "#111"
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = "#facc15"
  ctx.font = "bold 60px Arial"
  ctx.textAlign = "center"
  ctx.fillText("ROULETTE RUSSA", width / 2, 80)

  const positions = [
    { x: 250, y: 300 },
    { x: 950, y: 300 }
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

        ctx.lineWidth = 10
        ctx.strokeStyle = dead === id ? "red" : "yellow"
        ctx.beginPath()
        ctx.arc(positions[i].x, positions[i].y, 120, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = "#fff"
        ctx.font = "30px Arial"
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

          for (let b = 0; b < 8; b++) {
            ctx.beginPath()
            ctx.moveTo(positions[i].x, positions[i].y - 25)
            let angle = (Math.PI * 2 * b) / 8
            ctx.lineTo(positions[i].x + Math.cos(angle) * 70, positions[i].y - 25 + Math.sin(angle) * 70)
            ctx.strokeStyle = "rgba(255,0,0,0.6)"
            ctx.lineWidth = 5
            ctx.stroke()
          }
        }
      }
    } catch {}
  }

  try {
    let gun = await loadImage(GUN_URL)
    ctx.save()
    if (game.turn === 0) {
      ctx.translate(positions[0].x + 250, positions[0].y)
      ctx.scale(-1, 1)
      ctx.drawImage(gun, -200, -100, 300, 200)
    } else {
      ctx.drawImage(gun, positions[1].x - 300, positions[1].y - 100, 300, 200)
    }
    ctx.restore()
  } catch {}

  const buffer = canvas.toBuffer('image/jpeg')
  await conn.sendMessage(chat, { image: buffer, caption: "🎲 Roulette Russa" })
}