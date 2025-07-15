import fetch from 'node-fetch';

const FUTDB_API_KEY = process.env.FUTDB_API_KEY || 'cb8ba931-bbc7-8413-5a51-fb3c0c382c22';

// ✅ Ottiene giocatori casuali da FutDatabase
async function getPlayersFromFutDB(count = 50) {
  try {
    const res = await fetch(`https://api.futdatabase.com/api/players?page=1&limit=${count}`, {
      headers: { 'X-AUTH-TOKEN': FUTDB_API_KEY }
    });

    if (!res.ok) {
      console.error('❌ Errore FutDB:', res.statusText);
      return [];
    }

    const json = await res.json();
    return json.items.map(p => ({
      id: p.id,
      name: p.name,
      rating: p.rating,
      nation: p.nation?.name || 'Sconosciuta',
      club: p.club?.name || 'Sconosciuto',
      position: p.position,
      image: p.image || `https://futhead.cursecdn.com/static/img/14/players/${p.id}.png`,
      stats: {
        pace: p.pace,
        shooting: p.shooting,
        passing: p.passing,
        dribbling: p.dribbling,
        defending: p.defending,
        physicality: p.physicality
      }
    }));
  } catch (err) {
    console.error('❌ Errore durante getPlayersFromFutDB:', err.message);
    return [];
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

  const allPlayers = await getPlayersFromFutDB(100);
  if (allPlayers.length === 0) return m.reply(`😢 Nessun giocatore trovato.`);

  const cards = [];
  for (let i = 0; i < 3; i++) {
    const p = allPlayers[Math.floor(Math.random() * allPlayers.length)];
    cards.push(p);
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
      `📍 ${best.position} | ${best.club} | ${best.nation}` +
      statText +
      `\n\n📦 Pacchetti rimasti: ${data.fifaInventory.base}`
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
