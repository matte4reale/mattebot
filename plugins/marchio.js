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
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png', marca: 'bmw' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_logo.png/800px-Toyota_logo.png', marca: 'toyota' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/1024px-Ford_logo_flat.svg.png', marca: 'ford' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Audi_logo_2020.png/800px-Audi_logo_2020.png', marca: 'audi' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/1024px-Mercedes-Benz_Logo_2010.svg.png', marca: 'mercedes' }
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