import fetch from 'node-fetch';
import cheerio from 'cheerio';

let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('Scrivi il nome di una scarpa.\nEsempio: .listino nike dunk low');

  const query = args.join(' ');
  const url = `https://stockx.com/search?s=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    // Prendi il primo prodotto della lista
    const product = $('[data-testid="product-tile"] a').first();
    const productLink = 'https://stockx.com' + product.attr('href');
    const productTitle = product.find('[data-testid="product-tile-title"]').text().trim();
    const imageUrl = product.find('img').attr('src');

    if (!productTitle || !imageUrl) return m.reply('❌ Nessun risultato trovato su StockX.');

    const message = `👟 *${productTitle}*\n🔗 ${productLink}\n📸 Immagine da StockX`;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: imageUrl },
        caption: message
      },
      { quoted: m }
    );
  } catch (err) {
    console.error(err);
    m.reply('⚠️ Errore durante il caricamento da StockX.');
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop'];

export default handler;