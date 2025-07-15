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

  const allPlayers = [
    {
      id: '239/085',
      name: 'Erling Haaland',
      rating: 91,
      nation: 'Norvegia',
      club: 'Man City',
      position: 'ST'
    },
    {
      id: '231/747',
      name: 'Kylian Mbappé',
      rating: 91,
      nation: 'Francia',
      club: 'Paris SG',
      position: 'ST'
    },
    {
      id: '158/023',
      name: 'Lionel Messi',
      rating: 90,
      nation: 'Argentina',
      club: 'Inter Miami',
      position: 'RW'
    },
    {
      id: '192/985',
      name: 'Kevin De Bruyne',
      rating: 91,
      nation: 'Belgio',
      club: 'Man City',
      position: 'CAM'
    },
    {
      id: '203/376',
      name: 'Virgil van Dijk',
      rating: 89,
      nation: 'Olanda',
      club: 'Liverpool',
      position: 'CB'
    },
    {
      id: '209/331',
      name: 'Jan Oblak',
      rating: 89,
      nation: 'Slovenia',
      club: 'Atlético Madrid',
      position: 'GK'
    },
    {
      id: '190/871',
      name: 'Robert Lewandowski',
      rating: 91,
      nation: 'Polonia',
      club: 'Barcelona',
      position: 'ST'
    }
    // Puoi aggiungere altri giocatori con id Sofifa validi
  ];

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
