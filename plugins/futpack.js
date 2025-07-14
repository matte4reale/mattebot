import fetch from 'node-fetch'

let players = []

// Carica dataset giocatori da URL (esempio di un dataset ridotto)
async function loadPlayers() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/stefan-it/sofifa-json/main/sofifa-players.json')
    const data = await res.json()
    // Prendi i giocatori con rating > 80 per fare un pack più interessante
    players = data.filter(p => p.overall >= 80).map(p => ({
      name: p.name,
      rating: p.overall,
      position: p.position,
      nation: p.nationality,
      club: p.club,
      img: `https://cdn.sofifa.org/players/${p.player_id % 1000}/${p.player_id}.png`
    }))
    console.log(`Caricati ${players.length} giocatori`)
  } catch (err) {
    console.error('Errore caricamento giocatori:', err)
  }
}

// Mescola array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Genera pack casuale con 3 giocatori
function generatePack() {
  if (players.length === 0) return null
  const shuffled = shuffle([...players])
  const pack = shuffled.slice(0, 3)
  const main = pack[0]

  let text = `🎉 Hai spacchettato un pack Oro Raro!\n`
  text += `🔹 ${main.position} – ${main.nation} – ${main.club}\n`
  text += `🟥 ${main.name} – ${main.rating}\n`
  text += '📦 Altri trovati: ' + pack.slice(1).map(p => `${p.name} ${p.rating}`).join(', ') + '\n'

  return { text, pack }
}

let handler = async (m, { conn }) => {
  if (players.length === 0) await loadPlayers()

  const packData = generatePack()
  if (!packData) return m.reply('❌ Errore nel caricamento dei giocatori.')

  const { text, pack } = packData

  // Manda la carta principale con immagine
  await conn.sendMessage(m.chat, {
    image: { url: pack[0].img },
    caption: text,
    mentions: [m.sender]
  }, { quoted: m })

  // Manda le altre immagini senza caption pesanti
  for (let i = 1; i < pack.length; i++) {
    await conn.sendMessage(m.chat, {
      image: { url: pack[i].img },
      caption: `Carta #${i + 1}: ${pack[i].name} – ${pack[i].rating}`
    }, { quoted: m })
  }
}

handler.command = /^futpack$/i
export default handler
