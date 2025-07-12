//give credits to pkdriller this is my own codes






const { cmd } = require('../command');
const config = require('../config');
const os = require('os');
const moment = require('moment-timezone');

// Calculate uptime
function formatUptime(ms) {
  const sec = Math.floor((ms / 1000) % 60);
  const min = Math.floor((ms / (1000 * 60)) % 60);
  const hr = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const day = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${day}d ${hr}h ${min}m ${sec}s`;
}

cmd({
  pattern: "uptime",
  desc: "Shows how long the bot has been running.",
  category: "main",
  react: "⏱️",
  filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
  try {
    const up = formatUptime(process.uptime() * 1000);
    const text = `*⏱️ UPTIME:* ${up}`;

    await conn.sendMessage(from, {
      text,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "Nexus tech",
          serverMessageId: 145
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
    reply(`❌ Error: ${err.message}`);
  }
});
            
