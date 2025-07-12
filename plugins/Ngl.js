const axios = require("axios");
const { cmd } = require("../command");

const NGL_USERNAME = "pkdriller2";

cmd({
  pattern: "ngl",
  desc: "Send anonymous message to your NGL inbox",
  category: "fun",
  react: "📤",
  filename: __filename
}, async (conn, mek, m, { from, q, sender, reply }) => {
  if (!q) return reply("❗ Usage: `.ngl your message here`");

  try {
    // Reverse-engineered NGL submission endpoint (community approach) :contentReference[oaicite:3]{index=3}
    const res = await axios.post(`https://ngl.link/api/submit`, {
      username: NGL_USERNAME,
      question: q,
      device: "web"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (res.data?.success) {
      await conn.sendMessage(from, {
        text: `✅ Your anonymous message was delivered to *@${NGL_USERNAME}*'s inbox.`,
        contextInfo: getContext(sender)
      }, { quoted: getVerifiedQuote() });
    } else {
      throw new Error("NGL responded without success");
    }

  } catch (err) {
    console.error("NGL Error:", err);
    reply("❌ Failed to send anonymous message — NGL API may have changed or blocked requests.");
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
          "TEL;type=CELL;type=VOICE;waid=1234567890:+1 234 567 890",
          "END:VCARD"
        ].join("\n")
      }
    }
  };
}

function getContext(jid) {
  return {
    mentionedJid: [jid],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "Nexus tech",
      serverMessageId: 160
    }
  };
    }
