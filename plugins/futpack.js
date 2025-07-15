import fetch from 'node-fetch';

const FUTDB_API_KEY = 'cb8ba931-bbc7-8413-5a51-fb3c0c382c22'; // 🔑 Sostituisci con la tua chiave API FutDatabase

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
    console.log('[DEBUG] Giocatori ricevuti:', json.items?.length || 0);

    return (json.items || []).map(p => ({
      id: p.id,
      name: p.name,
      rating: p.rating,
      nation: p.nation?.name || 'Sconosciuta',
      club: p.club?.name || 'Sconosciuto',
      position: p.position,
      image: p.image,
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
  try {
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
    if (allPlayers.length === 0) {
      return m.reply(`😢 Nessun giocatore trovato. Controlla la tua API key o la connessione.`);
    }

    const cards = [];
    for (let i = 0; i < 3; i++) {
      const p = allPlayers[Math.floor(Math.random() * allPlayers.length)];
      cards.push(p);
    }

    const best = [...cards].sort((a, b) => b.rating - a.rating)[0];

    const imageUrl = best.image && best.image.startsWith('http')
      ? best.image
      : `https://futhead.cursecdn.com/static/img/14/players/${best.id}.png`;

    let statText = '';
    if (best.stats) {
      statText =
        `📊 *Statistiche*\n` +
        `🚀 Velocità: ${best.stats.pace}\n` +
        `🎯 Tiro: ${best.stats.shooting}\n` +
        `🎨 Passaggi: ${best.stats.passing}\n` +
        `🤹‍♂️ Dribbling: ${best.stats.dribbling}\n` +
        `🛡️ Difesa: ${best.stats.defending}\n` +
        `💪 Fisico: ${best.stats.physicality}\n`;
    }

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption:
        `🎉 *${best.name}* (${best.rating}⭐)\n` +
        `📍 ${best.position} | ${best.club} | ${best.nation}\n\n` +
        statText +
        `📦 Pacchetti rimasti: ${data.fifaInventory.base}`
    }, { quoted: m });

    for (let i = 1; i < cards.length; i++) {
      await conn.sendMessage(m.chat, {
        text: `➕ ${cards[i].name} (${cards[i].rating}⭐)`
      }, { quoted: m });
    }

    data.fifaPlayers = data.fifaPlayers || [];
    data.fifaPlayers.push(...cards);

  } catch (err) {
    console.error('❌ Errore nel comando futpack:', err);
    m.reply('⚠️ Errore durante apertura pacchetto. Riprova più tardi.');
  }
};

handler.command = /^futpack$/i;
handler.tags = ['fifa'];
handler.help = ['futpack'];

export default handler;
