import fetch from 'node-fetch';

async function getFifaPlayers() {
  const url = 'https://www.easports.com/fifa/ultimate-team/api/fc-players?json=true&page=1';
  const res = await fetch(url);

  if (!res.ok) {
    console.error('Errore API EA:', res.statusText);
    return [];
  }

  const json = await res.json();
  const players = json.items || [];

  // Filtro base (puoi personalizzare i valori)
  return players
    .filter(p => p.rating >= 80)
    .map(p => ({
      name: `${p.firstName} ${p.lastName}`,
      rating: p.rating,
      nation: p.nationName,
      club: p.club.name,
      position: p.position,
      image: `https://futhead.cursecdn.com/static/img/14/players/${p.id}.png`
    }));
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
    cards.push(p);
  }

  const best = [...cards].sort((a, b) => b.rating - a.rating)[0];

  await conn.sendMessage(m.chat, {
    image: { url: best.image },
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
