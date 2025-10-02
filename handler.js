import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
const { proto } = (await import('@realvare/based')).default

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
  clearTimeout(this)
  resolve()
}, ms))

global.ignoredUsersGlobal = global.ignoredUsersGlobal || new Set()
global.ignoredUsersGroup = global.ignoredUsersGroup || {}
global.groupSpam = global.groupSpam || {}

export async function handler(chatUpdate) {
  if (!global.db?.data) await global.loadDatabase?.()
  if (!global.db?.data?.stats) global.db.data.stats = {}
  const stats = global.db.data.stats

  this.msgqueque = this.msgqueque || []
  if (!chatUpdate) return

  const upMsgs = chatUpdate.messages || []
  if (Array.isArray(upMsgs) && upMsgs.length) {
    this.pushMessage(upMsgs).catch(console.error)
  }

  let m = upMsgs[upMsgs.length - 1]
  if (!m) return

  if (global.db.data == null) await global.loadDatabase()

  const isOwner = (() => {
    try {
      const selfId = this?.decodeJid?.(global?.conn?.user?.id || this?.user?.id || '') || ''
      const owners = (global.owner || []).map(([n]) => n).filter(Boolean)
      const list = [selfId, ...owners]
        .filter(Boolean)
        .map(v => (v || '').toString().replace(/[^0-9]/g, '') + '@s.whatsapp.net')
      return list.includes(m.sender) || !!m.fromMe
    } catch {
      return false
    }
  })()

  const hasValidPrefix = (text, prefixes) => {
    if (!text || typeof text !== 'string') return false
    if (prefixes instanceof RegExp) return prefixes.test(text)
    const prefixList = Array.isArray(prefixes) ? prefixes : [prefixes]
    return prefixList.some(p => {
      if (p instanceof RegExp) return p.test(text)
      if (typeof p === 'string') return text.startsWith(p)
      return false
    })
  }

  // Anti-spam comandi per gruppi
  {
    const text = typeof m.text === 'string' ? m.text : ''
    const pref = this?.prefix ?? global?.prefix ?? '!'
    if (m.isGroup && !isOwner && hasValidPrefix(text, pref)) {
      const now = Date.now()
      const chatId = m.chat
      if (!global.groupSpam[chatId]) {
        global.groupSpam[chatId] = {
          count: 0,
          firstCommandTimestamp: now,
          isSuspended: false,
          suspendedUntil: null
        }
      }
      const groupData = global.groupSpam[chatId]
      if (groupData.isSuspended) {
        if (now < (groupData.suspendedUntil || 0)) return
        groupData.isSuspended = false
        groupData.count = 0
        groupData.firstCommandTimestamp = now
        groupData.suspendedUntil = null
      }
      if (now - groupData.firstCommandTimestamp > 60000) {
        groupData.count = 1
        groupData.firstCommandTimestamp = now
      } else {
        groupData.count++
      }
      if (groupData.count > 2) {
        groupData.isSuspended = true
        groupData.suspendedUntil = now + 45000
        await this.sendMessage(chatId, {
          text: `『 ⚠ 』 Anti-spam comandi\n\nTroppi comandi in poco tempo!\nAttendi *45 secondi* prima di usare altri comandi.\n\n> sviluppato da sam aka vare`,
          mentions: [m.sender].filter(Boolean)
        }).catch(() => {})
        return
      }
    }
  }

  try {
    m = smsg(this, m) || m
    if (!m) return
    m.exp = 0
    m.limit = false

    // Inizializzazione utenti/chats/settings con default sicuri
    try {
      const users = ((global.db.data.users ||= {}))
      const chats = ((global.db.data.chats ||= {}))
      const settingsAll = ((global.db.data.settings ||= {}))

      let user = users[m.sender] || (users[m.sender] = {})
      if (!isNumber(user.messaggi)) user.messaggi = 0
      if (!isNumber(user.blasphemy)) user.blasphemy = 0
      if (!isNumber(user.exp)) user.exp = 0
      if (!isNumber(user.money)) user.money = 0
      if (!isNumber(user.warn)) user.warn = 0
      if (!isNumber(user.joincount)) user.joincount = 2
      if (!('premium' in user)) user.premium = false
      if (!isNumber(user.premiumDate)) user.premiumDate = -1
      if (!('name' in user)) user.name = m.name || ''
      if (!('muto' in user)) user.muto = false

      let chat = chats[m.chat] || (chats[m.chat] = {})
      if (!('isBanned' in chat)) chat.isBanned = false
      if (!('detect' in chat)) chat.detect = true
      if (!('delete' in chat)) chat.delete = false
      if (!('antiLink' in chat)) chat.antiLink = true
      if (!('antiTraba' in chat)) chat.antiTraba = true
      if (!isNumber(chat.expired)) chat.expired = 0
      if (!isNumber(chat.messaggi)) chat.messaggi = 0
      if (!('name' in chat)) chat.name = this.getName?.(m.chat) || ''
      if (!('antispamcomandi' in chat)) chat.antispamcomandi = true
      if (!('welcome' in chat)) chat.welcome = true

      const selfJid = this?.user?.jid || this?.decodeJid?.(this?.user?.id || '') || 'self'
      let settings = settingsAll[selfJid] || (settingsAll[selfJid] = {})
      if (!('self' in settings)) settings.self = false
      if (!('autoread' in settings)) settings.autoread = false
      if (!('restrict' in settings)) settings.restrict = true
    } catch (e) {
      console.error(e)
    }

    if (opts?.['nyimak']) return
    if (!m.fromMe && opts?.['self']) return
    if (opts?.['pconly'] && (m.chat || '').endsWith('g.us')) return
    if (opts?.['gconly'] && !(m.chat || '').endsWith('g.us')) return

    if (typeof m.text !== 'string') m.text = ''

    // Permessi/ruoli
    const ownerNumbers = (global.owner || []).map(([n]) => n).filter(Boolean)
    const selfId = this?.decodeJid?.(global?.conn?.user?.id || this?.user?.id || '') || ''
    const roster = [selfId, ...ownerNumbers].map(v => (v || '').toString().replace(/[^0-9]/g, '') + '@s.whatsapp.net')
    const isROwner = roster.includes(m.sender)
    const isOwner2 = isROwner || !!m.fromMe
    const isMods = isOwner2 || (global.mods || []).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isPrems = isROwner || isOwner2 || isMods || (global.db.data.users?.[m.sender]?.premiumTime > 0)

    if (opts?.['queque'] && m.text && !(isMods || isPrems)) {
      let queque = this.msgqueque
      const time = 1000 * 5
      const previousID = queque[queque.length - 1]
      queque.push(m.id || m.key?.id)
      const interval = setInterval(async () => {
        if (queque.indexOf(previousID) === -1) clearInterval(interval)
        await delay(time)
      }, time)
    }

    if (m.isBaileys) return
    m.exp += Math.ceil(Math.random() * 10)

    let usedPrefix
    let _user = global.db.data?.users?.[m.sender]

    // Metadati gruppo con fallback sicuri
    const groupMetadata = m.isGroup
      ? (((this.chats?.[m.chat] || {}).metadata) || await this.groupMetadata(m.chat).catch(() => null) || {})
      : {}
    const participantsRaw = (m.isGroup ? (groupMetadata?.participants || []) : [])
    const participants = Array.isArray(participantsRaw) ? participantsRaw : []

    const normalizedParticipants = participants.map(u => {
      const idRaw = u?.id || u?.jid || ''
      const normalizedId = this.decodeJid?.(idRaw) || idRaw
      return { ...u, id: normalizedId, jid: u?.jid || normalizedId }
    })

    const user = m.isGroup
      ? (normalizedParticipants.find(u => this.decodeJid?.(u.id) === m.sender) || {})
      : {}
    const bot = m.isGroup
      ? (normalizedParticipants.find(u => this.decodeJid?.(u.id) === (this.user?.jid)) || {})
      : {}

    // Ruoli admin sicuri
    async function isUserAdmin(conn, chatId, senderId) {
      try {
        const decodedSender = conn.decodeJid?.(senderId) || senderId
        const parts = Array.isArray(groupMetadata?.participants) ? groupMetadata.participants : []
        return parts.some(p => {
          const pid = conn.decodeJid?.(p?.id || p?.jid || '') || (p?.id || p?.jid || '')
          return (pid === decodedSender) && (p?.admin === 'admin' || p?.admin === 'superadmin')
        })
      } catch {
        return false
      }
    }

    const isRAdmin = user?.admin === 'superadmin' || false
    const isAdmin = m.isGroup ? await isUserAdmin(this, m.chat, m.sender) : false
    const isBotAdmin = m.isGroup ? await isUserAdmin(this, m.chat, this.user?.jid) : false

    const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')

    for (let name in (global.plugins || {})) {
      let plugin = global.plugins[name]
      if (!plugin || plugin.disabled) continue
      const __filename = join(___dirname, name)

      // Hook all
      if (typeof plugin.all === 'function') {
        try {
          await plugin.all.call(this, m, {
            chatUpdate,
            __dirname: ___dirname,
            __filename
          })
        } catch (e) {
          console.error(e)
        }
      }

      if (!opts?.['restrict'] && plugin.tags?.includes('admin')) continue

      const str2Regex = str => str.replace(/[|\{}()[\]^$+*?.]/g, '\\$&')
      let basePrefix = plugin.customPrefix ?? (this.prefix ?? global.prefix ?? '!')
      let match

      // Normalizza prefixes in array di regexp controllate
      if (basePrefix instanceof RegExp) {
        match = [[basePrefix.exec(m.text || ''), basePrefix]]
      } else if (Array.isArray(basePrefix)) {
        const arr = basePrefix.map(p => {
          const re = p instanceof RegExp ? p : new RegExp(str2Regex(String(p ?? '')))
          return [re.exec(m.text || ''), re]
        })
        match = arr.find(p => p[1])
      } else if (typeof basePrefix === 'string') {
        const re = new RegExp(str2Regex(basePrefix))
        match = [[re.exec(m.text || ''), re]].find(p => p[1])
      } else {
        const re = /.^/ // non match
        match = [[re.exec(m.text || ''), re]].find(p => p[1])
      }

      if (typeof plugin.before === 'function') {
        const shouldSkip = await plugin.before.call(this, m, {
          match,
          conn: this,
          normalizedParticipants,
          participants,
          groupMetadata,
          user,
          bot,
          isROwner,
          isOwner: isOwner2,
          isRAdmin,
          isAdmin,
          isBotAdmin,
          isPrems,
          chatUpdate,
          __dirname: ___dirname,
          __filename
        }).catch(() => false)
        if (shouldSkip) continue
      }

      if (typeof plugin !== 'function') continue

      const matchEntry = (match && match[0]) || []
      usedPrefix = matchEntry[0] || ''

      if (usedPrefix) {
        const rawText = m.text || ''
        const noPrefix = rawText.replace(usedPrefix, '')
        const split = noPrefix.trim().split(/\s+/).filter(v => v && typeof v === 'string')
        let command = (split[0] || '').toLowerCase()
        let args = split.slice(1)
        let _args = split.slice(1)
        let text = _args.join(' ')
        let fail = plugin.fail || global.dfail

        // Accettazione comando
        const isAccept =
          plugin.command instanceof RegExp
            ? plugin.command.test(command)
            : Array.isArray(plugin.command)
              ? plugin.command.some(cmd => (cmd instanceof RegExp ? cmd.test(command) : cmd === command))
              : typeof plugin.command === 'string'
                ? plugin.command === command
                : false

        if (!isAccept) continue

        m.plugin = name
        if ((m.chat in (global.db.data.chats || {})) || (m.sender in (global.db.data.users || {}))) {
          let chat = global.db.data.chats[m.chat]
          let user = global.db.data.users[m.sender]
          if (name !== 'owner-unbanchat.js' && chat?.isBanned) return
          if (name !== 'owner-unbanuser.js' && user?.banned) return
        }

        let hl = basePrefix
        let adminMode = global.db.data.chats?.[m.chat]?.soloadmin
        let mystica = `${plugin.botAdmin || plugin.admin || plugin.group || plugin || noPrefix || hl || (m.text || '').slice(0, 1) == hl || plugin.command}`
        if (adminMode && !isOwner2 && !isROwner && m.isGroup && !isAdmin && mystica) return

        // Controlli permessi
        if (plugin.rowner && plugin.owner && !(isROwner || isOwner2)) {
          fail?.('owner', m, this)
          continue
        }
        if (plugin.rowner && !isROwner) {
          fail?.('rowner', m, this)
          continue
        }
        if (plugin.owner && !isOwner2) {
          fail?.('owner', m, this)
          continue
        }
        if (plugin.mods && !isMods) {
          fail?.('mods', m, this)
          continue
        }
        if (plugin.premium && !isPrems) {
          fail?.('premium', m, this)
          continue
        }
        if (plugin.group && !m.isGroup) {
          fail?.('group', m, this)
          continue
        } else if (plugin.botAdmin && !isBotAdmin) {
          fail?.('botAdmin', m, this)
          continue
        } else if (plugin.admin && !isAdmin) {
          fail?.('admin', m, this)
          continue
        }
        if (plugin.private && m.isGroup) {
          fail?.('private', m, this)
          continue
        }
        if (plugin.register === true && _user?.registered === false) {
          fail?.('unreg', m, this)
          continue
        }

        m.isCommand = true
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17
        if (xp > 2000) {
          this.reply(m.chat, 'Exp limit', m).catch(() => {})
        } else if (plugin.money && (global.db.data.users?.[m.sender]?.money < (plugin.money * 1))) {
          fail?.('senzasoldi', m, this)
          continue
        }
        m.exp += xp

        if (!isPrems && plugin.limit && (global.db.data.users?.[m.sender]?.limit < plugin.limit * 1)) {
          continue
        }
        if ((plugin.level || 0) > (_user?.level || 0)) {
          this.reply(m.chat, `livello troppo basso`, m).catch(() => {})
          continue
        }

        const extra = {
          match,
          usedPrefix,
          noPrefix,
          _args,
          args,
          command,
          text,
          conn: this,
          normalizedParticipants,
          participants,
          groupMetadata,
          user,
          bot,
          isROwner,
          isOwner: isOwner2,
          isRAdmin,
          isAdmin,
          isBotAdmin,
          isPrems,
          chatUpdate,
          __dirname: ___dirname,
          __filename
        }

        try {
          await plugin.call(this, m, extra)
          if (!isPrems) {
            m.limit = m.limit || plugin.limit || false
            m.money = m.money || plugin.money || false
          }
        } catch (e) {
          m.error = e
          console.error(e)
          if (e) {
            let textErr = format(e)
            for (let key of Object.values(global.APIKeys || {})) {
              try { textErr = textErr.replace(new RegExp(key, 'g'), '#HIDDEN#') } catch {}
            }
            m.reply(textErr).catch(() => {})
          }
        } finally {
          if (typeof plugin.after === 'function') {
            try {
              await plugin.after.call(this, m, extra)
            } catch (e) {
              console.error(e)
            }
          }
        }
        break
      }
    }
  } catch (e) {
    console.error(e)
  } finally {
    if (opts?.['queque'] && m?.text) {
      const idx = this.msgqueque.indexOf(m.id || m.key?.id)
      if (idx !== -1) this.msgqueque.splice(idx, 1)
    }

    try {
      if (m?.sender) {
        let user = global.db.data.users?.[m.sender]
        let chat = global.db.data.chats?.[m.chat]
        if (user?.muto) {
          await this.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: false,
              id: m.key?.id,
              participant: m.key?.participant
            }
          }).catch(() => {})
        }
        if (user) {
          user.exp += m.exp || 0
          user.limit -= (m.limit * 1) || 0
          user.money -= (m.money * 1) || 0
          user.messaggi = (user.messaggi || 0) + 1
        }
        if (chat) chat.messaggi = (chat.messaggi || 0) + 1
      }

      if (m?.plugin) {
        const now = Date.now()
        if (!stats[m.plugin]) {
          stats[m.plugin] = { total: 0, success: 0, last: 0, lastSuccess: 0 }
        }
        const stat = stats[m.plugin]
        stat.total += 1
        stat.last = now
        if (!m.error) {
          stat.success += 1
          stat.lastSuccess = now
        }
      }
    } catch (e) {
      console.error(e)
    }

    try {
      if (!opts?.['noprint']) {
        const print = (await import('./lib/print.js')).default
        await print(m, this)
      }
    } catch (e) {
      console.log(m, m?.quoted, e)
    }

    if (opts?.['autoread'] && m?.key) {
      await this.readMessages([m.key]).catch(() => {})
    }
  }
}

