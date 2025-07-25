import fetch from 'node-fetch';

let handler = async (m, { args, conn }) => {
  if (!args.length) {
    return m.reply('❗ Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4`');
  }

  const query = args.join(' ');
  const apiUrl = `https://api.solesavy.com/api/sneakers/releases?limit=100`;

  try {
    const res = await fetch(apiUrl);
    const json = await res.json();

    const risultati = json?.releases?.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );

    if (!risultati || risultati.length === 0) {
      return m.reply('❌ Nessuna scarpa trovata.');
    }

    const scarpa = risultati[0];
    const messaggio = `👟 *${scarpa.name}*\n🆔 SKU: ${scarpa.sku || 'N/A'}\n📆 Release: ${scarpa.release_date || 'N/A'}\n💸 Prezzo retail: ${scarpa.retail_price || 'N/A'} $\n🌐 Brand: ${scarpa.brand || 'N/A'}\n\n🔗 Fonte: [SoleSavy.com](https://www.solesavy.com/)`;

    return conn.sendMessage(
      m.chat,
      {
        image: { url: scarpa.main_image_url },
        caption: messaggio
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