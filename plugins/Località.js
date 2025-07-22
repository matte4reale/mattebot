let handler = async (m, { conn }) => {
  const regioni = [
    { regione: "Lazio", url: "https://images.pexels.com/photos/33047441/pexels-photo-33047441.jpeg" }, // Colosseo, Roma
    { regione: "Lombardia", url: "https://images.pexels.com/photos/8430364/pexels-photo-8430364.jpeg" }, // Duomo di Milano
    { regione: "Campania", url: "https://images.pexels.com/photos/32716466/pexels-photo-32716466.jpeg" }, // Napoli/Vesuvio
    { regione: "Toscana", url: "https://images.pexels.com/photos/208213/pexels-photo-208213.jpeg" }, // Firenze
    { regione: "Veneto", url: "https://images.pexels.com/photos/161956/venice-gondola-canal-italy-161956.jpeg" }, // Venezia
    { regione: "Sicilia", url: "https://images.pexels.com/photos/161499/palermo-cathedral-sicily-italy-161499.jpeg" }, // Palermo
    { regione: "Piemonte", url: "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg" }, // Mole Antonelliana
    { regione: "Emilia-Romagna", url: "https://images.pexels.com/photos/3762878/pexels-photo-3762878.jpeg" }, // Bologna
    { regione: "Puglia", url: "https://images.pexels.com/photos/1280503/pexels-photo-1280503.jpeg" }, // Alberobello
    { regione: "Sardegna", url: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg" }, // Costa sarda
    { regione: "Liguria", url: "https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg" }, // Cinque Terre
    { regione: "Marche", url: "https://images.pexels.com/photos/12907149/pexels-photo-12907149.jpeg" }, // Urbino
    { regione: "Calabria", url: "https://images.pexels.com/photos/4878706/pexels-photo-4878706.jpeg" }, // Scilla
    { regione: "Abruzzo", url: "https://images.pexels.com/photos/15045745/pexels-photo-15045745.jpeg" }, // Gran Sasso
    { regione: "Trentino-Alto Adige", url: "https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg" }, // Dolomiti
    { regione: "Friuli-Venezia Giulia", url: "https://images.pexels.com/photos/6109400/pexels-photo-6109400.jpeg" }, // Trieste
    { regione: "Umbria", url: "https://images.pexels.com/photos/4748351/pexels-photo-4748351.jpeg" }, // Assisi
    { regione: "Basilicata", url: "https://images.pexels.com/photos/1274283/pexels-photo-1274283.jpeg" }, // Matera
    { regione: "Molise", url: "https://images.pexels.com/photos/8797919/pexels-photo-8797919.jpeg" }, // Campobasso
    { regione: "Valle d'Aosta", url: "https://images.pexels.com/photos/14317406/pexels-photo-14317406.jpeg" } // Monte Bianco
  ];

  if (!global.regionGame) global.regionGame = {};
  if (global.regionGame[m.chat]) return m.reply("⚠️ Una partita è già in corso!");

  const scelta = regioni[Math.floor(Math.random() * regioni.length)];

  global.regionGame[m.chat] = {
    risposta: scelta.regione.toLowerCase(),
    timeout: setTimeout(() => {
      if (global.regionGame[m.chat]) {
        conn.sendMessage(m.chat, { text: `⏱️ Tempo scaduto! La risposta era: *${scelta.regione}*` });
        delete global.regionGame[m.chat];
      }
    }, 60000)
  };

  await conn.sendMessage(m.chat, {
    image: { url: scelta.url },
    caption: '🇮🇹 *Indovina la regione italiana dalla foto del luogo!*\n⌛ Hai 60 secondi.'
  }, { quoted: m });
};

handler.before = async (m, { conn }) => {
  const gioco = global.regionGame?.[m.chat];
  if (!gioco || m.key.fromMe) return;

  const risposta = m.text?.toLowerCase().trim();
  if (!risposta) return;

  if (risposta === gioco.risposta) {
    clearTimeout(gioco.timeout);
    await conn.sendMessage(m.chat, {
      text: `🎉 *Risposta corretta!*\nEra la regione: *${gioco.risposta.toUpperCase()}*`
    });
    delete global.regionGame[m.chat];
  }
};

handler.help = ['regioni'];
handler.tags = ['game'];
handler.command = ['regioni'];
export default handler;