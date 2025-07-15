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

  // Giocatori predefiniti con ID Sofifa valido
  const players = [
    {
      id: '239/085', // Haaland
      name: 'Erling Haaland',
      rating: 91,
      position: 'ST',
      nation: 'Norvegia',
      club: 'Man City'
    },
    {
      id: '231/747', // Mbappé
      name: 'Kylian Mbappé',
      rating: 91,
      position: 'ST',
      nation: 'Francia',
      club: 'Paris SG'
    },
    {
      id: '158/023', // Messi
      name: 'Lionel Messi',
      rating: 90,
      position: 'RW',
      nation: 'Argentina',
      club: 'Inter Miami'
    },
    {
      id: '192/985', // De Bruyne
      name: 'Kevin De Bruyne',
      rating: 91,
      position: 'CAM',
      nation: 'Belgio',
      club: 'Man City'
    },
    {
      id: '190/871', // Lewandowski
      name: 'Robert Lewandowski',
      rating: 91,
      position: 'ST',
      nation: 'Polonia',
      club: 'Barcelona'
    },
    {
      id: '203/376', // Van Dijk
      name: 'Virgil van Dijk',
      rating: 89,
      position: 'CB',
      nation: 'Olanda',
      club: 'Liverpool'
    },
    {
      id: '209/331', // Oblak
      name: 'Jan Oblak',
      rating: 89,
      position: 'GK',
      nation: 'Slovenia',
      club: 'Atlético Madrid'
    }
  ];

  // Pesca 3 giocatori casuali
  const cards = [];
  for (let i = 0; i < 3; i++) {
    const p = players[Math.floor(Math.random() * players.length)];
    cards.push(p);
  }

  const best = [...cards].sort((a, b) => b.rating - a.rating)[0];
  const imageUrl = `https://cdn.sofifa.net/players/${best.id}/24_120.png`;

  // Invia la carta più forte
  await conn.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption:
      `🎉 *${best.name}* (${best.rating}⭐)\n` +
      `📍 ${best.position} | ${best.club} | ${best.nation}\n\n` +
      `📦 Pacchetti rimasti: ${data.fifaInventory.base}`
  }, { quoted: m });

  // Invia anche gli altri due
  for (let i = 1; i < cards.length; i++) {
    await conn.sendMessage(m.chat, {
      text: `➕ ${cards[i].name} (${cards[i].rating}⭐)`
    }, { quoted: m });
  }

  // Salva i giocatori trovati
  data.fifaPlayers = data.fifaPlayers || [];
  data.fifaPlayers.push(...cards);
};

handler.command = /^futpack$/i;
handler.tags = ['fifa'];
handler.help = ['futpack'];

export default handler;