export async function participantsUpdate({ id, participants, action }) {
  if (opts?.['self']) return
  if (this.isInit) return
  if (global.db?.data == null) await loadDatabase?.()
  const chats = (global.db.data.chats ||= {})
  let chat = chats[id] || {}

  // Benvenuto/Addio
  if (chat.welcome) {
    const meta = await this.groupMetadata(id).catch(() => null) || (this.chats?.[id] || {}).metadata || {}
    const list = Array.isArray(participants) ? participants : []
    for (let user of list) {
      let pp = './menu/principale.jpeg'
      try {
        pp = await this.profilePictureUrl(user, 'image')
      } catch {}
      let apii
      try {
        apii = await this.getFile(pp)
      } catch {
        apii = { data: fs.readFileSync('./menu/principale.jpeg') }
      }
      let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲-𝐁𝐨𝐭`
      let text = (action === 'add'
        ? (chat.sWelcome || this.welcome || this.conn?.welcome || 'Benvenuto, @user!')
            .replace('@subject', meta?.subject || '')
            .replace('@desc', (meta?.desc || 'bot') + '')
        : (chat.sBye || this.bye || this.conn?.bye || 'Addio, @user!'))
        .replace('@user', '@' + String(user || '').split('@')[0])
      await this.sendMessage(id, {
        text,
        contextInfo: {
          mentionedJid: [user].filter(Boolean),
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363422724720651@newsletter',
            serverMessageId: '',
            newsletterName: `${nomeDelBot}`
          },
          externalAdReply: {
            title: `${action === 'add' ? '𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐛𝐞𝐧𝐯𝐞𝐧𝐮𝐭𝐨' : '𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐚𝐝𝐝𝐢𝐨'}`,
            previewType: 'PHOTO',
            thumbnailUrl: ``,
            thumbnail: apii.data,
            mediaType: 1
          }
        }
      }).catch(() => {})
    }
  }
}

export async function groupsUpdate(groupsUpdate) {
  if (opts?.['self']) return
  const updates = Array.isArray(groupsUpdate) ? groupsUpdate : []
  for (const groupUpdate of updates) {
    const id = groupUpdate?.id
    if (!id) continue
    const chats = global.db?.data?.chats || {}
    let chat = chats[id] || {}
    let text = ''
    if (groupUpdate.icon) {
      text = (chat.sIcon || this.sIcon || this.conn?.sIcon || '`immagine modificata`').replace('@icon', groupUpdate.icon)
    }
    if (groupUpdate.revoke) {
      text = (chat.sRevoke || this.sRevoke || this.conn?.sRevoke || '`link reimpostato, nuovo link:`\n@revoke').replace('@revoke', groupUpdate.revoke)
    }
    if (!text) continue
    await this.sendMessage(id, { text, mentions: this.parseMention?.(text) || [] }).catch(() => {})
  }
}

export async function callUpdate(callUpdate) {
  const settings = global.db?.data?.settings || {}
  const selfJid = this?.user?.jid || this?.decodeJid?.(this?.user?.id || '') || 'self'
  let isAnticall = settings[selfJid]?.antiCall
  if (!isAnticall) return
  const list = Array.isArray(callUpdate) ? callUpdate : []
  for (let nk of list) {
    if (nk?.isGroup === false) {
      if (nk?.status === 'offer') {
        let callmsg = await this.reply(nk.from, `ciao @${String(nk.from || '').split('@')[0]}, c'è anticall.`, false, { mentions: [nk.from].filter(Boolean) }).catch(() => {})
        let vcard = `BEGIN:VCARD
VERSION:5.0
N:;𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲;;;
FN:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲
ORG:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲
TITLE:
item1.TEL;waid=393773842461:+39 3515533859
item1.X-ABLabel:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲
END:VCARD`
        await this.sendMessage(nk.from, { contacts: { displayName: 'Unlimited', contacts: [{ vcard }] } }, { quoted: callmsg }).catch(() => {})
        await this.updateBlockStatus(nk.from, 'block').catch(() => {})
      }
    }
  }
}

