import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  // Ottieni utente menzionato o citato o autore del messaggio
  let user = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

  // Ottieni nome visibile
  let name = await conn.getName(user);
  let randomPercent = Math.floor(Math.random() * 100) + 1; // 1-100

  // Ottieni foto profilo
  let avatarUrl;
  try {
    avatarUrl = await conn.profilePictureUrl(user, 'image');
  } catch {
    avatarUrl = 'https://telegra.ph/file/6880771a42bad09dd6087.jpg'; // fallback
  }

  // Componi URL API
  const apiUrl = `https://api.siputzx.my.id/api/canvas/gay?nama=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatarUrl)}&num=${randomPercent}`;

  try {
    // Richiesta all'API
    const response = await axios.get(apiUrl, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(response.data, 'binary');

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `🌈 @${user.split('@')[0]} è gay al ${randomPercent}% 🏳️‍🌈`,
      mentions: [user],
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    return m.reply('❌ Errore durante la generazione dell\'immagine. Controlla se l\'avatar è valido.');
  }
};

handler.help = ['gay @utente'];
handler.tags = ['fun'];
handler.command = /^gayy$/i;

export default handler;