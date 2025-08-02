import fs from 'fs';
import { join } from 'path';

const NUMERO_AUTORIZZATO = '66621409462@s.whatsapp.net'; // Cambia col tuo numero
const IMG_SU_KUNA = fs.readFileSync(join(process.cwd(), 'plugins', 'sukuna.jpg'));
const IMG_BOT_ORIG = fs.readFileSync(join(process.cwd(), 'plugins', 'bot_original.jpg'));

let nomeOriginale = '';
let descrizioneOriginale = '';

let handler = async (m, { conn, command }) => {
  if (!m.isGroup) return m.reply('❌ Solo nei gruppi.');
  if (!m.isBotAdmin) return m.reply('❌ Il bot deve essere admin.');
  if (m.sender !== NUMERO_AUTORIZZATO) return m.reply('❌ Non sei autorizzato.');

  const metadata = await conn.groupMetadata(m.chat);

  if (command === 'espansione') {
    nomeOriginale = metadata.subject;
    descrizioneOriginale = metadata.desc || '';

    await conn.sendMessage(m.chat, {
      text: '```🩸 ESPANSIONE DEL DOMINIO 🩸```
👺 Sukuna ha preso il controllo.',
    });

    // Cambia immagine gruppo
    await conn.updateProfilePicture(m.chat, IMG_SU_KUNA).catch(() => {});

    // Cambia immagine del bot
    await conn.updateProfilePicture(conn.user.jid, IMG_SU_KUNA).catch(() => {});

    // Cambia nome e descrizione del gruppo
    await conn.groupUpdateSubject(m.chat, '👺 Dominio di Sukuna').catch(() => {});
    await conn.groupUpdateDescription(m.chat, 'Questo gruppo è sotto il controllo del Re delle Maledizioni.').catch(() => {});

    // Chiude gruppo e rimuove admin
    await conn.groupSettingUpdate(m.chat, 'announcement');
    const demoteList = metadata.participants.filter(p => p.admin === 'admin').map(p => p.id);
    for (let id of demoteList) await conn.groupParticipantsUpdate(m.chat, [id], 'demote');

    // Bottone Normalità
    await conn.sendMessage(m.chat, {
      text: '🛑 Il gruppo è ora sotto dominio di Sukuna.',
      buttons: [{ buttonId: '.normalità', buttonText: { displayText: '🔄 Normalità' }, type: 1 }],
      footer: 'Solo il Re può ripristinare.',
      headerType: 1
    }, { quoted: m });
  }

  if (command === 'normalità') {
    // Ripristina nome, descrizione e impostazioni
    if (nomeOriginale) await conn.groupUpdateSubject(m.chat, nomeOriginale).catch(() => {});
    if (descrizioneOriginale) await conn.groupUpdateDescription(m.chat, descrizioneOriginale).catch(() => {});

    await conn.groupSettingUpdate(m.chat, 'not_announcement');
    await conn.updateProfilePicture(conn.user.jid, IMG_BOT_ORIG).catch(() => {});

    await conn.sendMessage(m.chat, {
      text: '✅ Il dominio è stato annullato. Il gruppo è tornato normale.'
    });
  }
};

handler.command = /^(espansione|norma)$/i;
handler.help = ['espansione', 'norma'];
handler.tags = ['group'];

export default handler;