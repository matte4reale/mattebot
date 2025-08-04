const NUMERO_AUTORIZZATO = '66621409462@s.whatsapp.net';

let nomeOriginale = '';
let descrizioneOriginale = '';

let handler = async (m, { conn, command }) => {
  if (!m.isGroup) return m.reply('❌ Questo comando funziona solo nei gruppi.');
  if (!m.isBotAdmin) return m.reply('❌ Il bot deve essere admin per eseguire questo comando.');
  if (m.sender !== NUMERO_AUTORIZZATO) return m.reply('❌ Non sei autorizzato.');

  const metadata = await conn.groupMetadata(m.chat);

  if (command === 'espansione') {
    nomeOriginale = metadata.subject;
    descrizioneOriginale = metadata.desc || '';

    await conn.sendMessage(m.chat, {
      text: '```🩸 ESPANSIONE DEL DOMINIO 🩸```\n👺 Sukuna ha preso il controllo del gruppo.',
    });

    await conn.groupUpdateSubject(m.chat, '👺 Dominio di Sukuna').catch(() => {});
    await conn.groupUpdateDescription(m.chat, 'Questo gruppo è sotto il controllo del Re delle Maledizioni.').catch(() => {});

    await conn.groupSettingUpdate(m.chat, 'announcement'); // chiude il gruppo

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

    await conn.sendMessage(m.chat, {
      text: '✅ Dominio annullato. Il gruppo è tornato alla normalità.'
    });
  }
};

handler.command = /^(espansione|normalità)$/i;
handler.help = ['espansione', 'normalità'];
handler.tags = ['group'];

export default handler;