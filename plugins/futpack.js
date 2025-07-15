import fetch from 'node-fetch';

// 🔐 Inserisci qui la tua chiave API FutDatabase
const FUTDB_API_KEY = process.env.FUTDB_API_KEY || 'cb8ba931-bbc7-8413-5a51-fb3c0c382c22';

async function getFifaPlayers() {
  const url = 'https://www.easports.com/fifa/ultimate-team/api/fc-players?json=true&page=1';
  const res = await fetch(url);

  if (!res.ok) {
    console.error('Errore API EA:', res.statusText);
    return [];
  }

  const json = await res.json();
  const players = json.items || [];

  return players
    .filter(p => p.rating >= 80)
    .map(p => ({
      id: p.id,
      name: `${p.firstName} ${p.lastName}`,
      rating: p.rating,
      nation: p.nationName,
      club: p.club.name,
      position: p.position,
      image: `https://futhead.cursecdn.com/static/img/14/players/${p.id}.png`
    }));
}

async function getPlayerStatsFromFutDB(playerId) {
  try {
    const res = await fetch(`https://api.futdatabase.com/api/players/${playerId}`, {
      headers: {
        'X-AUTH-TOKEN': FUTDB_API_KEY
      }
    });

    if (!res.ok) throw new Error(`FutDB errore ${res.status}`);
    const data = await res.json();

    return {
      pace: data.pace,
      shooting: data.shooting,
      passing: data.passing,
      dribbling: data.dribbling,
      defending: data.defending,
      physicality: data.physicality
    };
  } catch (err) {
    console.warn(`⚠️ Errore stats per ID ${playerId}:`, err.message);
    return null;
  }
}

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

  const allPlayers = await getFifaPlayers();
  if (allPlayers.length === 0) return m.reply(`😢 Nessun giocatore trovato.`);

  const cards = [];
  for (let i = 0; i < 3; i++) {
    const p = allPlayers[Math.floor(Math.random() * allPlayers.length)];
    const stats = await getPlayerStatsFromFutDB(p.id);
    cards.push({ ...p, stats });
  }

  const best = [...cards].sort((a, b) => b.rating - a.rating)[0];

  let statText = '';
  if (best.stats) {
    statText =
      `\n📊 *Statistiche:*\n` +
      `🚀 Velocità: ${best.stats.pace}\n` +
      `🎯 Tiro: ${best.stats.shooting}\n` +
      `🎨 Passaggi: ${best.stats.passing}\n` +
      `🤹‍♂️ Dribbling: ${best.stats.dribbling}\n` +
      `🛡️ Difesa: ${best.stats.defending}\n` +
      `💪 Fisico: ${best.stats.physicality}`;
  }

  await conn.sendMessage(m.chat, {
    image: { url: best.image },
    caption:
      `🎉 *${best.name}* (${best.rating}⭐)\n` +
      `📍 ${best.position} | ${best.club} | ${best.nation}\n` +
      statText +
      `\n\n📦 Pacchetti rimasti: ${data.fifaInventory.base}`
  }, { quoted: m });

  for (let i = 1; i < cards.length; i++) {
    const card = cards[i];
    await conn.sendMessage(m.chat, {
      text: `➕ ${card.name} (${card.rating}⭐)`
    }, { quoted: m });
  }

  data.fifaPlayers = data.fifaPlayers || [];
  data.fifaPlayers.push(...cards);
};

handler.command = /^futpack$/i;
handler.tags = ['fifa'];
handler.help = ['futpack'];

export default handler;
