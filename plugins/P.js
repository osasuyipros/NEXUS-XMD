const config = require('../config');
const { cmd, commands } = require('../command');
const moment = require('moment-timezone'); // Ensure this is installed

cmd({
    pattern: "calendar",
    alias: ["time", "date", "day"],
    use: '.calendar',
    desc: "Show actual time, date, and country of the person who used the command.",
    category: "main",
    react: "🗓️",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply, pushname }) => {
    try {
        // Try to get user's country from WhatsApp metadata (if available)
        let country = 'Unknown Country';
        if (m && m.senderNumber) {
            // Example: +254712345678 → 254
            let countryCode = m.senderNumber.replace(/[^0-9]/g, '').slice(0, 3);
            // You can use a country code map. Add more codes as needed.
            const countryMap = {
                '254': 'Kenya',
                '255': 'Tanzania',
                '256': 'Uganda',
                '234': 'Nigeria',
                '233': 'Ghana',
                '91': 'India',
                '1': 'USA/Canada',
                // Add more mappings as needed
            };
            country = countryMap[countryCode] || 'Unknown Country';
        }

        // Get current time in user's timezone (fallback to UTC if unknown)
        const now = moment().tz('Africa/Nairobi'); // Change default zone as you prefer
        const formatted = now.format('dddd, MMMM Do YYYY, h:mm:ss a z');

        const text = `🗓️ *Calendar Info*\n\n👤 Name: ${pushname || 'User'}\n🌍 Country: ${country}\n📅 Date: ${formatted}`;

        await conn.sendMessage(from, { text }, { quoted: mek });
    } catch (e) {
        console.error("Error in calendar command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
