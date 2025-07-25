import fs from 'fs';

let handler = async (m, { conn }) => {
  const raw = fs.readFileSync('./plugins/scarpe_dataset_10000.json');
  const scarpe = JSON.parse(raw);

  const lista = scarpe.slice(0, 100).map((s, i) => `${i + 1}. ${s.nome}`).join('\n');

  const messaggio = `📦 *Lista modelli disponibili (prime 100):*\n\n${lista}\n\n✅ Totale nel listino: ${scarpe.length} modelli\n🔎 Cerca con: .listino <nome>`;

  await conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });
};

handler.command = /^listinoall|modellidisponibili|listinocompleto$/i;
handler.help = ['listinoall'];
handler.tags = ['shop'];

export default handler;