import fs from 'fs';

const players = JSON.parse(fs.readFileSync('./plugins/fifaPlayers_packs.json', 'utf-8'));

let handler = async (m, { conn, command, args }) => {
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];
  data.fifaInventory = data.fifaInventory || { bronze: 0, silver: 0, gold: 0 };
  data.fifaPlayers = data.fifaPlayers || [];
  data.hollycash = data.hollycash || 0;

  const prices = { bronze: 100, silver: 300, gold: 800 };

  if (command === 'fut') {
    const txt =
      `💼 *Inventario FUT:*\n\n` +
      `🥉 Bronze: ${data.fifaInventory.bronze}\n` +
      `🥈 Silver: ${data.fifaInventory.silver}\n` +
      `🥇 Gold: ${data.fifaInventory.gold}\n\n` +
      `💸 Holly Cash: ${data.hollycash}\n\n` +
      `🎁 Scegli un pacchetto da aprire 👇`;

    return conn.sendMessage(m.chat, {
      text: txt,
      footer: 'Holly FUT Bot ⚽',
      buttons: [
        { buttonId: '.open bronze', buttonText: { displayText: '🥉 Apri Bronze' }, type: 1 },
        { buttonId: '.open silver', buttonText: { displayText: '🥈 Apri Silver' }, type: 1 },
        { buttonId: '.open gold', buttonText: { displayText: '🥇 Apri Gold' }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m });
  }

  if (command === 'futstore') {
    const txt =
      `🛒 *FUT Store*\n\n` +
      `🥉 Bronze - ${prices.bronze} 💸\n` +
      `🥈 Silver - ${prices.silver} 💸\n` +
      `🥇 Gold - ${prices.gold} 💸\n\n` +
      `💸 Saldo: ${data.hollycash} Holly Cash\n\n` +
      `📦 Scegli un pacchetto da acquistare 👇`;

    return conn.sendMessage(m.chat, {
      text: txt,
      footer: 'Compra con Holly Cash ⚽',
      buttons: [
        { buttonId: '.futbuy bronze', buttonText: { displayText: '🥉 Compra Bronze' }, type: 1 },
        { buttonId: '.futbuy silver', buttonText: { displayText: '🥈 Compra Silver' }, type: 1 },
        { buttonId: '.futbuy gold', buttonText: { displayText: '🥇 Compra Gold' }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m });
  }

  if (command === 'futbuy') {
    const type = args[0]?.toLowerCase();
    if (!['bronze', 'silver', 'gold'].includes(type)) {
      return m.reply('❌ Usa: .futbuy bronze/silver/gold');
    }

    const price = prices[type];
    if (data.hollycash < price) {
      return m.reply(`❌ Ti servono ${price} Holly Cash 💸 per comprare un pacchetto *${type.toUpperCase()}*`);
    }

    data.hollycash -= price;
    data.fifaInventory[type]++;

    return m.reply(`✅ Hai comprato un pacchetto *${type.toUpperCase()}*!\n📦 Ora ne hai: ${data.fifaInventory[type]}`);
  }

  if (command === 'open') {
    const type = args[0]?.toLowerCase();
    if (!['bronze', 'silver', 'gold'].includes(type)) {
      return m.reply('❌ Specifica un tipo: .open bronze / silver / gold');
    }

    if (data.fifaInventory[type] <= 0) {
      return m.reply(`❌ Non hai pacchetti *${type.toUpperCase()}* da aprire.`);
    }

    data.fifaInventory[type]--;

    await conn.sendMessage(m.chat, {
      text: `🎉 Aprendo pacchetto *${type.toUpperCase()}*...`
    }, { quoted: m });

    const filtered = players.filter(p => p.pack === type);
    const cards = Array.from({ length: 3 }, () => filtered[Math.floor(Math.random() * filtered.length)]);
    const best = [...cards].sort((a, b) => b.rating - a.rating)[0];

    await conn.sendMessage(m.chat, {
      image: { url: best.image },
      caption: `🌟 *${best.name}* (${best.rating}⭐)\n📍 ${best.position} | ${best.club} | ${best.nation}`
    }, { quoted: m });

    for (let i = 1; i < cards.length; i++) {
      await conn.sendMessage(m.chat, {
        text: `➕ ${cards[i].name} (${cards[i].rating}⭐)`
      }, { quoted: m });
    }

    data.fifaPlayers.push(...cards);
  }
};

handler.command = /^(fut|open|futbuy|futstore)$/i;
handler.tags = ['fifa'];
handler.help = ['fut', 'open <bronze|silver|gold>', 'futbuy <bronze|silver|gold>', 'futstore'];

export default handler;
