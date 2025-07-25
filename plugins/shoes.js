let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`');

  const query = args.join(' ').toLowerCase();

  // 🔽 Dataset interno
  const scarpe = [
    {
      modello: "jordan 4 thunder",
      nome: "Air Jordan 4 Retro Thunder (2023)",
      sku: "DH6927-017",
      prezzo: "280",
      immagine: "https://images.stockx.com/images/Air-Jordan-4-Retro-Thunder-2023-Product.jpg",
      link: "https://stockx.com/air-jordan-4-retro-thunder-2023"
    },
    {
      modello: "nike dunk low panda",
      nome: "Nike Dunk Low Retro White Black Panda",
      sku: "DD1391-100",
      prezzo: "160",
      immagine: "https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-Panda-Product.jpg",
      link: "https://stockx.com/nike-dunk-low-retro-white-black-2021"
    },
    {
      modello: "yeezy 350 zebra",
      nome: "adidas Yeezy Boost 350 V2 Zebra",
      sku: "CP9654",
      prezzo: "290",
      immagine: "https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Zebra-Product.jpg",
      link: "https://stockx.com/adidas-yeezy-boost-350-v2-zebra"
    },
    {
      modello: "jordan 1 chicago",
      nome: "Air Jordan 1 Retro High OG Chicago Lost & Found",
      sku: "DZ5485-612",
      prezzo: "400",
      immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-Lost-and-Found-Product.jpg",
      link: "https://stockx.com/air-jordan-1-retro-high-og-chicago-lost-and-found"
    },
    {
      modello: "travis scott 1 low",
      nome: "Jordan 1 Retro Low OG SP Travis Scott Reverse Mocha",
      sku: "DM7866-162",
      prezzo: "680",
      immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-Low-OG-SP-Travis-Scott-Reverse-Mocha-Product.jpg",
      link: "https://stockx.com/jordan-1-retro-low-og-sp-travis-scott-reverse-mocha"
    }
  ];

  const scarpa = scarpe.find(s => query.includes(s.modello));
  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo medio: ${scarpa.prezzo} $\n🔗 ${scarpa.link}`;

  await conn.sendMessage(
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