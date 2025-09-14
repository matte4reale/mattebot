import fetch from "node-fetch"

function absUrl(base, u) {
  try {
    return new URL(u, base).href
  } catch {
    return u
  }
}

function safeJsonParse(s) {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}

function findJsonScripts(html) {
  let found = null
  let m = html.match(/<script[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i)
  if (m) {
    found = safeJsonParse(m[1])
    if (found) return found
  }
  m = html.match(/<script[^>]*id=["']gatsby-initial-data["'][^>]*>([\s\S]*?)<\/script>/i)
  if (m) {
    found = safeJsonParse(m[1])
    if (found) return found
  }
  m = html.match(/<script[^>]*>window\.__INITIAL_STATE__\s*=\s*(\{[\s\S]*?\})<\/script>/i)
  if (m) {
    found = safeJsonParse(m[1])
    if (found) return found
  }
  m = html.match(/<script[^>]*>window\.__DATA__\s*=\s*(\{[\s\S]*?\})<\/script>/i)
  if (m) {
    found = safeJsonParse(m[1])
    if (found) return found
  }
  return null
}

function extractApiCandidates(html, base) {
  let urls = new Set()
  let re = /fetch\((?:'|")([^'"]+)(?:'|")/gi
  let r2 = /axios\.get\((?:'|")([^'"]+)(?:'|")/gi
  let r3 = /"api"[:]\s*"(\/[^"]+)"/gi
  let m
  while ((m = re.exec(html)) !== null) urls.add(absUrl(base, m[1]))
  while ((m = r2.exec(html)) !== null) urls.add(absUrl(base, m[1]))
  while ((m = r3.exec(html)) !== null) urls.add(absUrl(base, m[1]))
  let generic = html.match(/\/api\/[A-Za-z0-9_\-\/]+/g) || []
  generic.forEach(u => urls.add(absUrl(base, u)))
  return [...urls]
}

function findBotsArrays(obj) {
  let results = []
  if (Array.isArray(obj)) {
    if (obj.length && typeof obj[0] === "object" && obj[0] !== null) {
      let k = Object.keys(obj[0]).map(x => x.toLowerCase())
      if ((k.includes("name") || k.includes("nome") || k.includes("title")) && (k.includes("status") || k.includes("state") || k.includes("banned") || k.includes("is_banned") || k.includes("ban"))) results.push(obj)
    }
    for (let it of obj) {
      if (typeof it === "object" && it !== null) results = results.concat(findBotsArrays(it))
    }
  } else if (typeof obj === "object" && obj !== null) {
    for (let v of Object.values(obj)) {
      if (typeof v === "object" && v !== null) results = results.concat(findBotsArrays(v))
    }
  }
  return results
}

function cleanText(s) {
  if (!s) return ""
  return s.replace(/\s+/g, " ").trim()
}

function classifyStatus(s) {
  if (!s && s !== 0) return "altro"
  s = String(s).toLowerCase()
  if (/(ban|bann|bannat|banned|bannato|bannati|blocked)/.test(s)) return "bannati"
  if (/(attiv|active|onlin|online|ok|up)/.test(s)) return "attivi"
  return "altro"
}

function tryParseFromHtmlBlocks(html) {
  let names = []
  let statuses = []
  let nameRe = /class=["'][^"']*(bot[-_ ]?name|name[-_ ]?bot|nome|bot-name)[^"']*["'][^>]*>([^<]+)</gi
  let statusRe = /class=["'][^"']*(bot[-_ ]?status|status[-_ ]?bot|stato|status)[^"']*["'][^>]*>([^<]+)</gi
  let m
  while ((m = nameRe.exec(html)) !== null) names.push(cleanText(m[2]))
  while ((m = statusRe.exec(html)) !== null) statuses.push(cleanText(m[2]))
  if (names.length && statuses.length && names.length === statuses.length) {
    let arr = []
    for (let i = 0; i < names.length; i++) arr.push({ name: names[i], status: statuses[i] })
    return arr
  }
  let rows = []
  let rowRe = /<div[^>]*class=["'][^"']*(bot[-_ ]?row|bot[-_ ]?item|bot[-_ ]?block|bot)[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi
  while ((m = rowRe.exec(html)) !== null) rows.push(m[2])
  let results = []
  for (let r of rows) {
    let n = r.match(/>([^<]{2,60})<\/(?:h3|h2|span|div|p)/i)
    let s = r.match(/(online|attiv|active|onlin|offline|ban|bann|banned|bannato|bannati|block)/i)
    if (n) results.push({ name: cleanText(n[1]), status: s ? cleanText(s[0]) : "altro" })
  }
  if (results.length) return results
  return null
}

export default async function handler(m, { conn }) {
  try {
    let url = "https://chatunitycenter.netlify.app/chatunity-bot"
    let res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    let html = await res.text()
    let dataObj = findJsonScripts(html)
    let bots = []
    if (dataObj) {
      let arrs = findBotsArrays(dataObj)
      if (arrs.length) {
        let candidate = arrs[0]
        for (let it of candidate) {
          let name = it.name || it.nome || it.title || it.botName || it.namebot || it.label || ""
          let status = it.status || it.state || it.is_banned || it.banned || it.flag || it.active || ""
          bots.push({ name: cleanText(name), rawStatus: status })
        }
      }
    }
    if (!bots.length) {
      let apis = extractApiCandidates(html, url)
      for (let a of apis) {
        try {
          let r = await fetch(a, { headers: { accept: "application/json, text/plain, */*" } })
          if (!r.ok) continue
          let j = await r.json().catch(() => null)
          if (!j) continue
          let arrs = findBotsArrays(j)
          if (arrs.length) {
            let candidate = arrs[0]
            for (let it of candidate) {
              let name = it.name || it.nome || it.title || it.botName || ""
              let status = it.status || it.state || it.is_banned || it.banned || it.active || ""
              bots.push({ name: cleanText(name), rawStatus: status })
            }
            if (bots.length) break
          }
        } catch (e) {}
      }
    }
    if (!bots.length) {
      let parsed = tryParseFromHtmlBlocks(html)
      if (parsed && parsed.length) for (let it of parsed) bots.push({ name: it.name, rawStatus: it.status })
    }
    if (!bots.length) {
      await conn.sendMessage(m.chat, { text: "❌ Non sono riuscito a trovare dati affidabili dalla pagina. Per risultati perfetti serve una richiesta renderizzata (puppeteer/browserless) o un endpoint API pubblico." }, { quoted: m })
      return
    }
    let attiviList = []
    let bannatiList = []
    let altroList = []
    for (let b of bots) {
      let s = classifyStatus(b.rawStatus)
      if (s === "attivi") attiviList.push(b.name || "sconosciuto")
      else if (s === "bannati") bannatiList.push(b.name || "sconosciuto")
      else altroList.push(b.name || "sconosciuto")
    }
    let attivi = attiviList.length
    let bannati = bannatiList.length
    let totale = attivi + bannati + altroList.length
    let text = "🤖 ChatUnity - Stato Bot\n\n"
    text += `🟢 Attivi: *${attivi}*\n`
    if (attiviList.length) text += `  ${attiviList.slice(0,30).join(", ")}\n`
    text += `⛔ Bannati: *${bannati}*\n`
    if (bannatiList.length) text += `  ${bannatiList.slice(0,30).join(", ")}\n`
    if (altroList.length) {
      text += `ℹ️ Altro: *${altroList.length}*\n`
      if (altroList.length) text += `  ${altroList.slice(0,30).join(", ")}\n`
    }
    text += `\n📊 Totale: *${totale}*\n`
    text += `\n🔗 Fonte: ${url}`
    await conn.sendMessage(m.chat, { text }, { quoted: m })
  } catch (e) {
    await conn.sendMessage(m.chat, { text: `❌ Errore: ${e.message}` }, { quoted: m })
  }
}

handler.command = ["chatunitybots"]
handler.help = ["chatunitybots"]
handler.tags = ["info"]