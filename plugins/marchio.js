let handler = async (m, { conn, isAdmin }) => {
  if (m.text?.toLowerCase() === '.skiplogo') {
    if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!');
    if (!global.logoGame?.[m.chat]) return m.reply('⚠️ Nessuna partita attiva!');
    if (!isAdmin && !m.fromMe) return m.reply('❌ Solo admin possono usare questo comando!');
    clearTimeout(global.logoGame[m.chat].timeout);
    await conn.reply(m.chat, `🛑 Gioco interrotto. La risposta era: *${global.logoGame[m.chat].risposta}*`, m);
    delete global.logoGame[m.chat];
    return;
  }

  if (global.logoGame?.[m.chat]) return m.reply('⚠️ Una partita è già in corso!');

  const cooldownKey = `logo_${m.chat}`;
  const now = Date.now();
  global.cooldowns = global.cooldowns || {};
  if (now - (global.cooldowns[cooldownKey] || 0) < 10000) {
    const rem = Math.ceil((10000 - (now - global.cooldowns[cooldownKey]))/1000);
    return m.reply(`⏳ Aspetta ${rem}s prima di iniziare un'altra partita.`);
  }
  global.cooldowns[cooldownKey] = now;

  let loghi = [
    { url: 'https://www.freeiconspng.com/uploads/toyota-logo-8.png', marca: 'toyota' },
    { url: 'https://www.freepnglogos.com/uploads/ford-logo-png/ford-logo-oval-png-transparent-background-5.png', marca: 'ford' },
    { url: 'https://citypng.com/public/uploads/preview/bmw-logo-transparent-png-11659034847y4wcuzlfv3.png', marca: 'bmw' },
    { url: 'https://www.freepnglogos.com/uploads/audi-logo-1.png', marca: 'audi' },
    { url: 'https://imgbin.com/png/Gtkn9xCt/honda-logo-honda-motor-company-car-honda-city-png', marca: 'honda' },
    // puoi aggiungere qui tanti altri loghi funzionanti
  ];

  let scelta = loghi[Math.floor(Math.random() * loghi.length)];
  let frasi = [
    `🔷 *INDOVINA IL MARCHIO DAL LOGO!*`,
    `🚗 *Che marca è questo logo?*`,
    `🎯 *Riconosci il brand automobilistico?*`,
  ];
  let frase = frasi[Math.floor(Math.random() * frasi.length)];

  global.logoGame = global.logoGame || {};
  global.logoGame[m.chat] = {
    risposta: scelta.marca,
    timeout: setTimeout(() => {
      if (global.logoGame?.[m.chat]) {
        conn.reply(m.chat, `⏰ Tempo scaduto! La risposta giusta era: *${scelta.marca}*`, m);
        delete global.logoGame[m.chat];
      }
    }, 60000)
  };

  await conn.sendMessage(
    m.chat,
    { image: { url: scelta.url }, caption: `${frase}\nHai 60 secondi!` },
    { quoted: m }
  );
};

handler.command = ['brum', 'skiplogo'];
export default handler;