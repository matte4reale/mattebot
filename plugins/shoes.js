const scarpe = [
  {
    name: "Nike Air Max",
    brand: "Nike",
    sizes: {
      36: 110,
      37: 115,
      38: 120,
      39: 125,
      40: 130,
      41: 135,
      42: 140,
      43: 145,
      44: 150
    }
  },
  {
    name: "Adidas Ultraboost",
    brand: "Adidas",
    sizes: {
      36: 130,
      37: 135,
      38: 140,
      39: 145,
      40: 150,
      41: 155,
      42: 160,
      43: 165,
      44: 170
    }
  }
];

// Funzione per ottenere immagine da Unsplash in base al brand
function getImageUrl(brand) {
  // URL per immagine random di sneakers col brand come parola chiave
  return `https://source.unsplash.com/600x400/?${encodeURIComponent(brand)},sneakers`;
}

let handler = async (m, { args, conn }) => {
  if (!args.length) return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike air max`');

  const query = args.join(' ').toLowerCase();

  const match = scarpe.find(
    s => s.name.toLowerCase().includes(query) || s.brand.toLowerCase().includes(query)
  );

  if (!match) return m.reply('🔍 Nessuna scarpa trovata.');

  const prezzi = Object.entries(match.sizes)
    .map(([taglia, prezzo]) => `- ${taglia}: ${prezzo} €`)
    .join('\n');

  const imageUrl = getImageUrl(match.brand);

  const mess = `👟 *${match.name.toUpperCase()}*\n💸 Prezzi per taglie:\n${prezzi}`;

  return conn.sendMessage(
    m.chat,
    { image: { url: imageUrl }, caption: mess },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop', 'tools'];

export default handler;