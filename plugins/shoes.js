let handler = async (m, { args, conn, command }) => {
  if (!args.length)
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`');

  const isImgRequest = args[0] === 'img';
  const query = isImgRequest ? args.slice(1).join(' ').toLowerCase() : args.join(' ').toLowerCase();

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
    // Aggiungi qui le altre scarpe del tuo mega dataset
  ];

  const scarpa = scarpe.find(s => query.includes(s.modello));
  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  // Se è richiesta immagine
  if (isImgRequest) {
    return await conn.sendMessage(
      m.chat,
      {
        image: { url: scarpa.immagine },
        caption: `📸 Ecco l'immagine di *${scarpa.nome}*`
      },
      { quoted: m }
    );
  }

  // Altrimenti manda i dati con bottone
  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo medio: ${scarpa.prezzo} $\n🔗 ${scarpa.link}`;
  await conn.sendMessage(
    m.chat,
    {
      text: messaggio,
      footer: 'Clicca il bottone per vedere la foto 📸',
      buttons: [
        {
          buttonId: `.listino img ${scarpa.modello}`,
          buttonText: { displayText: '📸 Immagine' },
          type: 1
        }
      ],
      headerType: 1
    },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>', 'listino img <modello>'];
handler.tags = ['shop'];

export default handler;