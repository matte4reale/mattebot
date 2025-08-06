const { delay } = require('@whiskeysockets/baileys');
const autorizzati = ['1234567890@s.whatsapp.net', '0987654321@s.whatsapp.net']; // Inserisci i numeri autorizzati

module.exports = {
  name: 'security',
  event: ['group-participants.update', 'message'],
  async handler(event, { conn, m, participantsUpdate }) {
    // 📌 Quando il bot viene aggiunto a un gruppo
    if (event.id && event.id.endsWith('@g.us') && event.participants) {
      const groupMetadata = await conn.groupMetadata(event.id);
      const groupMembers = groupMetadata.participants.length;
      const botNumber = conn.user.id;

      const isBotAdded = event.participants.includes(botNumber);
      const isAuthorized = autorizzati.includes(event.participants[0]);

      if (isBotAdded && groupMembers < 30 && !isAuthorized) {
        await conn.sendMessage(event.id, {
          text: `Questo gruppo ha meno di 30 membri. Il bot uscirà.`,
        });
        await delay(2000);
        await conn.groupLeave(event.id);
      }
    }

    // 📌 Quando riceve un messaggio privato con link
    if (m && m.message && m.key.remoteJid.endsWith('@s.whatsapp.net')) {
      const msgText = m.body || m.message?.conversation || '';
      const groupInviteRegex = /chat\.whatsapp\.com\/([A-Za-z0-9]+)/;
      const match = msgText.match(groupInviteRegex);

      if (match) {
        const inviteCode = match[1];
        try {
          const info = await conn.groupGetInviteInfo(inviteCode);
          const isAuthorized = autorizzati.includes(m.key.remoteJid);

          if (info.size < 30 && !isAuthorized) {
            await conn.sendMessage(m.key.remoteJid, {
              text: `Non posso entrare in gruppi con meno di 30 membri.`,
            });
          } else {
            await conn.sendMessage(m.key.remoteJid, {
              text: `Il gruppo ha abbastanza membri, sto entrando...`,
            });
            await conn.groupAcceptInvite(inviteCode);
          }
        } catch (err) {
          await conn.sendMessage(m.key.remoteJid, {
            text: `Errore nel controllare l'invito. Forse il link non è valido.`,
          });
        }
      }
    }
  }
};