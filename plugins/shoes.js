let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`');

  const query = args.join(' ').toLowerCase();

  // 🔽 Dataset scarpe
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
    // 🔽 Puoi incollare qui tutte le altre scarpe
  ];

  const scarpa = scarpe.find(s =>
    query.includes(s.modello.toLowerCase()) || query.includes(s.nome.toLowerCase()) || query.includes(s.sku.toLowerCase())
  );

  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo medio: ${scarpa.prezzo} $\n🔗 ${scarpa.link}`;

  await conn.sendMessage(m.chat, {
    text: messaggio,
    footer: 'Clicca il bottone per vedere la foto 👟',
    buttons: [
      {
        buttonId: `.foto ${scarpa.sku}`,
        buttonText: { displayText: '📸 Immagine' },
        type: 1
      }
    ],
    headerType: 1
  }, { quoted: m });
};

// 🔁 Handler immagine collegato al bottone
handler.before = async (m, { args, conn }) => {
  if (m.text.startsWith('.foto')) {
    const sku = m.text.split(' ')[1]?.trim();
    if (!sku) return;

    const scarpe = [
      {
        sku: "DH6927-017",
        nome: "Air Jordan 4 Retro Thunder (2023)",
        immagine: "https://images.stockx.com/images/Air-Jordan-4-Retro-Thunder-2023-Product.jpg"
      },
      {
        sku: "DD1391-100",
        nome: "Nike Dunk Low Retro White Black Panda",
        immagine: "https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-Panda-Product.jpg"
      },
      {
        sku: "CP9654",
        nome: "adidas Yeezy Boost 350 V2 Zebra",
        immagine: "https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Zebra-Product.jpg"
      },
      // ⬆️ Aggiungi anche qui gli SKU delle altre scarpe
    ];

    const scarpa = scarpe.find(s => s.sku === sku);
    if (!scarpa) return;

    return await conn.sendMessage(m.chat, {
      image: { url: scarpa.immagine },
      caption: `📸 *${scarpa.nome}*`,
    }, { quoted: m });
  }
};

handler.command = /^listino$/i;
handler.tags = ['shop'];
handler.help = ['listino <modello>'];

export default handler;