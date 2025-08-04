let nomeOriginale = '';
let descrizioneOriginale = '';

let handler = async (m, { conn, command }) => {
  if (!m.isGroup) return m.reply('❌ Questo comando funziona solo nei gruppi.');

  const metadata = await conn.groupMetadata(m.chat);
  const botNumber = conn.user.jid;
  const botIsAdmin = metadata.participants.find(p => p.id === botNumber && p.admin);
  if (!botIsAdmin) return m.reply('❌ Il bot deve essere admin per eseguire questo comando.');

  if (command === 'espansione') {
    nomeOriginale = metadata.subject;
    descrizioneOriginale = metadata.desc || '';

    await conn.sendMessage(m.chat, {
      image: { url: 'https://images2.alphacoders.com/132/1320311.jpeg' },
      caption: '```🩸 ESPANSIONE DEL DOMINIO 🩸```\n👺 Sukuna ha preso il controllo del gruppo.'
    });

    await conn.groupUpdateSubject(m.chat, '👺 Dominio di Sukuna').catch(() => {});
    await conn.groupUpdateDescription(m.chat, 'Questo gruppo è sotto il controllo del Re delle Maledizioni.').catch(() => {});
    await conn.groupSettingUpdate(m.chat, 'announcement');

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
    if (nomeOriginale) await conn.groupUpdateSubject(m.chat, nomeOriginale).catch(() => {});
    if (descrizioneOriginale) await conn.groupUpdateDescription(m.chat, descrizioneOriginale).catch(() => {});
    await conn.groupSettingUpdate(m.chat, 'not_announcement');

    await conn.sendMessage(m.chat, {
      image: { url: 'https://i.pinimg.com/originals/2d/2a/63/2d2a63ffce0e88c6236d543b729c52da.jpg' },
      caption: '✅ Dominio annullato. Il gruppo è tornato alla normalità.'
    });
  }
};

handler.command = /^(espansione|normalità)$/i;
handler.help = ['espansione', 'normalità'];
handler.tags = ['group'];

export default handler;