import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Stato animazione per chat
const activeLoops = new Map();

const cornici = [
  ['╔══', '══╗', '╚══', '══╝'],
  ['▛▀▀', '▀▀▜', '▙▄▄', '▄▄▟'],
  ['█▓▒', '▒▓█', '█▓▒', '▒▓█'],
  ['▌▌▌', '▌▌▌', '▌▌▌', '▌▌▌'],
  ['『', '』', '『', '』'],
  ['【', '】', '【', '】'],
  ['⎡', '⎤', '⎣', '⎦']
];

const handler = async (m, { conn, command, usedPrefix }) => {
  const chatId = m.chat;

  if (command === 'menu') {
    if (activeLoops.has(chatId)) {
      return conn.sendMessage(chatId, { text: '⚠️ Animazione già in corso. Usa *.stopmenu* per fermarla.' });
    }

    const userCount = Object.keys(global.db.data.users || {}).length;
    activeLoops.set(chatId, true);
    animateMenu(conn, chatId, usedPrefix, userCount);
  }

  if (command === 'stopmenu') {
    if (!activeLoops.has(chatId)) {
      return conn.sendMessage(chatId, { text: '⚠️ Nessuna animazione attiva.' });
    }

    activeLoops.delete(chatId);
    return conn.sendMessage(chatId, { text: '🛑 Animazione fermata con successo.' });
  }
};

export default handler;

handler.command = /^(menu|comandi|stopmenu)$/i;
handler.tags = ['menu'];
handler.help = ['menu', 'stopmenu'];

async function animateMenu(conn, chat, prefix, userCount) {
  let i = 0;

  while (activeLoops.get(chat)) {
    const [tl, tr, bl, br] = cornici[i % cornici.length];
    const version = 'v7.0-dark';

    const text = `
${tl}『 𖤐 𝙍𝙊𝙎𝙀 𝘽𝙊𝙏 𖤐 』${tr}

🕷️ 𝔐𝔢𝔫𝔲 𝔇𝔞𝔯𝔨 𝔡𝔢𝔦 ℭ𝔬𝔪𝔞𝔫𝔡𝔦 🕷️

⚔️ ${prefix}staff
🕯️ ${prefix}egemonia
📜 ${prefix}candidati
🕷️ ${prefix}installa
📖 ${prefix}guida
⚙️ ${prefix}sistema
❓ ${prefix}faq
🚀 ${prefix}ping
📝 ${prefix}segnala <comando>
💡 ${prefix}consiglia <comando>

╠═══[ ℹ️ 𝘋𝘈𝘛𝘐 ]═══╣
• 𝘝𝘦𝘳𝘴𝘪𝘰𝘯𝘦: ${version}
• 𝘜𝘵𝘦𝘯𝘵𝘪: ${userCount}
• 𝘊𝘰𝘭𝘭𝘢𝘣: 𝘋𝘙𝘎𝘉
• 𝘚𝘶𝘱𝘱𝘰𝘳𝘵𝘰: .supporto

${bl}═════════════════${br}
    `.trim();

    await conn.sendMessage(chat, {
      text,
      footer: '🕷️ Tocca un bottone per fermare o cambiare sezione.',
      buttons: [
        { buttonId: `${prefix}menuadmin`, buttonText: { displayText: "🛡️ Menu Admin" }, type: 1 },
        { buttonId: `${prefix}menuowner`, buttonText: { displayText: "👑 Menu Owner" }, type: 1 },
        { buttonId: `${prefix}menuia`, buttonText: { displayText: "🤖 Menu IA" }, type: 1 },
        { buttonId: `${prefix}stopmenu`, buttonText: { displayText: "🛑 Ferma Animazione" }, type: 1 }
      ],
      viewOnce: true
    });

    await delay(3000); // 3 secondi
    i++;
  }
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
