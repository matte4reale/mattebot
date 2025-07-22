import fs from 'fs';

const numeriAutorizzati = ['393884769557']; // Sostituisci con il tuo numero

let data = {
  mafioso: [],
  amichevoli: [],
  risposte: {}
};

try {
  const raw = fs.readFileSync('./database/frasi_contesto_matte.json', 'utf8');
  data = JSON.parse(raw);
} catch (e) {
  console.error('⚠️ Errore nel caricamento del file JSON:', e);
}

function scegliFrase(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function cercaRispostaContesto(testo) {
  const chiavi = Object.keys(data.risposte);
  for (const chiave of chiavi) {
    if (testo.toLowerCase().includes(chiave.toLowerCase())) {
      return scegliFrase(data.risposte[chiave]);
    }
  }
  return null;
}

const handler = async (m, { conn }) => {
  const sender = m.sender.replace(/[^0-9]/g, '');

  if (!numeriAutorizzati.includes(sender)) return;

  const botTaggato = m.mentionedJid?.includes(m.sender);
  const messaggioDirettoAMatte = m.mentions?.some(j => j.includes(numeriAutorizzati[0])) || m.text?.toLowerCase().includes('matte');

  if (messaggioDirettoAMatte || m.quoted?.participant?.includes(numeriAutorizzati[0])) {
    let risposta;

    // Se c'è un contesto
    risposta = cercaRispostaContesto(m.text);
    if (risposta) {
      return m.reply(`💬 ${risposta}`);
    }

    if (Math.random() < 0.7) {
      risposta = scegliFrase(data.mafioso);
    } else {
      risposta = scegliFrase(data.amichevoli);
    }

    return m.reply(`💬 ${risposta}`);
  }
};

handler.customPrefix = /@393884769557|matte/i;
handler.command = new RegExp(); // Trigger automatico senza comando
handler.group = true;

export default handler;