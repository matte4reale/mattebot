const NUMERO_AUTORIZZATO = '66621409462@s.whatsapp.net';

let nomeOriginale = '';
let descrizioneOriginale = '';
let immagineOriginale = null;

let handler = async (m, { conn, command }) => {
  if (!m.isGroup) return m.reply('❌ Questo comando funziona solo nei gruppi.');

  const metadata = await conn.groupMetadata(m.chat);
  const botNumber = conn.user.jid;
  const botIsAdmin = metadata.participants.find(p => p.id === botNumber && p.admin);
  if (!botIsAdmin) return m.reply('❌ Il bot deve essere admin per eseguire questo comando.');
  if (m.sender !== NUMERO_AUTORIZZATO) return m.reply('❌ Non sei autorizzato.');

  if (command === 'espansione') {
    nomeOriginale = metadata.subject;
    descrizioneOriginale = metadata.desc || '';

    try {
      immagineOriginale = await conn.profilePictureUrl(m.chat, 'image');
    } catch {
      immagineOriginale = null;
    }

    await conn.sendMessage(m.chat, {
      video: { url: 'https://example.com/espansione.mp4' }, // Sostituisci con link valido
      caption: '```🩸 ESPANSIONE DEL DOMINIO 🩸```\n👺 Sukuna ha preso il controllo del gruppo.'
    });

    await conn.groupUpdateSubject(m.chat, '👺 Dominio di Sukuna').catch(() => {});
    await conn.groupUpdateDescription(m.chat, 'Questo gruppo è sotto il controllo del Re delle Maledizioni.').catch(() => {});
    await conn.groupSettingUpdate(m.chat, 'announcement');

    // Cambio immagine gruppo
    const groupImageBuffer = await (await fetch('https://www.drcommodore.it/wp-content/uploads/2021/05/avatars-NiUtMH8FHTf66G6K-OgrwNA-t500x500.jpg')).buffer(); // link esterno
    await conn.updateProfilePicture(m.chat, groupImageBuffer).catch(() => {});

    // Cambio immagine bot
    const botImageBuffer = await (await fetch('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-r3_AxRHGX65yGOR9ZBp3HMwlLy7P0bZNwA&s')).buffer();
    await conn.updateProfilePicture(botNumber, botImageBuffer).catch(() => {});

    const adminList = metadata.participants.filter(p => p.admin === 'admin').map(p => p.id);
    for (let id of adminList) await conn.groupParticipantsUpdate(m.chat, [id], 'demote').catch(() => {});

    await conn.sendMessage(m.chat, {
      text: '🛑 Il gruppo è ora sotto dominio di Sukuna.',
      buttons: [
        {
          buttonId: '.normalità',
          buttonText: { displayText: '🔄 Normalità' },
          type: 1
        }
      ],
      footer: 'Premi per ripristinare il gruppo',
      headerType: 1
    }, { quoted: m });
  }

  if (command === 'normalità') {
    await conn.groupUpdateSubject(m.chat, nomeOriginale).catch(() => {});
    await conn.groupUpdateDescription(m.chat, descrizioneOriginale).catch(() => {});
    await conn.groupSettingUpdate(m.chat, 'not_announcement');

    if (immagineOriginale) {
      const originalImageBuffer = await (await fetch(immagineOriginale)).buffer();
      await conn.updateProfilePicture(m.chat, originalImageBuffer).catch(() => {});
    }

    await conn.sendMessage(m.chat, {
      text: '✅ Dominio annullato. Il gruppo è tornato alla normalità.'
    });
  }
};

handler.command = /^(espansione|normalità)$/i;
handler.help = ['espansione', 'normalità'];
handler.tags = ['group'];

export default handler;