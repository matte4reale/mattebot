import fs from 'fs';

let scarpe = [];

try {
  const raw = fs.readFileSync('./plugins/scarpe_stockx_dataset.json');
  scarpe = JSON.parse(raw);
  console.log(`✅ Caricate ${scarpe.length} scarpe dal file.`);
} catch (e) {
  console.error('❌ Errore caricamento scarpe:', e.message);
}

let handler = async (m, { args, conn }) => {
  if (!args.length) return m.reply('❗ Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`');

  const query = args.join(' ').toLowerCase();

  const scarpa = scarpe.find(s => query.includes(s.modello.toLowerCase()));

  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo medio: ${scarpa.prezzo} $\n🔗 ${scarpa.link}`;

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