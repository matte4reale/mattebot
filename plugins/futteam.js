import fs from 'fs';
import path from 'path';
const playersPath = path.join(process.cwd(), './plugins/rosa_players.json');

let handler = async (m, { conn, usedPrefix, command }) => {
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  if (command === 'savefutteam') {
    // Salva rosa
    if (!data.fifaPlayers || data.fifaPlayers.length < 11) {
      return m.reply('❌ Ti servono almeno 11 giocatori per salvare una rosa.');
    }
    const top11 = [...data.fifaPlayers].sort((a, b) => b.rating - a.rating).slice(0, 11);
    data.fifaSquad = top11;
    return m.reply('✅ Rosa salvata con successo!');
  }

  // Comando: /futteam
  if (!data.fifaPlayers || data.fifaPlayers.length < 1) {
    return m.reply('❌ Non hai ancora nessun giocatore! Usa *futopen* per aprire pacchetti.');
  }

  let fullList = [];
  try {
    fullList = JSON.parse(fs.readFileSync(playersPath));
  } catch (e) {
    return m.reply('⚠️ Errore nel caricamento dei dati dei giocatori.');
  }

  const sorted = [...data.fifaPlayers].sort((a, b) => b.rating - a.rating).slice(0, 11);

  let squad = sorted.map((p, i) => {
    const full = fullList.find(j => j.name === p.name && j.rating === p.rating);
    if (!full) return `#${i + 1} - ${p.name} (${p.rating})`;

    return `🏷️ *${full.name}* (${full.rating})\n` +
           `📍 ${full.position} | ${full.team} | ${full.nationality}\n` +
           `📊 PAC: ${full.stat_pac} | SHO: ${full.stat_sho} | PAS: ${full.stat_pas}\n` +
           `🎯 DRI: ${full.stat_dri} | DEF: ${full.stat_def} | PHY: ${full.stat_phy}`;
  }).join('\n\n');

  await conn.sendMessage(m.chat, {
    text: `🏟️ *La tua rosa attuale* (top 11):\n\n${squad}`,
    buttons: [
      { buttonId: `${usedPrefix}savefutteam`, buttonText: { displayText: '💾 Salva Rosa' }, type: 1 }
    ],
    footer: 'FIFA Ultimate Team by HollyBot',
  }, { quoted: m });
};

handler.command = /^futteam|savefutteam$/i;
handler.help = ['futteam', 'savefutteam'];
handler.tags = ['fifa'];
export default handler;
