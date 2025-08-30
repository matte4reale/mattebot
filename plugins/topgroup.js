import { createCanvas } from "canvas";

let groupStats = Object.create(null);

function sanitizeText(text) {
  // elimina caratteri che canvas non riesce a disegnare
  return text.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "�");
}

function drawCup(ctx, x, y, size = 60) {
  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.moveTo(x - size / 2, y);
  ctx.lineTo(x + size / 2, y);
  ctx.lineTo(x + size * 0.4, y + size);
  ctx.lineTo(x - size * 0.4, y + size);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(x - size * 0.15, y + size, size * 0.3, size * 0.3);
  ctx.fillRect(x - size * 0.5, y + size * 1.3, size, size * 0.15);
  ctx.strokeStyle = "#ffcc99";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(x - size * 0.9, y + size * 0.5, size * 0.35, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + size * 0.9, y + size * 0.5, size * 0.35, 0, Math.PI * 2);
  ctx.stroke();
}

const handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply("Solo nei gruppi!");

  const groups = await conn.groupFetchAllParticipating();
  const list = Object.values(groups || {});
  const stats = list.map((g) => {
    const id = g.id;
    const subject = sanitizeText(g.subject || "Gruppo senza nome");
    const participants = g.participants?.length || 0;
    if (!groupStats[id]) groupStats[id] = { totalMessages: 0 };
    return {
      subject,
      participants,
      totalMessages: groupStats[id].totalMessages,
    };
  });

  const sorted = stats.sort((a, b) => b.totalMessages - a.totalMessages).slice(0, 10);

  const width = 1200, height = 900;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 60px Poppins, Roboto, Segoe UI, Noto Color Emoji, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("🏆 TOP GRUPPI 🏆", width / 2, 100);

  drawCup(ctx, width / 2 - 400, 55, 50);
  drawCup(ctx, width / 2 + 400, 55, 50);

  ctx.textAlign = "left";
  ctx.font = "28px Poppins, Roboto, Segoe UI, Noto Color Emoji, sans-serif";
  sorted.forEach((g, i) => {
    const y = 200 + i * 60;
    ctx.fillStyle = "#fff";
    ctx.fillText(`#${i + 1} ${g.subject}`, 100, y);
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(`${g.totalMessages} messaggi • ${g.participants} membri`, 700, y);
  });

  const buffer = canvas.toBuffer("image/jpeg");
  await conn.sendMessage(m.chat, { image: buffer, caption: "🏆 Classifica aggiornata!" }, { quoted: m });
};

handler.all = async (m) => {
  if (m.isGroup && m.chat) {
    if (!groupStats[m.chat]) groupStats[m.chat] = { totalMessages: 0 };
    groupStats[m.chat].totalMessages++;
  }
};

handler.command = /^topgruppi$/i;
handler.group = true;

export default handler;