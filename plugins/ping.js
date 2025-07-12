const { cmd } = require("../command");

cmd({
  pattern: "ping",
  alias: ["speed", "pong"],
  desc: "Check bot response speed",
  category: "main",
  react: "📡",
  filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
  try {
    const start = Date.now();

    const emojiList = ['🚀', '⚡️', '💥', '🎯', '📶', '🌀'];
    const reactionEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

    await conn.sendMessage(from, {
      react: { text: reactionEmoji, key: mek.key }
    });

    const end = Date.now();
    const ping = end - start;

    await conn.sendMessage(from, {
      text: `> *NEXUS-XMD PING:* ${ping}ms ${reactionEmoji}`,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "Nexus tech",
          serverMessageId: 201
        }
      }
    }, { quoted: getVerifiedQuote() });

  } catch (err) {
    console.error("Ping error:", err);
    reply("❌ Error: " + err.message);
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
