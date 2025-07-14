import fetch from 'node-fetch'

let players = []

async function loadPlayers() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/prashantghimire/sofifa-web-scraper/main/output/player-data-full.csv')
    const text = await res.text()
    players = text.split('\n').slice(1)
      .map(line => line.split(','))
      .filter(cols => cols[2] && parseInt(cols[2]) >= 80) // colonna rating ≥ 80
      .map(cols => ({
        name: cols[1],
        rating: parseInt(cols[2]),
        position: cols[3],
        nation: cols[4],
        club: cols[5],
        img: `https://cdn.sofifa.org/players/${parseInt(cols[0]) % 1000}/${cols[0]}.png`
      }))
    console.log(`Loaded ${players.length} players from SOFIFA dataset`)
  } catch (e) {
    console.error('Errore caricamento dataset:', e)
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function generatePack() {
  if (players.length === 0) return null
  const selection = shuffle(players).slice(0, 3)
  const main = selection[0]
  let text = `🎉 Hai spacchettato un *pack Oro Raro*! \n`
  text += `🔹 ${main.position} – ${main.nation} – ${main.club}\n`
  text += `🟥 ${main.name} – ${main.rating}\n`
  text += `📦 Altri: ` + selection.slice(1).map(p => `${p.name} (${p.rating})`).join(', ')
  return { text, pack: selection }
}

let handler = async (m, { conn }) => {
  if (players.length === 0) await loadPlayers()

  const data = generatePack()
  if (!data) return m.reply('❌ Errore caricamento giocatori, riprova.')

  const { text, pack } = data
  await conn.sendMessage(m.chat, {
    image: { url: pack[0].img },
    caption: text,
    mentions: [m.sender]
  }, { quoted: m })

  for (let i = 1; i < pack.length; i++) {
    await conn.sendMessage(m.chat, {
      image: { url: pack[i].img },
      caption: `Carta #${i + 1}: ${pack[i].name} – ${pack[i].rating}`
    }, { quoted: m })
  }
}

handler.command = /^futpack$/i
export default handler
