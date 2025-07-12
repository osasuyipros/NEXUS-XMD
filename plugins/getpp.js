const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
  pattern: "getp",
  category: "tools",
  filename: __filename
}, async (msg, match, m, sock) => {
  const quoted = m.quoted;

  if (!quoted) {
    return msg.reply("❌ You must *reply* to someone's message to get their profile picture.");
  }

  const userJid = quoted.sender;

  try {
    const ppUrl = await sock.profilePictureUrl(userJid, 'image').catch(() => null);
    const bio = await sock.fetchStatus(userJid).catch(() => ({ status: "No bio found" }));
    const ppRes = await fetch(ppUrl);
    const ppBuffer = await ppRes.buffer();

    // Send the profile pic with fake verified quote
    await sock.sendMessage(
      m.chat,
      {
        image: ppBuffer,
        caption: `👤 *Profile Picture of* @${userJid.split('@')[0]}\n\n📌 *Bio:* ${bio.status || "Not set"}`,
        contextInfo: {
          mentionedJid: [userJid],
          externalAdReply: {
            title: "pkdriller (verified)",
            body: bio.status || "WhatsApp user",
            thumbnailUrl: ppUrl,
            mediaType: 1,
            renderLargerThumbnail: true,
            showAdAttribution: true,
            sourceUrl: "https://wa.me/" + userJid.split('@')[0]
          }
        }
      },
      { quoted: quoted }
    );

  } catch (error) {
    console.error(error);
    msg.reply("❌ Failed to fetch profile picture or bio.");
  }
});
