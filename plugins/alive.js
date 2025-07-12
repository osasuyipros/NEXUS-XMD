//give credits to pkdriller 

const os = require("os");
const moment = require("moment-timezone");
const { cmd } = require("../command");
const config = require("../config");

cmd({
  pattern: "alive",
  alias: ["bot", "status"],
  desc: "Shows bot status and uptime.",
  category: "main",
  react: "💡",
  filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
  try {
    const uptime = process.uptime() * 1000;
    const formatUptime = (ms) => {
      const d = Math.floor(ms / (1000 * 60 * 60 * 24));
      const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
      const m = Math.floor((ms / (1000 * 60)) % 60);
      const s = Math.floor((ms / 1000) % 60);
      return `${d}d ${h}h ${m}m ${s}s`;
    };

    const aliveText = `🎯 *NEXUS-XMD IS ONLINE*\n\n` +
      `🧠 *Uptime:* ${formatUptime(uptime)}\n` +
      `👑 *Owner:* ${config.OWNER_NAME || "Nexus Dev"}\n` +
      `🌐 *Host:* ${os.hostname()}\n` +
      `💾 *RAM:* ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB\n` +
      `🧬 *Platform:* ${os.platform().toUpperCase()}`;

    await conn.sendMessage(from, {
      text: aliveText,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "Nexus tech",
          serverMessageId: 150
        }
      }
    }, {
      quoted: {
        key: {
          fromMe: false,
          participant: '0@s.whatsapp.net',
          remoteJid: "status@broadcast"
        },
        message: {
          contactMessage: {
            displayName: "NEXUS-XMD",
            vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:Verified Contact\nTEL;type=CELL;type=VOICE;waid=1234567890:+1 234 567 890\nEND:VCARD"
          }
        }
      }
    });

  } catch (err) {
    reply(`❌ Error in alive: ${err.message}`);
  }
});
