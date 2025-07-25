import fetch from 'node-fetch';

let handler = async (m, { args, conn }) => {
  const query = args.join(' ');
  const res = await fetch(`https://sneakerapi-app.herokuapp.com/api?sneaker=${encodeURIComponent(query)}`);
  const arr = await res.json();

  if (!arr.length) return m.reply('❌ Nessuna scarpa trovata.');

  const s = arr[0];
  const msg = `👟 *${s.name}*\n💸 Prezzo retail: $${s.retail_price}\n🎨 Release: ${s.release_date}`;
  await conn.sendMessage(m.chat, {
    image: { url: s.image },
    caption: msg
  }, { quoted: m });
};

handler.command = /^listino$/i;
export default handler;