import fetch from 'node-fetch';

let handler = async (m, { args }) => {
  const query = args.join(' ');
  if (!query) return m.reply('❗ Scrivi il nome di un modello di scarpa, es: `.listino nike dunk low`');

  try {
    const apiUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query + ' scarpa')}&format=json&no_redirect=1&no_html=1&skip_disambig=1`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    const titolo = data.Heading || query;
    const desc = data.Abstract || 'Nessuna descrizione disponibile.';
    const img = data.Image || null;
    const fonte = data.AbstractURL || 'https://duckduckgo.com';

    const testo = `👟 *${titolo}*\n\n📄 ${desc}\n\n🔗 Fonte: ${fonte}`;

    if (img && img.startsWith('http')) {
      await conn.sendMessage(m.chat, {
        image: { url: img },
        caption: testo
      }, { quoted: m });
    } else {
      await m.reply(testo);
    }

  } catch (e) {
    console.error(e);
    m.reply('⚠️ Errore nel recupero dei dati. Riprova più tardi.');
  }
};

handler.command = ['listino'];
handler.help = ['listino <modello>'];
handler.tags = ['tools'];

export default handler;