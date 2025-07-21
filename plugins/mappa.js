import fs from 'fs';

const handler = async (m, { conn }) => {
  const text = m.text?.toLowerCase();

  if (text === '.mappa') {
    const raw = fs.readFileSync('./localita_dataset.json');
    const localita = JSON.parse(raw);

    const scelta = localita[Math.floor(Math.random() * localita.length)];

    global.mappaGame = global.mappaGame || {};
    global.mappaGame[m.chat] = {
      country: scelta.country.toLowerCase(),
      timeout: setTimeout(() => {
        if (global.mappaGame?.[m.chat]) {
          conn.reply(m.chat, `⏰ Tempo scaduto! Era: *${scelta.country}*`, m);
          delete global.mappaGame[m.chat];
        }
      }, 60000)
    };

    await conn.sendMessage(m.chat, {
      image: { url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/BlankMap-World.png' },
      caption: `🗺️ *Indovina la posizione!*`,
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      image: { url: scelta.url },
      caption: `📍 *Dove si trova questa località?*\n⌛ Hai 60 secondi. Rispondi con lo stato corretto.`,
    }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  const game = global.mappaGame?.[m.chat];
  if (!game || m.key.fromMe) return;
  const text = m.text?.toLowerCase().trim();
  if (!text) return;

  if (text === game.country) {
    clearTimeout(game.timeout);
    conn.reply(m.chat, `✅ *CORRETTO!* La risposta era: *${game.country}*`, m);
    delete global.mappaGame[m.chat];
  }
};

handler.command = ['mappa'];
handler.tags = ['game'];
handler.help = ['mappa'];

export default handler;