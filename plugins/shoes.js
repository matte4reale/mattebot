let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike dunk low`');

  const query = args.join(' ').toLowerCase();

  // Dizionario locale: modello → {prezzo, fonte, immagine}
  const scarpe = {
    "nike air force 1": {
      prezzo: "110 €",
      fonte: "Listino Ufficiale Nike",
      img: "https://images.stockx.com/images/Nike-Air-Force-1-07-Triple-White-Product.jpg"
    },
    "nike dunk low": {
      prezzo: "120 €",
      fonte: "Listino Ufficiale",
      img: "https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg"
    },
    "air jordan 1": {
      prezzo: "180 €",
      fonte: "Listino Jordan",
      img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-University-Blue-Product.jpg"
    },
    "yeezy 350": {
      prezzo: "220 €",
      fonte: "Yeezy by Adidas",
      img: "https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Black-Red-Product.jpg"
    },
    "converse chuck taylor": {
      prezzo: "75 €",
      fonte: "Converse.com",
      img: "https://images.stockx.com/images/Converse-Chuck-Taylor-All-Star-70-Hi-Black-Product.jpg"
    },
    "new balance 550": {
      prezzo: "130 €",
      fonte: "NewBalance.it",
      img: "https://images.stockx.com/images/New-Balance-550-White-Grey-Product.jpg"
    },
    "adidas samba": {
      prezzo: "100 €",
      fonte: "Adidas.it",
      img: "https://images.stockx.com/images/adidas-Samba-OG-Cloud-White-Core-Black-Product.jpg"
    },
    "puma suede": {
      prezzo: "80 €",
      fonte: "Puma.com",
      img: "https://images.stockx.com/images/Puma-Suede-Classic-Red-White-Product.jpg"
    }
  };

  // Trova il modello che contiene le parole digitate
  const chiave = Object.keys(scarpe).find(k => query.includes(k));
  if (!chiave) return m.reply('🔍 Modello non presente nel listino.');

  const s = scarpe[chiave];
  const mess = `👟 *${chiave.toUpperCase()}*\n💸 Prezzo indicativo: *${s.prezzo}*\n🔗 Fonte: ${s.fonte}`;

  return conn.sendMessage(
    m.chat,
    { image: { url: s.img }, caption: mess },
    { quoted: m }
  );
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop', 'tools'];

export default handler;