 import fs from 'fs';

const sourcesPath = './plugins/news_sources.json'; let categories = {}; try { categories = JSON.parse(fs.readFileSync(sourcesPath, 'utf8')); } catch (e) { console.error('Errore nel caricamento delle fonti:', e.message); categories = {}; }

let handler = async (m, { conn }) => { const buttons = Object.keys(categories).map(cat => ({ buttonId: .selectNews ${cat}, buttonText: { displayText: cat.charAt(0).toUpperCase() + cat.slice(1) }, type: 1 })); if (!buttons.length) return m.reply('❌ Nessuna categoria disponibile.');

await conn.sendMessage(m.chat, { text: '📡 Seleziona la categoria di news:', footer: 'Notiziario Generale', buttons, headerType: 1 }, { quoted: m }); };

handler.command = /^notiziario$/i; export default handler;

