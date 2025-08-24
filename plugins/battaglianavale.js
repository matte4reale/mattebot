import { createCanvas } from 'canvas';

const GRID_SIZE = 10;
const SHIPS = [
  { name: 'Portaerei', size: 5 },
  { name: 'Corazzata', size: 4 },
  { name: 'Incrociatore', size: 3 },
  { name: 'Sommergibile', size: 3 },
  { name: 'Cacciatorpediniere', size: 2 }
];
const ROUND_TIMEOUT_MS = 180000;

class BattleshipGame {
  constructor(playerId) {
    this.playerId = playerId;
    this.grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    this.shots = new Set();
    this.ships = [];
    this.placed = false;
    this.hits = 0;
    this.totalShipCells = 0;
    this.gameOver = false;
    this.won = false;
    this.id = null;
    this.startTime = Date.now();
    this.timeoutId = null;
    this.placeShips();
  }

  placeShips() {
    for (const shipDef of SHIPS) {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 500) {
        attempts++;
        const horizontal = Math.random() < 0.5;
        const maxRow = horizontal ? GRID_SIZE : GRID_SIZE - shipDef.size + 1;
        const maxCol = horizontal ? GRID_SIZE - shipDef.size + 1 : GRID_SIZE;
        const r = Math.floor(Math.random() * maxRow);
        const c = Math.floor(Math.random() * maxCol);
        const cells = [];
        let ok = true;
        for (let i = 0; i < shipDef.size; i++) {
          const rr = r + (horizontal ? 0 : i);
          const cc = c + (horizontal ? i : 0);
          if (this.grid[rr][cc] !== 0) { ok = false; break; }
          cells.push([rr, cc]);
        }
        if (!ok) continue;
        for (const [rr, cc] of cells) this.grid[rr][cc] = 1;
        this.ships.push({ name: shipDef.name, size: shipDef.size, cells: cells.map(([rr, cc]) => rr + '-' + cc), hits: 0, sunk: false });
        this.totalShipCells += shipDef.size;
        placed = true;
      }
    }
    this.placed = true;
  }

  coordToIndex(coordRaw) {
    const s = coordRaw.toUpperCase().replace(/\s+/g, '');
    const m = s.match(/^([A-J])([1-9]|10)$/);
    if (!m) return null;
    const row = m[1].charCodeAt(0) - 65;
    const col = parseInt(m[2], 10) - 1;
    return { row, col, key: row + '-' + col };
  }

  fire(coordRaw) {
    if (this.gameOver) return { error: 'Partita terminata. Usa .battaglia per iniziarne una nuova.' };
    const parsed = this.coordToIndex(coordRaw);
    if (!parsed) return { error: 'Coordinate non valide. Usa formato tipo A1, B7, J10.' };
    const { row, col, key } = parsed;
    if (this.shots.has(key)) return { error: 'Hai già sparato su quella casella.' };
    this.shots.add(key);
    if (this.grid[row][col] === 1) {
      this.grid[row][col] = 2;
      this.hits++;
      let sunkShip = null;
      for (const ship of this.ships) {
        if (ship.cells.includes(key)) {
          ship.hits++;
          if (ship.hits === ship.size) {
            ship.sunk = true;
            sunkShip = ship;
          }
          break;
        }
      }
      if (this.hits === this.totalShipCells) {
        this.gameOver = true;
        this.won = true;
      }
      return { hit: true, sunk: sunkShip?.name || null, won: this.won };
    } else {
      this.grid[row][col] = this.grid[row][col] === 0 ? -1 : this.grid[row][col];
      return { hit: false, sunk: null, won: false };
    }
  }

  async renderBoard() {
    const cell = 54;
    const gap = 6;
    const pad = 80;
    const w = pad + GRID_SIZE * cell + (GRID_SIZE - 1) * gap + pad;
    const h = pad + GRID_SIZE * cell + (GRID_SIZE - 1) * gap + pad + 80;
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');

    const colBg1 = '#0f172a';
    const colBg2 = '#111827';
    const colGrid = '#1f2937';
    const colSea = '#0ea5e9';
    const colMiss = '#334155';
    const colHit = '#ef4444';
    const colSunk = '#f59e0b';
    const colText = '#e5e7eb';
    const colLabel = '#93c5fd';
    const gradient = ctx.createRadialGradient(w/2, h/2, 60, w/2, h/2, Math.max(w,h)/1.1);
    gradient.addColorStop(0, colBg2);
    gradient.addColorStop(1, colBg1);
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle = colText;
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('BATTAGLIA NAVALE', w/2, 50);

    const left = pad;
    const top = pad;

    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = colLabel;
    for (let i = 0; i < GRID_SIZE; i++) {
      const x = left + i * (cell + gap) + cell/2;
      ctx.fillText(String(i+1), x, top - 16);
    }
    for (let i = 0; i < GRID_SIZE; i++) {
      const y = top + i * (cell + gap) + cell/2 + 8;
      ctx.fillText(String.fromCharCode(65 + i), left - 28, y);
    }

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const x = left + c * (cell + gap);
        const y = top + r * (cell + gap);
        ctx.fillStyle = colGrid;
        roundRect(ctx, x, y, cell, cell, 10);
        ctx.fill();

        const val = this.grid[r][c];
        if (val === 0 || val === 1) {
          ctx.fillStyle = colSea;
          roundRect(ctx, x+2, y+2, cell-4, cell-4, 8);
          ctx.fill();
        } else if (val === -1) {
          ctx.fillStyle = colMiss;
          roundRect(ctx, x+2, y+2, cell-4, cell-4, 8);
          ctx.fill();
          ctx.fillStyle = '#cbd5e1';
          ctx.font = 'bold 22px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('●', x + cell/2, y + cell/2);
        } else if (val === 2) {
          ctx.fillStyle = colHit;
          roundRect(ctx, x+2, y+2, cell-4, cell-4, 8);
          ctx.fill();
          ctx.fillStyle = '#fee2e2';
          ctx.font = 'bold 22px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('✖', x + cell/2, y + cell/2);
        }
      }
    }

    const sunkCount = this.ships.filter(s => s.sunk).length;
    ctx.textAlign = 'left';
    ctx.fillStyle = colText;
    ctx.font = 'bold 22px Arial';
    ctx.fillText(`Navi affondate: ${sunkCount}/${this.ships.length}`, pad, h - 60);
    ctx.fillText(`Colpi totali: ${this.shots.size}`, pad, h - 30);
    return canvas.toBuffer('image/png');
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  ctx.closePath();
}

