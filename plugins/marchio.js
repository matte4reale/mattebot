let handler = async (m, { conn, isAdmin }) => {
  if (m.text?.toLowerCase() === '.skiplogo') {
    if (!m.isGroup) return m.reply('⚠️ Solo nei gruppi!');
    if (!global.logoGame?.[m.chat]) return m.reply('⚠️ Nessuna partita attiva!');
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin possono saltare il logo!');
    clearTimeout(global.logoGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Il gioco è stato interrotto.\nLa risposta corretta era: *${global.logoGame[m.chat].risposta}*`, m);
    delete global.logoGame[m.chat];
    return;
  }

  if (m.text?.toLowerCase() === '.haram') {
    if (global.logoGame?.[m.chat]) {
      return m.reply('⚠️ C’è già una partita in corso!');
    }

    const cooldownKey = `logo_${m.chat}`;
    const now = Date.now();
    global.cooldowns = global.cooldowns || {};
    if (now - (global.cooldowns[cooldownKey] || 0) < 10000) {
      const rem = Math.ceil((10000 - (now - global.cooldowns[cooldownKey])) / 1000);
      return m.reply(`⏳ Aspetta ${rem}s prima di giocare un’altra volta.`);
    }
    global.cooldowns[cooldownKey] = now;

    let loghi = [
      { url: 'https://www.freeiconspng.com/uploads/toyota-logo-8.png', marca: 'toyota' },
      { url: 'https://www.freepnglogos.com/uploads/ford-logo-png/ford-logo-oval-png-transparent-background-5.png', marca: 'ford' },
      { url: 'https://citypng.com/public/uploads/preview/bmw-logo-transparent-png-11659034847y4wcuzlfv3.png', marca: 'bmw' },
      { url: 'https://www.freepnglogos.com/uploads/audi-logo-1.png', marca: 'audi' },
      { url: 'https://imgbin.com/png/Gtkn9xCt/honda-logo-honda-motor-company-car-honda-city-png', marca: 'honda' },
      { url: 'https://www.freeiconspng.com/uploads/mercedes-benz-logo-png-transparent-background-0.png', marca: 'mercedes' },
      { url: 'https://www.freeiconspng.com/uploads/chevrolet-logo-3.png', marca: 'chevrolet' },
      { url: 'https://www.freepnglogos.com/uploads/nissan-logo-png-22.png', marca: 'nissan' },
      { url: 'https://www.freeiconspng.com/uploads/kia-logo-png-transparent-18.png', marca: 'kia' },
      { url: 'https://www.freeiconspng.com/uploads/hyundai-logo-png-transparent-3.png', marca: 'hyundai' },
      { url: 'https://www.freeiconspng.com/uploads/lexus-logo-10.png', marca: 'lexus' },
      { url: 'https://www.freeiconspng.com/uploads/porsche-logo-transparent-5.png', marca: 'porsche' },
      { url: 'https://www.freeiconspng.com/uploads/ferrari-logo-transparent-6.png', marca: 'ferrari' },
      { url: 'https://www.freeiconspng.com/uploads/lamborghini-logo-0.png', marca: 'lamborghini' },
    ];

    let scelta = loghi[Math.floor(Math.random() * loghi.length)];
    let frasi = [
      '🔷 *INDOVINA LA MARCA DAL LOGO!*',
      '🚗 *Che marca è questo logo?*',
      '🎯 *Riconosci il brand automobilistico?*'
    ];
    let frase = frasi[Math.floor(Math.random() * frasi.length)];

    global.logoGame = global.logoGame || {};
    global.logoGame[m.chat] = {
      risposta: scelta.marca,
      timeout: setTimeout(() => {
        if (global.logoGame?.[m.chat]) {
          conn.reply(m.chat, `⏰ Tempo finito! La risposta era: *${scelta.marca}*`, m);
          delete global.logoGame[m.chat];
        }
      }, 60000)
    };

    await conn.sendMessage(
      m.chat,
      { image: { url: scelta.url }, caption: `${frase}\nHai 60 secondi!` },
      { quoted: m }
    );
  }
};

handler.help = ['brum', 'skiplogo'];
handler.tags = ['game'];
handler.command = ['brum', 'skiplogo'];

export default handler;