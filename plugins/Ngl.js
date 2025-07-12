const axios = require("axios");
const { cmd } = require("../command");

const YOUR_NGL_USERNAME = "pkdriller2"; // Change this if needed

cmd({
  pattern: "ngl",
  desc: "Send anonymous message to NGL inbox",
  category: "fun",
  react: "📨",
  filename: __filename
}, async (conn, mek, m, { from, sender, q, reply }) => {
  if (!q) return reply("✉️ *Usage:* .ngl your anonymous message");

  try {
    const body = {
      question: q,
      deviceId: generateDeviceId(),
      gameSlug: "",
      referrer: ""
    };

    const response = await axios.post(`https://ngl.link/api/submit`, body, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "NGL/6.1.3 (iPhone; iOS 15.2; Scale/2.00)"
      },
      params: {
        username: YOUR_NGL_USERNAME
      }
    });

    if (response.data.success) {
      await conn.sendMessage(from, {
        text: `✅ Your anonymous message was sent successfully to *@${YOUR_NGL_USERNAME}*'s inbox.`,
        contextInfo: getContext(sender)
      }, { quoted: getVerifiedQuote() });
    } else {
      throw new Error("NGL did not confirm message success.");
    }

  } catch (err) {
    console.error(err);
    reply(`❌ Failed to send message. NGL might be blocking or rate-limiting.`);
  }
});

// Random device ID generator (to bypass spam block)
function generateDeviceId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 36; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// Fake verified contact
function getVerifiedQuote() {
  return {
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
  };
}

// Forwarded context
function getContext(jid) {
  return {
    mentionedJid: [jid],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "Nexus tech",
      serverMessageId: 154
    }
  };
      }
                             
