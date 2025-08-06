const { areJidsSameUser } = require('@whiskeysockets/baileys');

const NUMERI_AUTORIZZATI = ['393471234567', '393661234567']; // Sostituisci con i tuoi

module.exports = {
  name: 'groupGuard',
  type: 'event',
  async handler(m, { conn }) {
    // 🔧 Verifica se è un messaggio privato con link
    if (!m.key.remoteJid.endsWith('@g.us') && m.message?.conversation?.includes('chat.whatsapp.com/')) {
      const code = m.message.conversation.split('chat.whatsapp.com/')[1]?.trim();
      if (code) {
        try {
          const info = await conn.groupGetInviteInfo(code);
          if (info.size < 30) {
            await conn.sendMessage(m.key.remoteJid, { text: '❌ Questo gruppo ha meno di 30 membri.\nAumentate i membri e invitatemi di nuovo.oh si' });
          }
        } catch (e) {
          await conn.sendMessage(m.key.remoteJid, { text: '⚠️ Impossibile controllare il gruppo. Link non valido o errore.' });
        }
      }
    }

    // 👥 Quando il bot viene aggiunto a un gruppo
    if (m.messageStubType === 27 || m.messageStubType === 'add') {
      const groupId = m.key.remoteJid;
      const inviter = m.messageStubParameters?.[0];
      try {
        const metadata = await conn.groupMetadata(groupId);
        const isAuthorized = NUMERI_AUTORIZZATI.some(num => areJidsSameUser(`${num}@s.whatsapp.net`, inviter));

        if (metadata.participants.length < 30 && !isAuthorized) {
          await conn.sendMessage(groupId, { text: '❌ Questo gruppo ha meno di 30 membri.\nAumentate i membri e invitatemi di nuovo.' });
          await conn.groupLeave(groupId);
        }
      } catch (err) {
        console.error('Errore:', err);
      }
    }
  }
};