global.battleship = global.battleship || {};

async function startBattleship(conn, m) {
  const chat = m.chat;
  if (global.battleship[chat]) return conn.reply(chat, 'C’è già una partita attiva qui.', m);
  const game = new BattleshipGame(m.sender);
  const img = await game.renderBoard();
  const caption = 'Spara scrivendo coordinate come A1, D7, J10. Hai 3 minuti di tempo.';
  const sent = await conn.sendMessage(chat, { image: img, caption, footer: 'Battaglia Navale' }, { quoted: m });
  game.id = sent.key.id;
  const tid = setTimeout(async () => {
    if (!global.battleship[chat] || global.battleship[chat].id !== game.id) return;
    global.battleship[chat].gameOver = true;
    const img2 = await game.renderBoard();
    const buttons = [{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Gioca di nuovo', id: '.battaglia' }) }];
    await conn.sendMessage(chat, { image: img2, caption: 'Tempo scaduto. Partita terminata.', interactiveButtons: buttons, footer: 'Battaglia Navale' });
    delete global.battleship[chat];
  }, ROUND_TIMEOUT_MS);
  game.timeoutId = tid;
  global.battleship[chat] = game;
}

let handler = async (m, { conn, command }) => {
  if (command === 'battaglia') {
    return startBattleship(conn, m);
  }
  if (command === 'skipbattaglia') {
    const game = global.battleship[m.chat];
    if (!game) return m.reply('Nessuna partita attiva.');
    if (m.sender !== game.playerId && !m.fromMe) return m.reply('Solo chi ha avviato la partita può fermarla.');
    clearTimeout(game.timeoutId);
    const img = await game.renderBoard();
    const buttons = [{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Gioca di nuovo', id: '.battaglia' }) }];
    await conn.sendMessage(m.chat, { image: img, caption: `Partita interrotta. Navi affondate: ${game.ships.filter(s=>s.sunk).length}/${game.ships.length}.`, interactiveButtons: buttons, footer: 'Battaglia Navale' }, { quoted: m });
    delete global.battleship[m.chat];
  }
};

handler.before = async (m, { conn }) => {
  const game = global.battleship[m.chat];
  if (!game) return;
  if (!m.quoted || m.quoted.id !== game.id) return;
  if (m.key.fromMe) return;
  if (m.sender !== game.playerId) return;
  if (game.gameOver) return;

  const guess = (m.text || '').trim().toUpperCase();
  const parsed = game.coordToIndex(guess);
  if (!parsed) return conn.reply(m.chat, 'Formato non valido. Usa A1, B3, J10.', m);

  clearTimeout(game.timeoutId);
  const res = game.fire(guess);
  if (res.error) {
    const tid = setTimeout(() => {}, 0);
    game.timeoutId = setTimeout(async () => {}, 1);
    return conn.reply(m.chat, res.error, m);
  }

  const img = await game.renderBoard();
  let caption = '';
  if (res.hit && res.sunk) caption = `Colpito e affondato: ${res.sunk}!`;
  else if (res.hit) caption = 'Colpito!';
  else caption = 'Acqua!';
  if (res.won) {
    game.gameOver = true;
    const buttons = [{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Gioca di nuovo', id: '.battaglia' }) }];
    await conn.sendMessage(m.chat, { image: img, caption: 'Hai affondato tutte le navi! Vittoria!', interactiveButtons: buttons, footer: 'Battaglia Navale' }, { quoted: m });
    delete global.battleship[m.chat];
    return;
  }

  const sent = await conn.sendMessage(m.chat, { image: img, caption, footer: 'Battaglia Navale' }, { quoted: m });
  game.id = sent.key.id;
  game.timeoutId = setTimeout(async () => {
    if (!global.battleship[m.chat] || global.battleship[m.chat].id !== game.id) return;
    game.gameOver = true;
    const img2 = await game.renderBoard();
    const buttons = [{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Gioca di nuovo', id: '.battaglia' }) }];
    await conn.sendMessage(m.chat, { image: img2, caption: 'Tempo scaduto. Partita terminata.', interactiveButtons: buttons, footer: 'Battaglia Navale' });
    delete global.battleship[m.chat];
  }, ROUND_TIMEOUT_MS);
};

setInterval(() => {
  const now = Date.now();
  for (const [chat, game] of Object.entries(global.battleship || {})) {
    if (now - game.startTime > 15 * 60 * 1000) {
      clearTimeout(game.timeoutId);
      delete global.battleship[chat];
    }
  }
}, 60000);

handler.help = ['battaglia', 'skipbattaglia'];
handler.tags = ['giochi'];
handler.command = /^(battaglia|skipbattaglia)$/i;
handler.group = true;
handler.register = true;

export default handler;