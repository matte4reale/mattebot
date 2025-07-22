let handler = async (m, { conn, isAdmin, command }) => {
  const localita = [
    { città: "Parigi", paese: "Francia", url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
    { città: "New York", paese: "Stati Uniti", url: "https://images.unsplash.com/photo-1549921296-3a6b207b117f" },
    { città: "Roma", paese: "Italia", url: "https://images.unsplash.com/photo-1580894908360-ec1b9080f0db" },
    { città: "Tokyo", paese: "Giappone", url: "https://images.unsplash.com/photo-1589916074303-406386f21090" },
    { città: "Londra", paese: "Regno Unito", url: "https://images.unsplash.com/photo-1554118811-1e1e007b8b5b" },
    { città: "Pechino", paese: "Cina", url: "https://images.unsplash.com/photo-1576085898320-6c8523f3356e" },
    { città: "Mosca", paese: "Russia", url: "https://images.unsplash.com/photo-1613742922896-e192eb6c1d90" },
    { città: "Rio de Janeiro", paese: "Brasile", url: "https://images.unsplash.com/photo-1582744821089-3ee9a997caa2" },
    { città: "Atene", paese: "Grecia", url: "https://images.unsplash.com/photo-1560774351-e7e5a2c1d8ed" },
    { città: "Berlino", paese: "Germania", url: "https://images.unsplash.com/photo-1599478372772-9c5d8235f432" },
    { città: "Bangkok", paese: "Thailandia", url: "https://images.unsplash.com/photo-1599146815255-cac89c237ca8" },
    { città: "Sidney", paese: "Australia", url: "https://images.unsplash.com/photo-1506973035872-a4f23c1f8c00" },
    { città: "Il Cairo", paese: "Egitto", url: "https://images.unsplash.com/photo-1580663139593-60b9812252c1" },
    { città: "Toronto", paese: "Canada", url: "https://images.unsplash.com/photo-1598367813708-174e0b60a5e0" },
    { città: "San Francisco", paese: "Stati Uniti", url: "https://images.unsplash.com/photo-1579930694463-2eac887ba0ec" },
    { città: "Barcellona", paese: "Spagna", url: "https://images.unsplash.com/photo-1533142266415-ac591a4f9f4c" },
    { città: "Istanbul", paese: "Turchia", url: "https://images.unsplash.com/photo-1598620613274-8f7b91e3eaa3" },
    { città: "Dubai", paese: "Emirati Arabi Uniti", url: "https://images.unsplash.com/photo-1596803240502-b308c9c1ef94" },
    { città: "Singapore", paese: "Singapore", url: "https://images.unsplash.com/photo-1572177812156-58036aae4392" },
    { città: "Città del Messico", paese: "Messico", url: "https://images.unsplash.com/photo-1601066526190-88262f1c26f9" }
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

  // Mappa fissa
  await conn.sendFile(m.chat, './plugins/mappa.png', 'mappa.png', '🌍 *Indica lo stato corretto della località raffigurata!*', m);

  // Immagine da indovinare
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