import fetch from 'node-fetch';

const FALLBACK_SCARPE = {
  "nike dunk low": {
    prezzo: "120 €",
    fonte: "Fallback locale",
    img: "https://images.pexels.com/photos/5702101/pexels-photo-5702101.jpeg"
  },
  "air jordan 1": {
    prezzo: "180 €",
    fonte: "Fallback locale",
    img: "https://images.pexels.com/photos/6311609/pexels-photo-6311609.jpeg"
  }
};

async function trySneakersAPI(query) {
  try {
    const res = await fetch(`https://api.sneakersapi.dev/search?query=${encodeURIComponent(query)}&limit=1`);
    const data = await res.json();
    if (data.results?.length > 0) {
      const shoe = data.results[0];
      return {
        nome: shoe.product_info.name,
        prezzo: shoe.market_data?.market_average_eur
          ? `${shoe.market_data.market_average_eur} €`
          : (shoe.retail_usd ? `${shoe.retail_usd} $ (retail)` : 'Prezzo non disponibile'),
        fonte: "SneakersAPI.dev",
        img: shoe.market_data?.market_image || shoe.image_url,
        url: shoe.market_data?.market_url
      };
    }
  } catch (e) {
    console.warn('❌ SneakersAPI fallita');
  }
  return null;
}

async function tryStockXRapidAPI(query) {
  const url = `https://stockx.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&limit=1`;
  const headers = {
    'X-RapidAPI-Key': 'INSERISCI_TUA_KEY',
    'X-RapidAPI-Host': 'stockx.p.rapidapi.com'
  };

  try {
    const res = await fetch(url, { headers });
    const json = await res.json();
    if (json?.hits?.length > 0) {
      const product = json.hits[0];
      return {
        nome: product.title || product.name,
        prezzo: product.retail_price ? `${product.retail_price} €` : 'Prezzo non disponibile',
        fonte: 'StockX via RapidAPI',
        img: product.image_url,
        url: `https://stockx.com/${product.url_key}`
      };
    }
  } catch (e) {
    console.warn('❌ StockX API fallita');
  }
  return null;
}

async function tryFallback(query) {
  const chiave = Object.keys(FALLBACK_SCARPE).find(k => query.includes(k));
  if (!chiave) return null;
  const s = FALLBACK_SCARPE[chiave];
  return {
    nome: chiave,
    prezzo: s.prezzo,
    fonte: s.fonte,
    img: s.img,
    url: ''
  };
}

let handler = async (m, { args, conn }) => {
  if (!args.length) return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike dunk low`');

  const query = args.join(' ').toLowerCase();
  let risultato = await trySneakersAPI(query);

  if (!risultato) risultato = await tryStockXRapidAPI(query);
  if (!risultato) risultato = await tryFallback(query);

  if (!risultato) return m.reply('❌ Nessun risultato trovato da nessuna fonte.');

  const messaggio = `👟 *${risultato.nome.toUpperCase()}*\n💸 Prezzo: *${risultato.prezzo}*\n🌐 Fonte: ${risultato.fonte}${risultato.url ? `\n🔗 [Link](${risultato.url})` : ''}`;

  return conn.sendMessage(
    m.chat,
    { image: { url: risultato.img }, caption: messaggio },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop', 'tools'];

export default handler;