if (text === '.brum') {
  if (global.logoGame?.[m.chat]) return m.reply('⚠️ Partita già in corso!');
  
  global.cooldowns = global.cooldowns || {};
  const now = Date.now();
  const key = `logo_${m.chat}`;

  if (now - (global.cooldowns[key] || 0) < 10000) {
    const rem = Math.ceil((10000 - (now - global.cooldowns[key])) / 1000);
    return m.reply(`⏳ Aspetta ancora ${rem}s prima di giocare di nuovo.`);
  }
  global.cooldowns[key] = now;

  const loghi = [
    { url: 'https://i.ibb.co/7JznGDd/bmw.png', marca: 'bmw' },
    { url: 'https://i.ibb.co/9tcwQZj/toyota.png', marca: 'toyota' },
    { url: 'https://i.ibb.co/pK0vPjw/ford.png', marca: 'ford' },
    { url: 'https://i.ibb.co/3sQjyBr/audi.png', marca: 'audi' },
    { url: 'https://i.ibb.co/YZ2Ffp6/mercedes.png', marca: 'mercedes' }
  ];

  const scelta = loghi[Math.floor(Math.random() * loghi.length)];
  const frasi = [
    '🚘 *INDOVINA LA MARCA DAL LOGO!*',
    '🏁 *Che marca è questa?*',
    '🔍 *Riconosci questo logo?*'
  ];
  const frase = frasi[Math.floor(Math.random() * frasi.length)];

  global.logoGame = global.logoGame || {};
  global.logoGame[m.chat] = {
    risposta: scelta.marca,
    timeout: setTimeout(() => {
      if (global.logoGame?.[m.chat]) {
        conn.reply(m.chat, `⏰ Tempo scaduto! Risposta: *${scelta.marca}*`, m);
        delete global.logoGame[m.chat];
      }
    }, 60000)
  };

  await conn.sendMessage(
    m.chat,
    {
      image: { url: scelta.url },   // qui manda l’immagine dal link
      caption: `${frase}\n⌛ Hai 60 secondi per rispondere!`
    },
    { quoted: m }
  );
}