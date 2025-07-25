import scarpe from './plugins/scarpe_dataset_10000.json' assert { type: 'json' };

let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike air max`');

  const query = args.join(' ').toLowerCase();

  const scarpa = scarpe.find(
    s =>
      s.nome.toLowerCase().includes(query) ||
      s.modello.toLowerCase().includes(query) ||
      s.sku.toLowerCase().includes(query)
  );

  if (!scarpa) return m.reply('🔍 Nessuna scarpa trovata nel listino.');

  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo: ${scarpa.prezzo} $\n🔗 Link: ${scarpa.link}`;

  return conn.sendMessage(
    m.chat,
    {
      image: { url: scarpa.immagine },
      caption: messaggio
    },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop'];

export default handler;