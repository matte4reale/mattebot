let handler = async (m, { conn }) => {
  if (!m.chat) return;

  const cittàDataset = [
    {
      paese: "Francia",
      città: "Parigi",
      img: "https://raw.githubusercontent.com/MatteBotAssets/geo-images/main/paris.jpg"
    },
    {
      paese: "Italia",
      città: "Roma",
      img: "https://raw.githubusercontent.com/MatteBotAssets/geo-images/main/rome.jpg"
    },
    {
      paese: "Giappone",
      città: "Tokyo",
      img: "https://raw.githubusercontent.com/MatteBotAssets/geo-images/main/tokyo.jpg"
    },
    {
      paese: "USA",
      città: "New York",
      img: "https://raw.githubusercontent.com/MatteBotAssets/geo-images/main/newyork.jpg"
    },
    {
      paese: "Regno Unito",
      città: "Londra",
      img: "https://raw.githubusercontent.com/MatteBotAssets/geo-images/main/london.jpg"
    }
  ];

  const scelta = cittàDataset[Math.floor(Math.random() * cittàDataset.length)];
  const opzioni = [scelta.paese];

  while (opzioni.length < 5) {
    let rnd = cittàDataset[Math.floor(Math.random() * cittàDataset.length)].paese;
    if (!opzioni.includes(rnd)) opzioni.push(rnd);
  }

  // Mischia le opzioni
  opzioni.sort(() => Math.random() - 0.5);

  global.geoGame = global.geoGame || {};
  global.geoGame[m.chat] = {
    risposta: scelta.paese,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, { text: `⏰ Tempo scaduto! La risposta era *${scelta.paese}*.` });
      delete global.geoGame[m.chat];
    }, 60000)
  };

  // Invia prima la mappa politica
  await conn.sendMessage(m.chat, {
    image: { url: './plugins/mappa_assets/mappa.png' },
    caption: "🧭 *Indovina lo stato dalla città nella prossima immagine!*"
  });

  // Poi la città con i bottoni
  await conn.sendMessage(m.chat, {
    image: { url: scelta.img },
    caption: `🌆 Dove si trova questa città?`,
    buttons: opzioni.map(op => ({ buttonId: `.guess ${op}`, buttonText: { displayText: op }, type: 1 })),
    headerType: 4
  }, { quoted: m });
};

handler.command = ['mappa'];
handler.tags = ['game'];
handler.help = ['mappa'];

export default handler;