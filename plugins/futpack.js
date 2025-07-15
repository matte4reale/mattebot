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

  // Lista di giocatori base per test – puoi ampliarla
  const players = [
    {
      name: "Lionel Messi",
      rating: 91,
      position: "RW",
      nation: "Argentina",
      club: "Inter Miami",
      pace: 85,
      shooting: 89,
      passing: 91,
      dribbling: 94,
      defending: 34,
      physical: 65,
      cardType: "gold"
    },
    {
      name: "Kylian Mbappe",
      rating: 91,
      position: "ST",
      nation: "France",
      club: "Paris SG",
      pace: 97,
      shooting: 88,
      passing: 80,
      dribbling: 92,
      defending: 36,
      physical: 76,
      cardType: "gold"
    },
    {
      name: "Erling Haaland",
      rating: 91,
      position: "ST",
      nation: "Norway",
      club: "Man City",
      pace: 89,
      shooting: 93,
      passing: 65,
      dribbling: 80,
      defending: 45,
      physical: 88,
      cardType: "gold"
    }
    // Aggiungi altri come preferisci
  ];

  const cards = [];
  for (let i = 0; i < 3; i++) {
    const p = players[Math.floor(Math.random() * players.length)];
    cards.push(p);
  }

  const best = [...cards].sort((a, b) => b.rating - a.rating)[0];

  // Genera l’URL dell’immagine della carta
  const query = new URLSearchParams({
    name: best.name,
    rating: best.rating,
    position: best.position,
    nation: best.nation,
    club: best.club,
    pace: best.pace,
    shooting: best.shooting,
    passing: best.passing,
    dribbling: best.dribbling,
    defending: best.defending,
    physical: best.physical,
    cardType: best.cardType
  });

  const imageUrl = `https://futcards.com/custom-card.png?${query.toString()}`;

  // Invia la carta principale con immagine
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
