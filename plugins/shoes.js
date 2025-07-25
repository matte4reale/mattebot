import fs from 'fs';

let scarpe = [];

try {
  const raw = fs.readFileSync('./plugins/scarpe_dataset_10000.json');
  scarpe = JSON.parse(raw);
  console.log('✅ Scarpe caricate. Esempi:', scarpe.slice(0, 5).map(s => s.nome));
} catch (e) {
  console.error('❌ Errore caricamento JSON:', e.message);
}

let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike air max`');

  const query = args.join(' ').toLowerCase();

  const scarpa = scarpe.find(s => {
    const nome = s.nome?.toLowerCase() || '';
    const modello = s.modello?.toLowerCase() || '';
    const sku = s.sku?.toLowerCase() || '';
    return nome.includes(query) || modello.includes(query) || sku.includes(query);
  });

  if (!scarpa) {
    return m.reply('🔍 Nessuna scarpa trovata nel listino.\nPuoi usare `.listinoall` per vedere i nomi disponibili.');
  }

  const messaggio = `👟 *${scarpa.nome}*
🆔 SKU: ${scarpa.sku || 'N/A'}
💸 Prezzo: ${scarpa.prezzo || 'N/A'} $
🔗 Link: ${scarpa.link || 'Nessun link'}`;

  return conn.sendMessage(
    m.chat,
    {
      image: { url: scarpa.immagine || 'https://via.placeholder.com/600x400?text=Nessuna+Immagine' },
      caption: messaggio
    },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop'];

export default handler;