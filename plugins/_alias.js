/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

const {
    generateWAMessage,
    areJidsSameUser,
    proto
} = await (await import('@adiwajshing/baileys')).default

const handler = m => m;

handler.before = async function(m, { conn }) {
    conn.sendAliasMessage = async(jid, mess = {}, alias = {}, quoted = {}) => {
        function check(arr) {
            if (!Array.isArray(arr)) {
                return false;
            }
            if (!arr.length) {
                return false;
            }
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                if (typeof item !== 'object' || item === null) {
                    return false;
                }
                if (!Object.prototype.hasOwnProperty.call(item, 'alias')) {
                    return false;
                }
                if (!Array.isArray(item.alias) && typeof item.alias !== 'string') {
                    return false;
                }
                if (Object.prototype.hasOwnProperty.call(item, 'response') && typeof item.response !== 'string') {
                    return false;
                }
                if (Object.prototype.hasOwnProperty.call(item, 'eval') && typeof item.eval !== 'string') {
                    return false;
                }
            }
            return true;
        }
        if (!check(alias)) return "Alias format is not valid!";
        let message = await conn.sendMessage(jid, mess, { quoted });
        if (typeof db.data.bots.alias[jid] === 'undefined') db.data.bots.alias[jid] = {};
        db.data.bots.alias[jid][message.key.id] = { chat: jid, id: message.key.id, alias };
        return message;
    };

    conn.sendInputMessage = async(jid, mess = {}, target = 'all', timeout = 60000, quoted = {}) => {
        let time = Date.now();
        let message = await conn.sendMessage(jid, mess, { quoted });
        if (typeof db.data.bots.input[jid] === 'undefined') db.data.bots.input[jid] = {};
        db.data.bots.input[jid][message.key.id] = { chat: jid, id: message.key.id, target };

        while (((Date.now() - time) < timeout) && !db.data.bots.input[jid][message.key.id].hasOwnProperty("input")) await sleep(500);

        return db.data.bots.input[jid][message.key.id].input;
    };

    if (typeof db.data.bots.alias === 'undefined') db.data.bots.alias = {};
    if (typeof db.data.bots.input === 'undefined') db.data.bots.input = {};

    if (m.quoted) {
        const quotedId = m.quoted.id;
        if (db.data.bots.input[m.chat]?.[quotedId]?.target === 'all' || db.data.bots.input[m.chat]?.[quotedId]?.target === m.sender) {
            db.data.bots.input[m.chat][quotedId].input = m.text;
        }
        if (db.data.bots.alias.hasOwnProperty(m.chat)) {
            if (db.data.bots.alias[m.chat].hasOwnProperty(quotedId)) {
                for (const aliasObj of db.data.bots.alias[m.chat][quotedId].alias) {
                    if (Array.isArray(aliasObj.alias) && !aliasObj.alias.map(v => v.toLowerCase()).includes(m.text.toLowerCase())) continue;
                    else if (aliasObj.alias.toLowerCase() !== m.text.toLowerCase()) continue;
                    else {
                        if (aliasObj.response) await appenTextMessage(aliasObj.response, conn, m);
                        if (aliasObj.eval) await eval(aliasObj.eval);
                    }
                }
            }
        }
    }
};

export default handler;

const appenTextMessage = async(text, conn, m) => {
    let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
        userJid: conn.user.id,
        quoted: m.quoted && m.quoted.fakeObj
    });
    messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id);
    messages.key.id = m.key.id;
    messages.pushName = m.pushName;
    if (m.isGroup) messages.participant = m.sender;
    let msg = {
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: 'append'
    };
    conn.ev.emit('messages.upsert', msg);
};

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
