let handler = async (m, { args, conn }) => {
  if (!args.length)
    return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: `.listino nike dunk low`');

  const query = args.join(' ').toLowerCase();

  const scarpe = {
    "nike air force 1": {
      prezzo: "110 €",
      fonte: "Nike.com",
      img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
    },
    "nike dunk low": {
      prezzo: "120 €",
      fonte: "FootLocker.it",
      img: "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg"
    },
    "air jordan 1": {
      prezzo: "180 €",
      fonte: "Nike.com",
      img: "https://images.pexels.com/photos/2529150/pexels-photo-2529150.jpeg"
    },
    "yeezy 350": {
      prezzo: "220 €",
      fonte: "Adidas.com",
      img: "https://images.pexels.com/photos/2529154/pexels-photo-2529154.jpeg"
    },
    "converse chuck taylor": {
      prezzo: "75 €",
      fonte: "Converse.com",
      img: "https://images.pexels.com/photos/2529156/pexels-photo-2529156.jpeg"
    },
    "new balance 550": {
      prezzo: "130 €",
      fonte: "NewBalance.it",
      img: "https://images.pexels.com/photos/2529160/pexels-photo-2529160.jpeg"
    },
    "adidas samba": {
      prezzo: "100 €",
      fonte: "Adidas.it",
      img: "https://images.pexels.com/photos/2529162/pexels-photo-2529162.jpeg"
    },
    "puma suede": {
      prezzo: "80 €",
      fonte: "Puma.com",
      img: "https://images.pexels.com/photos/2529166/pexels-photo-2529166.jpeg"
    }
  };

  const chiave = Object.keys(scarpe).find(k => query.includes(k));
  if (!chiave) return m.reply('🔍 Modello non presente nel listino.');

  const s = scarpe[chiave];
  const mess = `👟 *${chiave.toUpperCase()}*\n💸 Prezzo indicativo: *${s.prezzo}*\n🔗 Fonte: ${s.fonte}`;

  try {
    await conn.sendMessage(
      m.chat,
      { image: { url: s.img }, caption: mess },
      { quoted: m }
    );
  } catch (err) {
    console.error('Errore nell\'invio del messaggio:', err);
    return m.reply('❌ Si è verificato un errore durante l\'invio del messaggio.');
  }
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>'];
handler.tags = ['shop', 'tools'];

export default handler;