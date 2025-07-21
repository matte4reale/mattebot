import { googleImage } from '@bochilteam/scraper'

const sourcesBySport = {
  calcio: [
    { name: 'Gazzetta', url: 'https://www.gazzetta.it/rss/Calcio.xml' },
    { name: 'Tuttosport', url: 'https://www.tuttosport.com/rss/calcio.xml' },
    { name: 'Corriere dello Sport', url: 'https://www.corrieredellosport.it/rss/calcio' }
  ],
  basket: [
    { name: 'Sky Basket', url: 'https://www.sportando.basketball/feed/' }
  ],
  tennis: [
    { name: 'Ubitennis', url: 'https://www.ubitennis.com/feed/' }
  ],
  formula1: [
    { name: 'FormulaPassion', url: 'https://formulapassion.it/feed' }
  ],
  mma: [
    { name: 'MMA Mania', url: 'https://www.mmamania.com/rss/current.xml' }
  ],
  ciclismo: [
    { name: 'CyclingNews', url: 'https://www.cyclingnews.com/rss/news/' }
  ]
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

async function getNews(sport = 'calcio') {
  let news = []
  const sources = sourcesBySport[sport] || []

  for (const src of sources) {
    try {
      const res = await fetch(src.url)
      const xml = await res.text()
      const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 3)

      for (const item of items) {
        const titleMatch = item[1].match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || item[1].match(/<title>(.*?)<\/title>/)
        const linkMatch = item[1].match(/<link>(.*?)<\/link>/)

        if (titleMatch && linkMatch) {
          const title = titleMatch[1]
          const link = linkMatch[1]

          let imageUrl = 'https://ibb.co/JwkPWhZX'
          try {
            const images = await googleImage(title)
            if (images?.length) {
              shuffle(images)
              imageUrl = images[0]
            }
          } catch (err) {
            console.warn(`Immagine non trovata per: ${title}`)
          }

          news.push({
            title,
            link,
            source: src.name,
            image: imageUrl
          })
        }
      }
    } catch (e) {
      console.error(`❌ Errore su ${src.name}:`, e.message)
    }
  }

  return news
}

const handler = async (m, { conn, args }) => {
  const user = m.sender
  const data = global.db.data.users[user] || {}
  const sport = args[0]?.toLowerCase() || data.preferredSport || 'calcio'

  const news = await getNews(sport)

  if (!news || news.length === 0) {
    return m.reply('📭 Nessuna notizia trovata.')
  }

  const cards = news.slice(0, 6).map(n => ({
    title: n.title,
    body: `🗞️ Fonte: ${n.source}`,
    footer: 'Tocca per leggere la notizia',
    image: {
      url: n.image
    },
    buttons: [
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: 'Leggi',
          url: n.link
        })
      }
    ]
  }))

  await conn.sendMessage(
    m.chat,
    {
      text: `📰 Ultime notizie - ${sport.toUpperCase()}`,
      footer: '🗞️ Powered by Origin-Bot',
      cards
    },
    { quoted: m }
  )

  // 🔘 Bottoni per cambiare sport
  await conn.sendMessage(
    m.chat,
    {
      text: '🎯 Vuoi leggere notizie di un altro sport?',
      footer: 'Scegli una categoria:',
      buttons: [
        { buttonId: '.news calcio', buttonText: { displayText: '⚽ Calcio' }, type: 1 },
        { buttonId: '.news basket', buttonText: { displayText: '🏀 Basket' }, type: 1 },
        { buttonId: '.news tennis', buttonText: { displayText: '🎾 Tennis' }, type: 1 },
        { buttonId: '.news formula1', buttonText: { displayText: '🏎 Formula 1' }, type: 1 },
        { buttonId: '.news mma', buttonText: { displayText: '🥋 MMA' }, type: 1 },
        { buttonId: '.news ciclismo', buttonText: { displayText: '🚴‍♂️ Ciclismo' }, type: 1 }
      ],
      headerType: 1
    },
    { quoted: m }
  )
}

handler.command = /^news$/i
handler.tags = ['news']
handler.help = ['news', 'news <sport>']
export default handler