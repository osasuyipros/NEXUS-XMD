const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "getdp",
    alias: ["getpp", "pp", "profilepic"],
    use: '.getdp (reply to user)',
    desc: "Get profile picture of the person you replied to.",
    category: "main",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        // Ensure this command is used as a reply
        if (!quoted) {
            return reply('❌ Please reply to a user\'s message to get their profile picture!');
        }

        const targetJid = quoted.sender || quoted.participant || quoted.key?.participant || quoted.key?.remoteJid;
        if (!targetJid) {
            return reply('Could not determine the user to get the profile picture from.');
        }

        try {
            // Get the profile picture URL
            const pfpUrl = await conn.profilePictureUrl(targetJid, 'image');
            if (!pfpUrl) throw new Error('No profile picture found.');

            await conn.sendMessage(from, { image: { url: pfpUrl }, caption: `Here is the profile picture of @${targetJid.split('@')[0]}`, mentions: [targetJid] }, { quoted: mek });
        } catch (err) {
            reply('❌ Could not fetch profile picture. The user may not have a profile picture or privacy settings restrict access.');
        }
    } catch (e) {
        console.error("Error in getdp command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
