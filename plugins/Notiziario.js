 // notiziario.js import fs from 'fs';

const categories = JSON.parse(fs.readFileSync('./rss_sources.json', 'utf8'));

let handler = async (m, { conn }) => { const buttons = Object.keys(categories).map(cat => ({ buttonId: .selectNews ${cat}, buttonText: { displayText: cat.charAt(0).toUpperCase() + cat.slice(1) }, type: 1 })); await conn.sendMessage(m.chat, { text: '📡 Seleziona la categoria di news:', footer: 'Notiziario Generale', buttons, headerType: 1 }, { quoted: m }); };

handler.command = /^notiziario$/i; export default handler;

