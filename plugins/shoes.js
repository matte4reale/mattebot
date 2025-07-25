let handler = async (m, { args, conn }) => {
  if (!args.length) {
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`\nOppure `.listino immagine <SKU>` per vedere la foto.');
  }

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
      modello: "travis scott 1 low",
      nome: "Jordan 1 Retro Low OG SP Travis Scott Reverse Mocha",
      sku: "DM7866-162",
      prezzo: "680",
      immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-Low-OG-SP-Travis-Scott-Reverse-Mocha-Product.jpg",
      link: "https://stockx.com/jordan-1-retro-low-og-sp-travis-scott-reverse-mocha"
    },
    {
      modello: "jordan 1 bred patent",
      nome: "Air Jordan 1 Retro High OG Patent Bred",
      sku: "555088-063",
      prezzo: "320",
      immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Patent-Bred-Product.jpg",
      link: "https://stockx.com/air-jordan-1-retro-high-og-patent-bred"
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
      modello: "air max 1 atmos",
      nome: "Nike Air Max 1 Atmos Elephant (2017)",
      sku: "908366-001",
      prezzo: "400",
      immagine: "https://images.stockx.com/images/Nike-Air-Max-1-Atmos-Elephant-2017-Product.jpg",
      link: "https://stockx.com/nike-air-max-1-atmos-elephant-2017"
    },
    {
      modello: "yeezy slide bone",
      nome: "adidas Yeezy Slide Bone (2022)",
      sku: "FZ5897",
      prezzo: "150",
      immagine: "https://images.stockx.com/images/adidas-Yeezy-Slide-Bone-2022-Product.jpg",
      link: "https://stockx.com/adidas-yeezy-slide-bone-2022"
    },
    {
      modello: "jordan 4 red thunder",
      nome: "Air Jordan 4 Retro Red Thunder",
      sku: "CT8527-016",
      prezzo: "330",
      immagine: "https://images.stockx.com/images/Air-Jordan-4-Retro-Red-Thunder-Product.jpg",
      link: "https://stockx.com/air-jordan-4-retro-red-thunder"
    },
    {
      modello: "dunk low university blue",
      nome: "Nike Dunk Low UNC (2021)",
      sku: "DD1391-102",
      prezzo: "250",
      immagine: "https://images.stockx.com/images/Nike-Dunk-Low-UNC-2021-Product.jpg",
      link: "https://stockx.com/nike-dunk-low-unc-2021"
    },
    {
      modello: "yeezy foam runner onyx",
      nome: "adidas Yeezy Foam RNNR Onyx",
      sku: "HP8739",
      prezzo: "220",
      immagine: "https://images.stockx.com/images/adidas-Yeezy-Foam-RNNR-Onyx-Product.jpg",
      link: "https://stockx.com/adidas-yeezy-foam-rnnr-onyx"
    },
    {
      modello: "jordan 1 university blue",
      nome: "Air Jordan 1 Retro High University Blue",
      sku: "555088-134",
      prezzo: "390",
      immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-University-Blue-Product.jpg",
      link: "https://stockx.com/air-jordan-1-retro-high-university-blue"
    },
    {
      modello: "travis scott 1 high",
      nome: "Jordan 1 Retro High OG SP Travis Scott Mocha",
      sku: "CD4487-100",
      prezzo: "900",
      immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-SP-Travis-Scott-Mocha-Product.jpg",
      link: "https://stockx.com/air-jordan-1-retro-high-og-sp-travis-scott-mocha"
    },
    {
      modello: "nike sb dunk low ben & jerry's",
      nome: "Nike SB Dunk Low Ben & Jerry's Chunky Dunky",
      sku: "CU3244-100",
      prezzo: "1200",
      immagine: "https://images.stockx.com/images/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-Product.jpg",
      link: "https://stockx.com/nike-sb-dunk-low-ben-jerrys-chunky-dunky"
    },
    {
      modello: "jordan 3 white cement reimagined",
      nome: "Air Jordan 3 Retro White Cement Reimagined",
      sku: "DN3707-100",
      prezzo: "310",
      immagine: "https://images.stockx.com/images/Air-Jordan-3-Retro-White-Cement-Reimagined-Product.jpg",
      link: "https://stockx.com/air-jordan-3-retro-white-cement-reimagined"
    },
    {
      modello: "yeezy 350 v2 static",
      nome: "adidas Yeezy Boost 350 V2 Static",
      sku: "EF2905",
      prezzo: "370",
      immagine: "https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Static-Product.jpg",
      link: "https://stockx.com/adidas-yeezy-boost-350-v2-static"
    }
  ];

  // ➤ Caso immagine
  if (args[0].toLowerCase() === 'immagine' && args[1]) {
    const sku = args[1].toUpperCase();
    const scarpa = scarpe.find(s => s.sku === sku);
    if (!scarpa) return m.reply('❌ Immagine non trovata per questo SKU.');

    return conn.sendMessage(m.chat, {
      image: { url: scarpa.immagine },
      caption: `📷 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}`
    }, { quoted: m });
  }

  // ➤ Ricerca modello
  const query = args.join(' ').toLowerCase();
  const scarpa = scarpe.find(s => query.includes(s.modello));
  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  const messaggio = `👟 *${scarpa.nome}*\n` +
                    `🆔 *SKU:* ${scarpa.sku}\n` +
                    `💸 *Prezzo medio:* ${scarpa.prezzo} $\n` +
                    `🔗 *Link:* ${scarpa.link}`;

  await conn.sendMessage(m.chat, {
    text: messaggio,
    buttons: [
      {
        buttonId: `.listino immagine ${scarpa.sku}`,
        buttonText: { displayText: '📷 Vedi Immagine' },
        type: 1
      }
    ],
    footer: 'Premi per visualizzare la foto della scarpa',
    headerType: 1
  }, { quoted: m });
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>', 'listino immagine <sku>'];
handler.tags = ['shop'];

export default handler;