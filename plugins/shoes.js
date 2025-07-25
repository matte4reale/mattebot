import scarpe from './plugins/scarpe_stockx_realistiche_10000.json' assert { type: 'json' };

const normalize = str => (str || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

let handler = async (m, { args, conn }) => {
  if (!scarpe.length) return m.reply('⚠️ Errore caricamento listino scarpe.');

  if (!args.length) return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino jordan boost`');

  const queryWords = normalize(args.join(' ')).split(' ');

  const scarpa = scarpe.find(s => {
    const nome = normalize(s.nome);
    const modello = normalize(s.modello);
    const sku = (s.sku || '').toLowerCase();
    return queryWords.every(q =>
      nome.includes(q) || modello.includes(q) || sku.includes(q)
    );
  });

  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo: ${scarpa.prezzo} $\n🔗 ${scarpa.link}`;

  if (scarpa.immagine?.startsWith('http')) {
    return conn.sendMessage(
      m.chat,
      {
        image: { url: scarpa.immagine },
        caption: messaggio
      },
      { quoted: m }
    );
  } else {
    return m.reply(messaggio);
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop'];

export default handler;