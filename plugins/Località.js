let handler = async (m, { conn, command }) => {
  const regioni = [
    { regione: "Lazio", url: "https://images.pexels.com/photos/33047441/pexels-photo-33047441.jpeg" },
    { regione: "Lombardia", url: "https://images.pexels.com/photos/8430364/pexels-photo-8430364.jpeg" },
    { regione: "Campania", url: "https://images.pexels.com/photos/32716466/pexels-photo-32716466.jpeg" },
    { regione: "Toscana", url: "https://images.pexels.com/photos/208213/pexels-photo-208213.jpeg" },
    { regione: "Veneto", url: "https://images.pexels.com/photos/161956/venice-gondola-canal-italy-161956.jpeg" },
    { regione: "Sicilia", url: "https://images.pexels.com/photos/18792077/pexels-photo-18792077.jpeg" },
    { regione: "Piemonte", url: "https://images.pexels.com/photos/33040847/pexels-photo-33040847.jpeg" },
    { regione: "Emilia-Romagna", url:"https://images.pexels.com/photos/3372316/pexels-photo-3372316.jpeg" },
    { regione: "Puglia", url: "https://images.pexels.com/photos/18290115/pexels-photo-18290115.jpeg" },
    { regione: "Sardegna", url: "https://images.pexels.com/photos/29902042/pexels-photo-29902042.jpeg" },
    { regione: "Liguria", url: "https://images.pexels.com/photos/1797121/pexels-photo-1797121.jpeg" },
    { regione: "Marche", url: "https://images.pexels.com/photos/16363543/pexels-photo-16363543.jpeg" },
    { regione: "Calabria", url: "https://media.istockphoto.com/id/530446239/it/foto/vista-panoramica-di-scalea-calabria-italia.jpg" },
    { regione: "Abruzzo", url: "https://media.istockphoto.com/id/1182736856/it/foto/vista-panoramica-a-barrea-provincia-dellaquila-in-abruzzo.jpg" },
    { regione: "Trentino-Alto Adige", url: "https://media.istockphoto.com/id/637816996/it/foto/splendido-paesaggio-primaverile-con-il-villaggio-di-santa-maddalena-le-dolomiti-litalia-leuropa.jpg" },
    { regione: "Friuli-Venezia Giulia", url: "https://media.istockphoto.com/id/1347140201/it/foto/citt%C3%A0-di-palmanova-mura-di-difesa-e-trincee-veduta-aerea.jpg" },
    { regione: "Umbria", url: "https://images.pexels.com/photos/2031966/pexels-photo-2031966.jpeg" },
    { regione: "Basilicata", url: "https://media.istockphoto.com/id/510042421/it/foto/corcovado.jpg" },
    { regione: "Molise", url: "https://media.istockphoto.com/id/1469935405/it/foto/terrmoli.jpg" },
    { regione: "Valle d'Aosta", url: "https://media.istockphoto.com/id/1452950362/it/foto/courmayeur-citt%C3%A0-di-montagna-italiana-dal-drone.jpg" }
  ];

  global.regionGame = global.regionGame || {};

  if (command === 'skip') {
    const current = global.regionGame[m.chat];
    if (!current) return m.reply("❌ Nessuna partita da saltare.");
    clearTimeout(current.timeout);
    delete global.regionGame[m.chat];
    return conn.sendMessage(m.chat, { text: `⏩ Hai saltato la partita. La risposta era: *${current.risposta.toUpperCase()}*` });
  }

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
  } else {
    await conn.sendMessage(m.chat, {
      text: `❌ Risposta sbagliata. Riprova!`
    });
  }
};

handler.help = ['regioni', 'skip'];
handler.tags = ['game'];
handler.command = ['regioni', 'skip'];

export default handler;