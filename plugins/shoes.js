let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino yeezy dunk low`');

  const query = args.join(' ').toLowerCase();

  const scarpe = [
    {
      modello: "yeezy superstar high",
      nome: "Yeezy Superstar High",
      sku: "YESUHI0001",
      prezzo: "101",
      immagine: "https://images.stockx.com/images/sneaker-1.jpg",
      link: "https://stockx.com/yeezy-superstar-high-1"
    },
    {
      modello: "new balance classic runner",
      nome: "New Balance Classic Runner",
      sku: "NECLRU0002",
      prezzo: "102",
      immagine: "https://images.stockx.com/images/sneaker-2.jpg",
      link: "https://stockx.com/new-balance-classic-runner-2"
    },
    {
      modello: "jordan gel-lyte retro",
      nome: "Jordan Gel-Lyte Retro",
      sku: "JOGERE0003",
      prezzo: "103",
      immagine: "https://images.stockx.com/images/sneaker-3.jpg",
      link: "https://stockx.com/jordan-gel-lyte-retro-3"
    },
    // ... (incolla qui il resto del tuo dataset fino a 100)
  ];

  const scarpa = scarpe.find(s => query.includes(s.modello.toLowerCase()));

  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo: ${scarpa.prezzo} $\n🔗 ${scarpa.link}`;

  if (scarpa.immagine && scarpa.immagine.startsWith('http')) {
    return conn.sendMessage(
      m.chat,
      {
        image: { url: scarpa.immagine },
        caption: messaggio
      },
      { quoted: m }
    );
  } else {
    return m.reply(messaggio);
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop'];

export default handler;