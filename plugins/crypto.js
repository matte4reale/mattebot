import axios from 'axios'

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('⚠️ Inserisci una cripto!\n> Esempio: *.crypto btc*')

  let symbol = args[0].toLowerCase()

  try {
    let url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd,eur`
    let res = await axios.get(url)

    if (!res.data[symbol]) {
      return m.reply(`❌ Cripto non trovata: *${symbol}*`)
    }

    let usd = res.data[symbol].usd
    let eur = res.data[symbol].eur

    let text = `📊 *Prezzo ${symbol.toUpperCase()}*\n\n💵 USD: $${usd}\n💶 EUR: €${eur}`

    await conn.sendMessage(m.chat, { text }, { quoted: m })
  } catch (e) {
    console.error(e)
    m.reply('❌ Errore nel recupero dati.')
  }
}

handler.help = ['crypto <symbol>']
handler.tags = ['info', 'tools']
handler.command = /^crypto$/i

export default handler