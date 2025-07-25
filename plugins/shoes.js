import fetch from 'node-fetch';

let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome della scarpa. Esempio: `.listino jordan 4`');

  const query = args.join(' ');
  const apiKey = 'sd_XjZvL6MhwRJrgpLLrGCHidCSU90cFrHu'; // ⬅️ Inserisci qui la tua chiave di KicksDB

  try {
    const res = await fetch(`https://api.kicks.dev/v1/sneakers?query=${encodeURIComponent(query)}&limit=1`, {
      headers: {
        'Authorization': apiKey
      }
    });

    const data = await res.json();
    const s = data?.results?.[0];

    if (!s) return m.reply('❌ Nessuna scarpa trovata nel listino.');

    const caption = `👟 *${s.name}*\n🆔 SKU: ${s.style_id || 'N/A'}\n💸 Prezzo Retail: $${s.retail_price || 'N/A'}\n📅 Data uscita: ${s.release_date || 'N/A'}\n🔗 StockX: ${s.resell_links?.stockx || 'Nessun link'}`;

    return conn.sendMessage(
      m.chat,
      {
        image: { url: s.thumbnail },
        caption
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    return m.reply('❌ Errore durante la richiesta all’API.');
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop'];

export default handler;