const { areJidsSameUser } = require("@whiskeysockets/baileys")

// Numeri autorizzati (senza il +, solo cifre)
const NUMERI_AUTORIZZATI = ['393471234567', '393661234567'];

module.exports = {
  name: 'groupGuard',
  type: 'event',
  async handler(m, { conn }) {
    const isGroup = m.key.remoteJid.endsWith('@g.us');
    const senderJid = m.key.participant || m.key.remoteJid;

    // 💬 1. Controlla se riceve link gruppo in privato
    if (!isGroup && m.message?.conversation?.includes('chat.whatsapp.com/')) {
      const link = m.message.conversation.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/);
      if (link) {
        try {
          const info = await conn.groupGetInviteInfo(link[1]);
          if (info.size < 30) {
            await conn.sendMessage(m.key.remoteJid, {
              text: `❌ Questo gruppo ha meno di 30 membri.\nAumentate i membri e invitatemi di nuovo.`,
            });
          }
        } catch {
          await conn.sendMessage(m.key.remoteJid, { text: '⚠️ Link non valido o impossibile controllare.' });
        }
      }
    }

    // 🚪 2. Se viene aggiunto a un gruppo manualmente
    if (m.messageStubType === 27 || m.messageStubType === 'add') {
      const groupId = m.key.remoteJid;
      try {
        const metadata = await conn.groupMetadata(groupId);
        const size = metadata.participants.length;

        // Controlla se chi lo ha aggiunto è autorizzato
        const autorizzato = NUMERI_AUTORIZZATI.some(num => areJidsSameUser(`${num}@s.whatsapp.net`, m.messageStubParameters[0]));

        if (size < 30 && !autorizzato) {
          await conn.sendMessage(groupId, {
            text: `❌ Questo gruppo ha meno di 30 membri.\nAumentate i membri e invitatemi di nuovo.`,
          });
          await conn.groupLeave(groupId);
        }
      } catch (e) {
        console.error('[Errore aggiunta gruppo]:', e);
      }
    }
  }
};