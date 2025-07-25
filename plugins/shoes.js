let handler = async (m, { args, conn, command }) => {
  if (!args.length)
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`');

  const query = args.join(' ').toLowerCase();

  const scarpa = scarpe.find(s => {
    const modello = s.modello?.toLowerCase() || '';
    const nome = s.nome?.toLowerCase() || '';
    const sku = s.sku?.toLowerCase() || '';
    return modello.includes(query) || nome.includes(query) || sku.includes(query);
  });

  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  if (command === 'img') {
    if (!scarpa.immagine || !scarpa.immagine.startsWith('http')) {
      return m.reply('⚠️ Immagine non disponibile per questo modello.');
    }

    return conn.sendMessage(m.chat, {
      image: { url: scarpa.immagine },
      caption: `📷 Immagine di *${scarpa.nome}*`
    }, { quoted: m });
  }

  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku || 'N/A'}\n💸 Prezzo medio: ${scarpa.prezzo || 'N/A'} $\n🔗 ${scarpa.link || 'Nessun link disponibile'}`;

  return conn.sendMessage(m.chat, {
    text: messaggio,
    footer: 'Clicca per vedere l’immagine 👟',
    buttons: [
      {
        buttonId: `.img ${scarpa.sku || scarpa.nome}`,
        buttonText: { displayText: '📷 Immagine' },
        type: 1
      }
    ],
    headerType: 1
  }, { quoted: m });
};

handler.command = /^(listino|img)$/i;
handler.help = ['listino <modello>', 'img <modello o sku>'];
handler.tags = ['shop'];

export default handler;

// 🔽 Dataset interno (ES: 10 scarpe demo, puoi incollarne anche 1000+)
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
    modello: "yeezy dunk low",
    nome: "Yeezy Dunk Low",
    sku: "YEDULO0099",
    prezzo: "199",
    immagine: "https://images.stockx.com/images/sneaker-99.jpg",
    link: "https://stockx.com/yeezy-dunk-low-99"
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
    modello: "nike club c retro",
    nome: "Nike Club C Retro",
    sku: "NICLRE0051",
    prezzo: "151",
    immagine: "https://images.stockx.com/images/sneaker-51.jpg",
    link: "https://stockx.com/nike-club-c-retro-51"
  },
  {
    modello: "new balance gel-lyte slide",
    nome: "New Balance Gel-Lyte Slide",
    sku: "NEGESL0059",
    prezzo: "159",
    immagine: "https://images.stockx.com/images/sneaker-59.jpg",
    link: "https://stockx.com/new-balance-gel-lyte-slide-59"
  },
  {
    modello: "asics superstar zoom",
    nome: "Asics Superstar Zoom",
    sku: "ASSUZO0060",
    prezzo: "160",
    immagine: "https://images.stockx.com/images/sneaker-60.jpg",
    link: "https://stockx.com/asics-superstar-zoom-60"
  },
  {
    modello: "converse skate mid",
    nome: "Converse Skate Mid",
    sku: "COSKMI0091",
    prezzo: "191",
    immagine: "https://images.stockx.com/images/sneaker-91.jpg",
    link: "https://stockx.com/converse-skate-mid-91"
  }
];