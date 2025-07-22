let handler = async (m, { conn }) => {
  const localita = [
    { città: "Parigi", paese: "Francia", url: "https://cdn.pixabay.com/photo/2015/03/26/09/54/eiffel-tower-690293_960_720.jpg" },
    { città: "Roma", paese: "Italia", url: "https://cdn.pixabay.com/photo/2016/09/07/11/37/colosseum-1650726_960_720.jpg" },
    { città: "Londra", paese: "Regno Unito", url: "https://cdn.pixabay.com/photo/2017/01/20/00/30/london-1990680_960_720.jpg" },
    { città: "New York", paese: "Stati Uniti", url: "https://cdn.pixabay.com/photo/2016/11/18/17/20/new-york-1834576_960_720.jpg" },
    { città: "Tokyo", paese: "Giappone", url: "https://cdn.pixabay.com/photo/2018/01/15/07/51/tokyo-3088451_960_720.jpg" },
    { città: "Barcellona", paese: "Spagna", url: "https://cdn.pixabay.com/photo/2017/01/20/00/30/barcelona-1990650_960_720.jpg" },
    { città: "Dubai", paese: "Emirati Arabi Uniti", url: "https://cdn.pixabay.com/photo/2016/03/27/21/16/dubai-1281925_960_720.jpg" },
    { città: "Mosca", paese: "Russia", url: "https://cdn.pixabay.com/photo/2017/08/06/22/01/moscow-2594513_960_720.jpg" },
    { città: "Bangkok", paese: "Thailandia", url: "https://cdn.pixabay.com/photo/2016/10/03/19/59/wat-arun-1710955_960_720.jpg" },
    { città: "Istanbul", paese: "Turchia", url: "https://cdn.pixabay.com/photo/2017/02/15/12/12/mosque-2063912_960_720.jpg" },
    { città: "Il Cairo", paese: "Egitto", url: "https://cdn.pixabay.com/photo/2015/03/27/13/16/pyramids-694041_960_720.jpg" },
    { città: "Atene", paese: "Grecia", url: "https://cdn.pixabay.com/photo/2016/11/29/03/53/acropolis-1868044_960_720.jpg" },
    { città: "San Francisco", paese: "Stati Uniti", url: "https://cdn.pixabay.com/photo/2015/10/12/15/03/san-francisco-984608_960_720.jpg" },
    { città: "Berlino", paese: "Germania", url: "https://cdn.pixabay.com/photo/2016/09/01/08/16/berlin-1639991_960_720.jpg" },
    { città: "Praga", paese: "Repubblica Ceca", url: "https://cdn.pixabay.com/photo/2016/09/09/08/41/prague-1653340_960_720.jpg" },
    { città: "Vienna", paese: "Austria", url: "https://cdn.pixabay.com/photo/2017/04/06/09/53/vienna-2201735_960_720.jpg" },
    { città: "Lisbona", paese: "Portogallo", url: "https://cdn.pixabay.com/photo/2018/09/01/09/52/lisbon-3643781_960_720.jpg" },
    { città: "Toronto", paese: "Canada", url: "https://cdn.pixabay.com/photo/2017/09/17/21/47/toronto-2754255_960_720.jpg" },
    { città: "Buenos Aires", paese: "Argentina", url: "https://cdn.pixabay.com/photo/2018/02/13/14/19/argentina-3152617_960_720.jpg" },
    { città: "Città del Messico", paese: "Messico", url: "https://cdn.pixabay.com/photo/2015/03/26/09/43/palace-690273_960_720.jpg" }
  ];

  if (!global.geoGame) global.geoGame = {};
  if (global.geoGame[m.chat]) return m.reply("⚠️ Una partita è già in corso!");

  const scelta = localita[Math.floor(Math.random() * localita.length)];

  global.geoGame[m.chat] = {
    risposta: scelta.paese.toLowerCase(),
    timeout: setTimeout(() => {
      if (global.geoGame[m.chat]) {
        conn.sendMessage(m.chat, { text: `⏱️ Tempo scaduto! La risposta era: *${scelta.paese}*` });
        delete global.geoGame[m.chat];
      }
    }, 60000)
  };

  // Mappa fissa da file locale
  await conn.sendFile(m.chat, './plugins/mappa.png', 'mappa.png', '🌍 *Indica lo stato corretto della località raffigurata!*', m);

  // Immagine città da indovinare
  await conn.sendMessage(m.chat, {
    image: { url: scelta.url },
    caption: '🖼️ *Indovina lo stato da questa immagine!*\nHai 60 secondi!'
  }, { quoted: m });
};

handler.before = async (m, { conn }) => {
  const gioco = global.geoGame?.[m.chat];
  if (!gioco || m.key.fromMe) return;

  const risposta = m.text?.toLowerCase().trim();
  if (!risposta) return;

  if (risposta === gioco.risposta) {
    clearTimeout(gioco.timeout);
    await conn.sendMessage(m.chat, {
      text: `🎉 *Risposta corretta!*\nLo stato era: *${gioco.risposta.toUpperCase()}*`
    });
    delete global.geoGame[m.chat];
  }
};

handler.help = ['mappa'];
handler.tags = ['game'];
handler.command = ['mappa'];
export default handler;