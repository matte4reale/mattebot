let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`');

  const query = args.join(' ').toLowerCase();

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
    }
  ];

  const scarpa = scarpe.find(s => query.includes(s.modello));
  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo medio: ${scarpa.prezzo} $\n🔗 ${scarpa.link}`;

  // Invia messaggio con bottone "📸 Immagine"
  await conn.sendMessage(
    m.chat,
    {
      text: messaggio,
      footer: 'Clicca il bottone per vedere la foto 📸',
      buttons: [
        {
          buttonId: `.img ${scarpa.modello}`,
          buttonText: { displayText: '📸 Immagine' },
          type: 1
        }
      ],
      headerType: 1
    },
    { quoted: m }
  );
};

// Handler separato per il comando immagine
let imgHandler = async (m, { args, conn }) => {
  const query = args.join(' ').toLowerCase();

  const scarpe = [
    {
      modello: "jordan 4 thunder",
      immagine: "https://images.stockx.com/images/Air-Jordan-4-Retro-Thunder-2023-Product.jpg"
    },
    {
      modello: "nike dunk low panda",
      immagine: "https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-Panda-Product.jpg"
    }
  ];

  const scarpa = scarpe.find(s => query.includes(s.modello));
  if (!scarpa) return m.reply('❌ Immagine non trovata.');

  await conn.sendMessage(
    m.chat,
    {
      image: { url: scarpa.immagine },
      caption: `📸 Ecco l'immagine di *${scarpa.modello}*`
    },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
imgHandler.command = /^img$/i;

export default [handler, imgHandler];