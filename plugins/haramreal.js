const numeriAutorizzati = [
  '393884769557', // <-- Sostituisci con i tuoi numeri (senza @s.whatsapp.net)
  '66621409462',
  global.owner?.[0]?.replace('@s.whatsapp.net', '') // aggiunge automaticamente l'owner
];

let handler = async (m, { conn, args, command }) => {
  const senderNumber = m.sender.split('@')[0];
  if (!numeriAutorizzati.includes(senderNumber)) return m.reply('🚫 Non sei autorizzato ad usare questo comando.');

  if (!m.isGroup) return m.reply('❌ Questo comando funziona solo nei gruppi.');

  const chat = global.db.data.chats[m.chat] || {};

  switch (command) {
    case 'backup': {
      const metadata = await conn.groupMetadata(m.chat);
      const membri = metadata.participants.map(p => p.id);
      chat.backupMembri = membri;

      m.reply(`✅ Backup salvato. Totale membri: ${membri.length}`);
      break;
    }

    case 'setgrupponuovo': {
      if (!args[0] || !args[0].endsWith('@g.us')) return m.reply('❌ Usa: `.setgrupponuovo 120xxxx@g.us`');
      chat.gruppoBackup = args[0];
      m.reply(`✅ Gruppo di backup impostato:\n🆔 ${args[0]}`);
      break;
    }

    case 'haram': {
      const metadata = await conn.groupMetadata(m.chat);
      const membriAttuali = metadata.participants.filter(p => p.id !== conn.user.jid);
      const gruppoBackup = chat.gruppoBackup;
      const membriSalvati = chat.backupMembri || [];

      if (!gruppoBackup) return m.reply('⚠️ Nessun gruppo di backup impostato.');
      if (membriAttuali.length > 1) return m.reply('👥 Il gruppo non è vuoto.');

      try {
        const codice = await conn.groupInviteCode(gruppoBackup);
        await conn.sendMessage(m.sender, {
          text: `🚨 *GRUPPO SVUOTATO*\n\n📤 Nuovo gruppo:\n🔗 https://chat.whatsapp.com/${codice}\n\n👥 Membri salvati:\n${membriSalvati.map(u => `• @${u.split('@')[0]}`).join('\n')}`,
          mentions: membriSalvati
        });

        m.reply('📨 Backup inviato in privato.');
      } catch (e) {
        console.error(e);
        m.reply('❌ Errore durante l\'invio del backup.');
      }
      break;
    }
  }

  global.db.data.chats[m.chat] = chat;
};

handler.help = ['backup', 'haram', 'setgrupponuovo'];
handler.tags = ['group'];
handler.command = /^(backup|haram|setgrupponuovo)$/i;
handler.group = true;

export default handler;
