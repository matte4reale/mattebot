// JSON interno al plugin
const scarpe = [
  {
    name: "Nike Blaze Fury",
    brand: "Nike",
    image: "https://source.unsplash.com/featured/?Nike,shoes",
    sizes: {
      36: 112.55,
      37: 118.20,
      38: 125.45,
      39: 119.99,
      40: 124.10,
      41: 130.00,
      42: 129.50,
      43: 132.75,
      44: 135.00
    }
  },
  {
    name: "Adidas Zoom Quest",
    brand: "Adidas",
    image: "https://source.unsplash.com/featured/?Adidas,shoes",
    sizes: {
      36: 102.99,
      37: 108.40,
      38: 112.85,
      39: 115.30,
      40: 119.00,
      41: 121.50,
      42: 125.00,
      43: 126.00,
      44: 130.00
    }
  }
  // Puoi aggiungere qui tutte le altre scarpe
];

let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike air max`');

  const query = args.join(' ').toLowerCase();
  const match = scarpe.find(s => s.name.toLowerCase().includes(query));

  if (!match) return m.reply('🔍 Nessuna scarpa trovata.');

  const prezzi = Object.entries(match.sizes)
    .map(([taglia, prezzo]) => `- ${taglia}: ${prezzo} €`)
    .join('\n');

  const mess = `👟 *${match.name.toUpperCase()}*\n💸 Prezzi per taglie:\n${prezzi}`;

  return conn.sendMessage(
    m.chat,
    { image: { url: match.image }, caption: mess },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop', 'tools'];

export default handler;