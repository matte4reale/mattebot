let handler = async (m, { conn, isAdmin }) => {
  if (m.text?.toLowerCase() === '.skiplogo') {
    if (!m.isGroup) return m.reply('⚠️ Solo nei gruppi!');
    if (!global.logoGame?.[m.chat]) return m.reply('⚠️ Nessuna partita attiva!');
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin possono saltare!');
    clearTimeout(global.logoGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Il gioco è stato interrotto.\nRisposta: *${global.logoGame[m.chat].risposta}*`, m);
    delete global.logoGame[m.chat];
    return;
  }

  if (m.text?.toLowerCase() === '.brum') {
    if (global.logoGame?.[m.chat]) return m.reply('⚠️ Partita già in corso!');
    const cooldownKey = `logo_${m.chat}`;
    const now = Date.now();
    global.cooldowns = global.cooldowns || {};
    if (now - (global.cooldowns[cooldownKey] || 0) < 10000)
      return m.reply(`⏳ Aspetta ancora ${Math.ceil((10000 - (now - global.cooldowns[cooldownKey]))/1000)}s`);
    global.cooldowns[cooldownKey] = now;

    let loghi = [
      { url: 'https://i.ibb.co/7JznGDd/bmw.png', marca: 'bmw' },
      { url: 'https://i.ibb.co/9tcwQZj/toyota.png', marca: 'toyota' },
      { url: 'https://i.ibb.co/pK0vPjw/ford.png', marca: 'ford' },
      { url: 'https://i.ibb.co/3sQjyBr/audi.png', marca: 'audi' },
      { url: 'https://i.ibb.co/YZ2Ffp6/mercedes.png', marca: 'mercedes' }
      // aggiungi altri loghi hostati su ImgBB...
    ];

    let scelta = loghi[Math.floor(Math.random() * loghi.length)];
    let frasi = [
      '🚘 *INDOVINA LA MARCA DAL LOGO!*',
      '🏁 *Che marca è questa?*',
      '🔍 *Riconosci questo logo?*'
    ];
    let frase = frasi[Math.floor(Math.random() * frasi.length)];

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

    await conn.sendMessage(m.chat, {
      image: { url: scelta.url },
      caption: `${frase}\n⌛ Hai 60 secondi per rispondere!`
    }, { quoted: m });
  }
};

handler.help = ['brum', 'skiplogo'];
handler.tags = ['game'];
handler.command = ['brum', 'skiplogo'];

export default handler;