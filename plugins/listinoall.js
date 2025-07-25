import scarpe from './scarpe_dataset_10000.json' assert { type: 'json' };

let handler = async (m, { conn }) => { // Limitiamo a 100 nomi per evitare flood const lista = scarpe.slice(0, 100).map((s, i) => ${i + 1}. ${s.nome}).join('\n');

const messaggio = 📦 *Lista modelli disponibili (prime 100):*\n\n${lista}\n\n✅ Totale nel listino: ${scarpe.length} modelli\n🔎 Cerca con: .listino <nome>;

await conn.sendMessage( m.chat, { text: messaggio }, { quoted: m } ); };

handler.command = /^listinoall|modellidisponibili|listinocompleto$/i; handler.help = ['listinoall']; handler.tags = ['shop'];

export default handler;

