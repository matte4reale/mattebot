import fs from 'fs';

const numeroMatte = '66621409462';
const jsonPath = './database/frasi_contesto_matte.json';

let data = {
  mafioso: [],
  amichevoli: [],
  risposte: {}
};

try {
  const raw = fs.readFileSync(jsonPath, 'utf8');
  data = JSON.parse(raw);
} catch (e) {
  console.error('Errore nel caricamento JSON:', e);
}

function scegliFrase(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function cercaRispostaContesto(testo) {
  const chiavi = Object.keys(data.risposte || {});
  for (const chiave of chiavi) {
    if (testo.toLowerCase().includes(chiave.toLowerCase())) {
      return scegliFrase(data.risposte[chiave]);
    }
  }
  return null;
}

const handler = async (m, { conn }) => {
  const mittente = m.sender.replace(/[^0-9]/g, '');
  const matteTaggato = m.mentionedJid?.some(j => j.includes(numeroMatte));
  const matteCitato = m.quoted?.participant?.includes(numeroMatte);
  const contieneNome = m.text?.toLowerCase().includes('matte');

  if (!(matteTaggato || matteCitato || contieneNome)) return;
  if (mittente === numeroMatte) return;

  let risposta = cercaRispostaContesto(m.text);

  if (!risposta) {
    risposta = Math.random() < 0.7
      ? scegliFrase(data.mafioso)
      : scegliFrase(data.amichevoli);
  }

  return m.reply(`💬 ${risposta}`);
};

handler.customPrefix = new RegExp(`@${66621409462}|matte`, 'i');
handler.command = new RegExp();
handler.group = true;

export default handler;