import fs from 'fs';
import path from 'path';
import Canvas from 'canvas';
const playersPath = path.join(process.cwd(), './plugins/rosa_players.json');
const pitchImgUrl = 'https://url.to/football_pitch.png'; // Sostituisci con URL reale da scaricare
let handler = async (m, { conn }) => {
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];
  const squad = data.fifaSquad || [];

  if (squad.length < 11) {
    return m.reply('❌ Devi prima salvare una rosa completa con /futteam e poi fare Save.');
  }

  const fullList = JSON.parse(fs.readFileSync(playersPath, 'utf8'));

  const canvas = Canvas.createCanvas(900, 600);
  const ctx = canvas.getContext('2d');

  const pitchImg = await Canvas.loadImage(pitchImgUrl);
  ctx.drawImage(pitchImg, 0, 0, 900, 600);

  const positions = [
    { x: 400, y: 20 },
    { x: 200, y: 150 }, { x: 400, y: 150 }, { x: 600, y: 150 },
    { x: 150, y: 300 }, { x: 350, y: 300 }, { x: 550, y: 300 }, { x: 750, y: 300 },
    { x: 200, y: 450 }, { x: 400, y: 450 }, { x: 600, y: 450 }
  ];

  for (let i = 0; i < 11; i++) {
    const p = squad[i];
    const img = await Canvas.loadImage(p.image);
    const pos = positions[i];
    ctx.drawImage(img, pos.x - 50, pos.y - 50, 100, 100);
  }

  const buffer = canvas.toBuffer();
  await conn.sendMessage(m.chat, { image: { buffer } }, { quoted: m });
};

handler.command = /^futteamsquad$/i;
handler.tags = ['fifa'];
handler.help = ['futteamsquad'];
export default handler;