export async function deleteUpdate(message) {
  try {
    const { fromMe, id } = message || {}
    if (fromMe) return
    const loaded = this.loadMessage?.(id)
    if (!loaded) return
    let msg = this.serializeM?.(loaded)
    if (!msg) return
  } catch (e) {
    console.error(e)
  }
}

global.dfail = (type, m, conn) => {
  let msg = {
    rowner: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐬𝐨𝐥𝐨 𝐩𝐞𝐫 𝐨𝐰𝐧𝐞𝐫 🕵🏻‍♂️',
    owner: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐬𝐨𝐥𝐨 𝐩𝐞𝐫 𝐨𝐰𝐧𝐞𝐫 🕵🏻‍♂️',
    mods: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐥𝐨 𝐩𝐨𝐬𝐬𝐨𝐧𝐨 𝐮𝐭𝐢𝐥𝐢𝐳𝐳𝐚𝐫𝐞 𝐬𝐨𝐥𝐨 𝐚𝐝𝐦𝐢𝐧 𝐞 𝐨𝐰𝐧𝐞𝐫 ⚙️',
    premium: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐩𝐞𝐫 𝐦𝐞𝐦𝐛𝐫𝐢 𝐩𝐫𝐞𝐦𝐢𝐮𝐦 ✅',
    group: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐩𝐮𝐨𝐢 𝐮𝐭𝐢𝐥𝐢𝐳𝐳𝐚𝐫𝐥𝐨 𝐢𝐧 𝐮𝐧 𝐠𝐫𝐮𝐩𝐩𝐨 👥',
    private: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐩𝐮𝐨𝐢 𝐮𝐭𝐢𝐥𝐢𝐧𝐢𝐭𝐚𝐫𝐥𝐨 𝐢𝐧 𝐜𝐡𝐚𝐭 𝐩𝐫𝐢𝐯𝐚𝐭𝐚 👤',
    admin: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐩𝐞𝐫 𝐬𝐨𝐥𝐢 𝐚𝐝𝐦𝐢𝐧 👑',
    botAdmin: '𝐃𝐞𝐯𝐢 𝐝𝐚𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐚𝐥 𝐛𝐨𝐭 👑',
    restrict: '🔐 𝐑𝐞𝐬𝐭𝐫𝐢𝐜𝐭 𝐞 𝐝𝐢𝐬𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐨 🔐'
  }[type]
  if (msg) {
    return conn.sendMessage(m.chat, {
      text: ' ',
      contextInfo: {
        externalAdReply: {
          title: `${msg}`,
          body: ``,
          previewType: 'PHOTO',
          thumbnail: fs.readFileSync('./icone/accessdenied2.png'),
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })
  }
}

const file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'handler.js'"))
  if (global.reloadHandler) console.log(await global.reloadHandler())
})
