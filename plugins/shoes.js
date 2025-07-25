import fs from 'fs';

let scarpe = [];

try { const raw = fs.readFileSync('./plugins/scarpe_dataset_50000.json'); scarpe = JSON.parse(raw); console.log('✅ Scarpe caricate. Esempi:', scarpe.slice(0, 5).map(s => s.nome)); } catch (e) { console.error('❌ Errore caricamento JSON:', e.message); }

let handler = async (m, { args, conn, command }) => { if (!args.length) return m.reply('Scrivi il nome della scarpa.\nEsempio: .listino jordan 4 thunder');

const query = args.join(' ').toLowerCase();

const scarpa = scarpe.find(s => { const nome = s.nome?.toLowerCase() || ''; const modello = s.modello?.toLowerCase() || ''; const sku = s.sku?.toLowerCase() || ''; return nome.includes(query) || modello.includes(query) || sku.includes(query); });

if (!scarpa) { return m.reply('❌ Scarpa non trovata nel listino. Puoi usare .listinoall per vedere i modelli disponibili.'); }

const messaggio = 👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo medio: ${scarpa.prezzo} $\n🔗 ${scarpa.link};

if (scarpa.immagine && scarpa.immagine.startsWith('http')) { return conn.sendMessage( m.chat, { image: { url: scarpa.immagine }, caption: messaggio }, { quoted: m } ); } else { return m.reply(messaggio); } };

handler.command = /^listino$/i; handler.help = ['listino <modello>']; handler.tags = ['shop'];

export default handler;

