import fetch from 'node-fetch';

const API_KEY = 'sd_LTouc0jUbnllZXJHmcQoD2Tv5fEsJuD9'; const BASE_URL = 'https://api.kicks.dev/v3/unified';

let handler = async (m, { conn, args, command }) => {
  if (!args.length) {
    return m.reply(
      command === 'scarpe'
        ? '❗ Usa: `.scarpe <nome scarpa>`\nEsempio: `.scarpe jordan 4`'
        : '❗ Usa: `.listino <id>` (id ottenuto da `.scarpe`)'
    );
  }

  if (command === 'scarpe') {
    const query = args.join(' ');
    try {
      const res = await fetch(`${BASE_URL}/product?query=${encodeURIComponent(query)}&limit=5`, {
        headers: { Authorization: API_KEY },
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      if (!data.products || data.products.length === 0)
        return m.reply('❌ Nessuna scarpa trovata.');

      let messaggio = '📦 *Risultati ricerca*:\n\n';
      data.products.forEach((p, i) => {
        messaggio += `${i + 1}. ${p.name}\n🆔 ID: ${p.id}\n\n`;
      });
      messaggio += '👉 Usa `.listino <id>` per dettagli.';

      await m.reply(messaggio);
    } catch (e) {
      console.error(e);
      m.reply('❌ Errore durante la richiesta all’API.');
    }
  }

  if (command === 'listino') {
    const id = args[0];
    try {
      const res = await fetch(`${BASE_URL}/product/${id}`, {
        headers: { Authorization: API_KEY },
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const p = data.product;

      if (!p) return m.reply('❌ Scarpa non trovata.');

      const messaggio = `👟 *${p.name}*\n🆔 SKU: ${p.sku || 'N/A'}\n💸 Prezzo Retail: ${p.retailPrice || 'N/A'} $\n📅 Release: ${p.releaseDate || 'N/A'}\n🔗 ${p.url || 'N/A'}`;

      if (p.image) {
        await conn.sendMessage(
          m.chat,
          { image: { url: p.image }, caption: messaggio },
          { quoted: m }
        );
      } else {
        await m.reply(messaggio);
      }
    } catch (e) {
      console.error(e);
      m.reply('❌ Errore durante la richiesta all’API.');
    }
  }
};

handler.command = /^(scarpe|listino)$/i;
handler.help = ['scarpe <nome>', 'listino <id>'];
handler.tags = ['shop'];

export default handler;