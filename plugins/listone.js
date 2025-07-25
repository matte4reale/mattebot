import fs from 'fs';

let scarpe = [];

try { const raw = fs.readFileSync('./plugins/scarpe_dataset_50000.json'); scarpe = JSON.parse(raw); console.log('✅ Scarpe caricate per listinoall.'); } catch (e) { console.error('❌ Errore caricamento JSON:', e.message); }

let handler = async (m, { args, conn }) => { const page = parseInt(args[0]) || 1; const perPage = 100; const start = (page - 1) * perPage; const end = start + perPage; const paginated = scarpe.slice(start, end);

if (!paginated.length) return m.reply('📭 Fine elenco. Nessun altro modello.');

const lista = paginated.map((s, i) => ${start + i + 1}. ${s.nome}).join('\n'); const messaggio = 📦 *Modelli (${start + 1} - ${Math.min(end, scarpe.length)} di ${scarpe.length}):*\n\n${lista};

const buttons = []; if (page > 1) { buttons.push({ buttonId: .listinoall ${page - 1}, buttonText: { displayText: '⬅️ Pagina Precedente' }, type: 1 }); } if (end < scarpe.length) { buttons.push({ buttonId: .listinoall ${page + 1}, buttonText: { displayText: '➡️ Pagina Successiva' }, type: 1 }); }

return conn.sendMessage(m.chat, { text: messaggio, buttons, footer: 'Nuove scarpe in arrivo 👟', headerType: 1 }, { quoted: m }); };

handler.command = /^listinoall$/i; handler.help = ['listinoall [pagina]']; handler.tags = ['shop'];

export default handler;

