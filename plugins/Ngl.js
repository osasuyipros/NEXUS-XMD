const { cmd, commands } = require("../command");
const fs = require("fs-extra");

let antispamOn = true;

// Command to toggle antispam globally (optional)
cmd({
  pattern: "antispam",
  desc: "Toggle antispam filter",
  category: "moderation",
  react: "🛡️",
  filename: __filename
}, async (conn, mek, m, { from, isOwner, args, reply }) => {
  if (!isOwner) return reply("❗Owner only.");
  const mode = args[0]?.toLowerCase();
  if (!["on", "off"].includes(mode)) return reply("Usage: .antispam on/off");
  antispamOn = mode === "on";
  return reply(`✅ Antispam is now *${mode.toUpperCase()}*`);
});

// Global message filter
commands.before.push(async (conn, mek, m, { from, sender, isGroup, isAdmins, isBotAdmins, message, type }) => {
  if (!antispamOn) return;

  const body = m.body || "";
  const lower = body.toLowerCase();

  // Define rules
  const badWords = ["fuck", "shit", "bitch", "nigga", "pussy", "dick", "motherfucker", "toto", "matako", "kuma", "mboro", "fuckyou"];
  const botCommands = /^\.[a-zA-Z0-9]/;
  const linkRegex = /https?:\/\/|wa\.me\/|chat\.whatsapp\.com/;
  const stickerMatusi = ["kuma", "fuck", "shit"]; // Optional scan sticker emojis later

  let shouldKick = false;

  if (type === "stickerMessage") {
    shouldKick = true; // assume offensive sticker (optional: scan sticker emoji if needed)
  }

  if (linkRegex.test(lower) || badWords.some(w => lower.includes(w)) || botCommands.test(lower)) {
    if (isGroup && !isAdmins) {
      shouldKick = true;
    } else if (!isGroup) {
      // In private
      await conn.sendMessage(from, {
        text: `🚫 You're blocked for sending spam/matusi.`,
        contextInfo: { mentionedJid: [sender] }
      }, { quoted: getVerifiedQuote() });
      return await conn.updateBlockStatus(sender, "block");
    }
  }

  if (shouldKick) {
    if (isGroup && isBotAdmins) {
      await conn.sendMessage(from, {
        text: `🚫 @${sender.split("@")[0]} removed for breaking rules.`,
        contextInfo: { mentionedJid: [sender] }
      }, { quoted: getVerifiedQuote() });

      await conn.groupParticipantsUpdate(from, [sender], "remove");
    } else if (isGroup && !isBotAdmins) {
      await conn.sendMessage(from, {
        text: `⚠️ Spam detected from @${sender.split("@")[0]}, but I'm not admin.`,
        contextInfo: { mentionedJid: [sender] }
      });
    }
  }
});

function getVerifiedQuote() {
  return {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "NEXUS-XMD",
        vcard: [
          "BEGIN:VCARD",
          "VERSION:3.0",
          "FN:NEXUS-XMD",
          "ORG:Verified Contact",
          "TEL;waid=1234567890:+1 234 567 890",
          "END:VCARD"
        ].join("\n")
      }
    }
  };
                    }
  
