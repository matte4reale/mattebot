let handler = async (m, { args, conn }) => {
  const fs = require('fs');
  const path = './plugins/scarpe_1000.json';

  if (!args.length) {
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike air max`');
  }
  let data;
  try {
    data = JSON.parse(fs.readFileSync(path));
  } catch (e) {
    return m.reply('⚠️ Errore nel caricamento del listino.');
  }

  const query = args.join(' ').toLowerCase();
  const match = data.find(item => item.name.toLowerCase().includes(query));

  if (!match) return m.reply('🔍 Nessuna scarpa trovata.');

  const prezzi = Object.entries(match.sizes)
    .map(([taglia, prezzo]) => `- ${taglia}: ${prezzo} €`)
    .join('\n');

  const messaggio = `👟 *${match.name.toUpperCase()}*\n💸 *Prezzi per taglie:*\n${prezzi}`;

  return conn.sendMessage(
    m.chat,
    { image: { url: match.image }, caption: messaggio },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop', 'tools'];

export default handler;