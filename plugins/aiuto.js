import fs from 'fs';
import path from 'path';

const handler = async (m, { conn }) => {
  const numeroAutorizzato = '66621409462'; // <-- matte
  const mittente = m.sender.replace(/[^0-9]/g, '');
  const taggaMatte = m.mentionedJid?.includes(numeroAutorizzato + '@s.whatsapp.net');
  const rispondeAMatte = m.quoted?.sender?.includes(numeroAutorizzato);

  // LIVE reload JSON
  let frasi = {};
  try {
    const file = fs.readFileSync(path.join('./database/frasi_contesto_matte.json'));
    frasi = JSON.parse(file);
  } catch (e) {
    console.error('❌ Errore nel leggere il JSON:', e);
    return;
  }

  const parlaComeMatte = (tipo) => {
    const lista = frasi[tipo] || [];
    return lista[Math.floor(Math.random() * lista.length)];
  };

  const analizzaDomanda = (testo) => {
    testo = testo.toLowerCase();
    for (const chiave in frasi.risposte || {}) {
      if (testo.includes(chiave)) {
        const risposte = frasi.risposte[chiave];
        return risposte[Math.floor(Math.random() * risposte.length)];
      }
    }
    return null;
  };

  if ((taggaMatte || rispondeAMatte) && mittente !== numeroAutorizzato) {
    // Se Matte è calmo
    if (m.text.toLowerCase().includes('calmo')) {
      if (!global.botMutato) global.botMutato = {};
      global.botMutato[m.chat] = true;
      return conn.reply(m.chat, '😐 Scusa fratello… me sto zitto.', m);
    }

    // Se gli dicono di farsi sentire
    if (global.botMutato?.[m.chat] && m.text.toLowerCase().includes('fatti sentire')) {
      delete global.botMutato[m.chat];
      return conn.reply(m.chat, '💥 Sto tornato fratè, chi ha detto il mio nome?', m);
    }

    // Se è mutato, non risponde
    if (global.botMutato?.[m.chat]) return;

    // Cerca risposta a una domanda
    const rispostaContesto = analizzaDomanda(m.text);
    if (rispostaContesto) {
      return conn.reply(m.chat, rispostaContesto, m);
    }

    // Risposta normale o mafiosa casuale
    const risposta = Math.random() < 0.7 ? parlaComeMatte('mafioso') : parlaComeMatte('amichevoli');
    return conn.reply(m.chat, risposta || '🗿', m);
  }
};

handler.customPrefix = /./;
handler.command = new RegExp; // trigger su tutto
export default handler;