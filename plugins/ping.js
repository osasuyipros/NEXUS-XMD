const { cmd } = require('../command');

cmd({
  pattern: "ping",
  alias: ["speed", "pong"],
  desc: "Check bot response speed",
  category: "main",
  react: "⚡",
  filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
  try {
    const start = Date.now();

    // React with an emoji
    const emojis = ['⚡', '🚀', '📡', '🔥', '💥', '📶', '🕐'];
    const reaction = emojis[Math.floor(Math.random() * emojis.length)];
    await conn.sendMessage(from, {
      react: { text: reaction, key: mek.key }
    });

    const end = Date.now();
    const ping = end - start;

    const text = `> *NEXUS-XMD PING:* ${ping}ms ${reaction}`;

    // Send response with fake verified quote and context
    await conn.sendMessage(from, {
      text,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "Nexus tech",
          serverMessageId: 202
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
      }
    });

  } catch (err) {
    console.error("❌ Ping Error:", err);
    reply("An error occurred while measuring ping.");
  }
});
        
