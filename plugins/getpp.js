const { cmd } = require('../command');
const config = require('../config');
const fetch = require('node-fetch');

cmd({
  pattern: "phish",
  category: "tools",
  filename: __filename
}, async (message, match, m, sock) => {
  const replied = m.quoted;

  if (!replied) {
    return message.reply("❌ Please reply to someone's message to get their profile picture.");
  }

  const user = replied.sender;

  try {
    const ppUrl = await sock.profilePictureUrl(user, 'image').catch(() => null);
    const status = await sock.fetchStatus(user).catch(() => ({ status: "No bio found" }));

    const res = await fetch(ppUrl);
    const buffer = await res.arrayBuffer();

    // Fake quoted message with verified style
    const fakeQuoted = {
      key: {
        fromMe: false,
        participant: user,
        remoteJid: m.chat
      },
      message: {
        extendedTextMessage: {
          text: "Send my profile picture 😎",
          contextInfo: {
            externalAdReply: {
              title: "pkdriller (verified)",
              body: status.status || "WhatsApp User",
              thumbnailUrl: ppUrl,
              mediaType: 1,
              renderLargerThumbnail: true,
              showAdAttribution: true,
              sourceUrl: "https://wa.me/" + user.split("@")[0]
            }
          }
        }
      }
    };

    await sock.sendMessage(
      m.chat,
      {
        image: Buffer.from(buffer),
        caption: `🖼️ Profile picture of @${user.split('@')[0]}\n\n📌 Bio:\n${status.status || "Not set"}`,
        contextInfo: {
          mentionedJid: [user]
        }
      },
      { quoted: fakeQuoted }
    );

  } catch (e) {
    console.error(e);
    message.reply("❌ Failed to get profile picture or bio.");
  }
});
      
