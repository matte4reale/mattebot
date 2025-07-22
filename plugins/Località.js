let handler = async (m, { conn }) => {
  const localita = [
    { città: "Parigi", paese: "Francia", url: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg" },
    { città: "Roma", paese: "Italia", url: "https://images.pexels.com/photos/179716/pexels-photo-179716.jpeg" },
    { città: "Londra", paese: "Regno Unito", url: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },
    { città: "New York", paese: "Stati Uniti", url: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg" },
    { città: "Tokyo", paese: "Giappone", url: "https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg" },
    { città: "Barcellona", paese: "Spagna", url: "https://images.pexels.com/photos/3611027/pexels-photo-3611027.jpeg" },
    { città: "Dubai", paese: "Emirati Arabi Uniti", url: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg" },
    { città: "Mosca", paese: "Russia", url: "https://images.pexels.com/photos/1270756/pexels-photo-1270756.jpeg" },
    { città: "Bangkok", paese: "Thailandia", url: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg" },
    { città: "Istanbul", paese: "Turchia", url: "https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg" }
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

  await conn.sendMessage(m.chat, {
    image: { url: scelta.url },
    caption: '🖼️ *Indovina lo stato della località mostrata in foto!*\nHai 60 secondi!'
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