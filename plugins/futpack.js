import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ricava il percorso corrente (necessario in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Legge il file JSON localmente
const fifaPlayers = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'fifaPlayers.json'), 'utf8')
);

let handler = async (m, { conn }) => {
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  data.fifaInventory = data.fifaInventory || { base: 1 };
  if (data.fifaInventory.base <= 0) {
    return m.reply(`❌ Non hai pacchetti *FUT Base* disponibili.`);
  }

  data.fifaInventory.base--;

  await conn.sendMessage(m.chat, { text: '⚽ Aprendo pacchetto FUT...' }, { quoted: m });

  const allPlayers = fifaPlayers.filter(p => p.rating >= 80);
  if (allPlayers.length === 0) return m.reply(`😢 Nessun giocatore trovato.`);

  const cards = [];
  for (let i = 0; i < 3; i++) {
    const p = allPlayers[Math.floor(Math.random() * allPlayers.length)];
    cards.push(p);
  }

  const best = [...cards].sort((a, b) => b.rating - a.rating)[0];
  const imageUrl = `https://cdn.sofifa.net/players/${best.id}/24_120.png`;

  await conn.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption:
      `🎉 *${best.name}* (${best.rating}⭐)\n` +
      `📍 ${best.position} | ${best.club} | ${best.nation}\n\n` +
      `📦 Pacchetti rimasti: ${data.fifaInventory.base}`
  }, { quoted: m });

  for (let i = 1; i < cards.length; i++) {
    await conn.sendMessage(m.chat, {
      text: `➕ ${cards[i].name} (${cards[i].rating}⭐)`
    }, { quoted: m });
  }

  data.fifaPlayers = data.fifaPlayers || [];
  data.fifaPlayers.push(...cards);
};

handler.command = /^futpack$/i;
handler.tags = ['fifa'];
handler.help = ['futpack'];

export default handler;
