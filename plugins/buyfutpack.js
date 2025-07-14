let handler = async (m, { conn, args }) => {
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  data.money = data.money || 0;
  data.fifaInventory = data.fifaInventory || { base: 0, rare: 0 };

  const type = args[0]?.toLowerCase();

  const packPrices = {
    base: 200,
    rare: 500
  };

  if (!['base', 'rare'].includes(type)) {
    return m.reply(`❌ Specifica il tipo di pacchetto: *base* o *rare*\nEsempio: *.buyfutpack base*`);
  }

  const cost = packPrices[type];
  if (data.money < cost) {
    return m.reply(`⛔ Non hai abbastanza soldi. Ti servono ${cost}💰.`);
  }

  data.money -= cost;
  data.fifaInventory[type] = (data.fifaInventory[type] || 0) + 1;

  m.reply(`✅ Hai comprato 1 pacchetto *${type.toUpperCase()}*!\n💸 Saldo attuale: ${data.money}💰`);
};

handler.command = /^buyfutpack$/i;
handler.help = ['buyfutpack <base|rare>'];
handler.tags = ['fifa'];

export default handler;
