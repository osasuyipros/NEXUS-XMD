const { cmd } = require('../command');

cmd({
    pattern: "online1",
    alias: ["whosonline", "onlinemembers"],
    desc: "Check who's online in the group (Admins & Owner only)",
    category: "main",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isGroup, isAdmins, isCreator, fromMe, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in a group!");
        if (!isCreator && !isAdmins && !fromMe) {
            return reply("❌ Only bot owner and group admins can use this command!");
        }

        await reply("🔄 Scanning for online members... Please wait up to 30 seconds.");

        const onlineMembers = new Set();
        const groupData = await conn.groupMetadata(from);

        // Helper to safely check presence
        const isOnlineState = (presence) => 
            ['available', 'composing', 'recording', 'online', 'recently active'].includes((presence || '').toLowerCase());

        // Try to subscribe and nudge presence updates multiple times
        const maxRounds = 4;
        const delay = (ms) => new Promise(res => setTimeout(res, ms));

        for (let round = 0; round < maxRounds; round++) {
            // Subscribe and nudge
            await Promise.all(
                groupData.participants.map(async participant => {
                    try {
                        await conn.presenceSubscribe(participant.id);
                        await conn.sendPresenceUpdate('composing', participant.id);
                        // (Optional: nudge with 'recording'/'available' too)
                    } catch {}
                })
            );
            await delay(2500); // wait a bit for presences to come in

            // Fetch presence data if available
            let presenceData;
            try {
                presenceData = await conn.fetchPresence(from);
            } catch {}
            if (presenceData && presenceData.presences) {
                for (const [id, presObj] of Object.entries(presenceData.presences)) {
                    if (isOnlineState(presObj?.lastKnownPresence)) {
                        onlineMembers.add(id);
                    }
                }
            }

            // Optionally, break early if enough online members found
            if (onlineMembers.size > 2 || round === maxRounds - 1) break;
        }

        // Fallback: include recent senders (from group messages, if available)
        if (m && m.participant) onlineMembers.add(m.participant);

        // Format and send result
        if (onlineMembers.size === 0) {
            return reply("⚠️ Couldn't detect any online members. They might be hiding their presence or presence info is restricted.");
        }
        const onlineArray = Array.from(onlineMembers);
        const onlineList = onlineArray.map((member, idx) => `${idx + 1}. @${member.split('@')[0]}`).join('\n');
        const message = `🟢 *NEXUS-XMD ONLINE MEMBERS* (${onlineArray.length}/${groupData.participants.length}):\n\n${onlineList}`;
        await conn.sendMessage(from, { 
            text: message,
            mentions: onlineArray
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in online command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
