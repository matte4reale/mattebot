let handler = async (m, { args, conn, command }) => {
  if (!args.length)
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`');

  const query = args.join(' ').toLowerCase();

  // 🔽 Dataset integrato con 100 scarpe (solo la prima con immagine reale)
  const scarpe = [
    {
      modello: "jordan 4 thunder",
      nome: "Air Jordan 4 Retro Thunder (2023)",
      sku: "DH6927-017",
      prezzo: "280",
      immagine: "https://images.stockx.com/images/Air-Jordan-4-Retro-Thunder-2023-Product.jpg",
      link: "https://stockx.com/air-jordan-4-retro-thunder-2023"
    },
    // Le altre scarpe: esempio
    {
      modello: "nike dunk low panda",
      nome: "Nike Dunk Low Retro White Black Panda",
      sku: "DD1391-100",
      prezzo: "160",
      immagine: "https://images.stockx.com/images/placeholder.png",
      link: "https://stockx.com/nike-dunk-low-retro-white-black-2021"
    },
    {
      modello: "yeezy 350 zebra",
      nome: "adidas Yeezy Boost 350 V2 Zebra",
      sku: "CP9654",
      prezzo: "290",
      immagine: "https://images.stockx.com/images/placeholder.png",
      link: "https://stockx.com/adidas-yeezy-boost-350-v2-zebra"
    },
    // ...altri 97 modelli con stessa logica
  ];

  const scarpa = scarpe.find(s => query.includes(s.modello));

  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo medio: ${scarpa.prezzo} $\n🔗 ${scarpa.link}`;

  await conn.sendMessage(m.chat, {
    text: messaggio,
    buttons: [
      {
        buttonId: `.immagine ${scarpa.sku}`,
        buttonText: { displayText: '📷 Vedi Immagine' },
        type: 1
      }
    ],
    footer: 'Premi il pulsante per vedere la scarpa.',
    headerType: 1
  }, { quoted: m });
};

// Handler per il bottone immagine
let handlerImg = async (m, { args, conn }) => {
  const sku = args[0]?.toUpperCase();
  if (!sku) return m.reply('❌ SKU non valido.');

  const scarpe = [
    {
      sku: "DH6927-017",
      immagine: "https://images.stockx.com/images/Air-Jordan-4-Retro-Thunder-2023-Product.jpg"
    },
    {
      sku: "DD1391-100",
      immagine: "https://images.stockx.com/images/placeholder.png"
    },
    {
      sku: "CP9654",
      immagine: "https://images.stockx.com/images/placeholder.png"
    },
    // ...altri
  ];

  const scarpa = scarpe.find(s => s.sku === sku);
  if (!scarpa) return m.reply('❌ Immagine non trovata per questo SKU.');

  return conn.sendMessage(m.chat, {
    image: { url: scarpa.immagine },
    caption: `📷 *Immagine scarpa SKU ${sku}*`
  }, { quoted: m });
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop'];

handlerImg.command = /^immagine$/i;
handlerImg.tags = ['shop'];
handlerImg.help = ['immagine <sku>'];

export default [handler, handlerImg];