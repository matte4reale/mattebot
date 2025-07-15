import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const playersFile = path.join(__dirname, 'fifaPlayers_packs.json');
const allPlayers = JSON.parse(fs.readFileSync(playersFile, 'utf-8'));

const PACK_CONFIG = {
  bronze: { cost: 100, name: 'Bronze', color: '🟫' },
  silver: { cost: 300, name: 'Silver', color: '⚪' },
  gold: { cost: 800, name: 'Gold', color: '🟡' }
};

async function openPack(m, conn, type) {
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  data.hollycash = data.hollycash || 0;
  data.fifaPlayers = data.fifaPlayers || [];

  const pack = PACK_CONFIG[type];
  if (!pack) return m.reply('❌ Tipo di pacchetto non valido.');

  if (data.hollycash < pack.cost) {
    return m.reply(`💸 Ti servono *${pack.cost} Holly Cash* per aprire un pacchetto ${pack.name}.`);
  }

  data.hollycash -= pack.cost;

  await conn.sendMessage(m.chat, {
    text: `${pack.color} Aprendo pacchetto *${pack.name}*...\n💸 Holly Cash rimasti: ${data.hollycash}`,
  }, { quoted: m });

  const players = allPlayers.filter(p => p.pack === type);
  if (players.length === 0) return m.reply(`😢 Nessun giocatore trovato.`);

  // Estrae 3 giocatori casuali
  const cards = [];
  for (let i = 0; i < 3; i++) {
    const p = players[Math.floor(Math.random() * players.length)];
    cards.push(p);
  }

  const best = [...cards].sort((a, b) => b.rating - a.rating)[0];

  await conn.sendMessage(m.chat, {
    image: { url: best.image },
    caption:
      `🎉 *${best.name}* (${best.rating}⭐)\n` +
      `📍 ${best.position} | ${best.club} | ${best.nation}\n\n` +
      `💸 Holly Cash rimasti: ${data.hollycash}`
  }, { quoted: m });

  for (let i = 1; i < cards.length; i++) {
    await conn.sendMessage(m.chat, {
      text: `➕ ${cards[i].name} (${cards[i].rating}⭐)`
    }, { quoted: m });
  }

  data.fifaPlayers.push(...cards);
}

// Handler multipli per i tre comandi
const handler = {};
['bronze', 'silver', 'gold'].forEach(type => {
  const cmd = `fut${type}`;
  handler[cmd] = async (m, { conn }) => openPack(m, conn, type);
  handler[cmd].command = new RegExp(`^fut${type}$`, 'i');
  handler[cmd].help = [`fut${type}`];
  handler[cmd].tags = ['fifa'];
  handler[cmd].disabled = false;
});

export default Object.values(handler);
