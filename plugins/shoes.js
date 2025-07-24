let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike dunk low`');

  const query = args.join(' ').toLowerCase();

  // Dizionario locale: modello → {prezzo, fonte, img}
  const scarpe = {
    "nike air force 1": {
      prezzo: "110 €",
      fonte: "Nike.com",
      img: "https://images.pexels.com/photos/245438/pexels-photo-245438.jpeg"
    },
    "nike dunk low": {
      prezzo: "120 €",
      fonte: "FootLocker.it",
      img: "https://images.pexels.com/photos/5702101/pexels-photo-5702101.jpeg"
    },
    "air jordan 1": {
      prezzo: "180 €",
      fonte: "Nike.com",
      img: "https://images.pexels.com/photos/6311609/pexels-photo-6311609.jpeg"
    },
    "yeezy 350": {
      prezzo: "220 €",
      fonte: "Adidas.com",
      img: "https://images.pexels.com/photos/8454342/pexels-photo-8454342.jpeg"
    },
    "converse chuck taylor": {
      prezzo: "75 €",
      fonte: "Converse.com",
      img: "https://images.pexels.com/photos/19090/pexels-photo-19090.jpeg"
    },
    "new balance 550": {
      prezzo: "130 €",
      fonte: "NewBalance.it",
      img: "https://images.pexels.com/photos/8930280/pexels-photo-8930280.jpeg"
    },
    "adidas samba": {
      prezzo: "100 €",
      fonte: "Adidas.it",
      img: "https://images.pexels.com/photos/12408966/pexels-photo-12408966.jpeg"
    },
    "puma suede": {
      prezzo: "80 €",
      fonte: "Puma.com",
      img: "https://images.pexels.com/photos/3293149/pexels-photo-3293149.jpeg"
    }
  };

  // Trova il modello che contiene le parole digitate (es. “jordan 1”)
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