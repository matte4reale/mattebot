import fs from 'fs';

let scarpe = [];

try { const raw = fs.readFileSync('./plugins/scarpe_dataset_10000.json'); scarpe = JSON.parse(raw); console.log('✅ Scarpe caricate. Esempi:', scarpe.slice(0, 5).map(s => s.nome)); } catch (e) { console.error('❌ Errore caricamento JSON:', e.message); }

const normalize = str => (str || '') .toLowerCase() .replace(/#\d+/g, '') .replace(/[^a-z0-9 ]/g, '') .trim();

let handler = async (m, { args, conn, command }) => { if (command === 'listinoall') { if (!scarpe.length) return m.reply('⚠️ Nessun modello disponibile. Controlla il file JSON.');

const lista = scarpe.slice(0, 100).map((s, i) => `${i + 1}. ${s.nome}`).join('\n');

const messaggio = `📦 *Lista modelli cercabili (prime 100):*\n\n${lista}\n\n✅ Totale nel listino: ${scarpe.length} modelli\n🔎 Cerca con: .listino <nome da sopra>`;

return conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });

}

if (!args.length) return m.reply('❗ Scrivi il nome di una scarpa.\nEsempio: .listino adidas campus');

const queryWords = normalize(args.join(' ')).split(' ');

const scarpa = scarpe.find(s => { const nome = normalize(s.nome); const sku = (s.sku || '').toLowerCase(); return queryWords.every(word => nome.includes(word)) || sku.includes(queryWords.join('')); });

if (!scarpa) { return m.reply('🔍 Nessuna scarpa trovata nel listino.\nPuoi usare .listinoall per vedere i nomi disponibili.'); }

const messaggio = 👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku || 'N/A'}\n💸 Prezzo: ${scarpa.prezzo || 'N/A'} $\n🔗 Link: ${scarpa.link || 'Nessun link'};

if (scarpa.immagine && scarpa.immagine.startsWith('http')) { return conn.sendMessage( m.chat, { image: { url: scarpa.immagine }, caption: messaggio }, { quoted: m } ); } else { return m.reply(messaggio); } };

handler.command = /^(listino|listinoall)$/i; handler.help = ['listino <modello>', 'listinoall']; handler.tags = ['shop'];

export default handler;

