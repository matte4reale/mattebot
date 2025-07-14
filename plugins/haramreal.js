let handler = async (m, { conn, args, command }) => {
  if (!m.isGroup) return m.reply('❌ Questo comando può essere usato solo in un gruppo.');
  if (!m.isGroupAdmin) return m.reply('❌ Solo gli admin possono usare questo comando.');

  const chat = global.db.data.chats[m.chat] || {};

  switch (command) {
    case 'backup': {
      const metadata = await conn.groupMetadata(m.chat);
      const membri = metadata.participants.map(p => p.id);
      chat.backupMembri = membri;

      m.reply(`✅ ${membri.length} membri sono stati salvati in backup.`);
      break;
    }

    case 'haram': {
      const metadata = await conn.groupMetadata(m.chat);
      const membriAttuali = metadata.participants.filter(p => p.id !== conn.user.jid);
      const gruppoBackup = chat.gruppoBackup;
      const membriSalvati = chat.backupMembri || [];

      if (!gruppoBackup) return m.reply('⚠️ Nessun gruppo di backup è stato settato con `.setgrupponuovo`.');
      if (membriAttuali.length > 1) return m.reply('👥 Il gruppo non è vuoto.');

      try {
        const owner = metadata.owner || m.sender;
        const codice = await conn.groupInviteCode(gruppoBackup);

        await conn.sendMessage(owner, {
          text: `🚨 *GRUPPO SVUOTATO*\n\n📤 Link nuovo gruppo:\n🔗 https://chat.whatsapp.com/${codice}\n\n👥 Membri salvati:\n${membriSalvati.map(u => `• @${u.split('@')[0]}`).join('\n')}`,
          mentions: membriSalvati
        });

        await conn.sendMessage(m.chat, { text: `📦 Backup inviato in privato all'owner.` });
      } catch (e) {
        console.error(e);
        m.reply('❌ Errore durante l\'invio del backup.');
      }
      break;
    }

    case 'setgrupponuovo': {
      if (args.length === 0) return m.reply('📌 Usa: `.setgrupponuovo [ID_gruppo]`\n\n💡 Esempio: `.setgrupponuovo 1203630xxxx@g.us`');

      const nuovoGruppo = args[0];
      if (!nuovoGruppo.endsWith('@g.us')) return m.reply('❌ L\'ID del gruppo non è valido.');

      chat.gruppoBackup = nuovoGruppo;
      m.reply(`✅ Gruppo di backup impostato:\n🆔 ${nuovoGruppo}`);
      break;
    }
  }

  global.db.data.chats[m.chat] = chat;
};

handler.help = ['backup', 'haram', 'setgrupponuovo'];
handler.tags = ['group'];
handler.command = /^(backup|haram|setgrupponuovo)$/i;
handler.group = true;
handler.admin = true;

export default handler;
