const config = require('../config');
const { cmd, commands } = require('../command');
const fetch = require('node-fetch');

cmd({
    pattern: "checkcountry",
    alias: ["countrycode", "ccode"],
    use: '.checkcountry <countrycode>',
    desc: "Show country name for the given country code using live data.",
    category: "main",
    react: "🌍",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply, args }) => {
    try {
        if (!args[0]) {
            return reply('Please provide a country code. Example: .checkcountry 254');
        }
        let code = args[0].replace(/[^0-9]/g, '');
        // The REST Countries API expects phone code with "+"
        let apiUrl = `https://restcountries.com/v3.1/callingcode/${code}`;
        let response = await fetch(apiUrl);
        if (!response.ok) {
            return reply('Sorry, could not fetch country data. Please try again.');
        }
        let data = await response.json();
        if (!data || !data[0] || !data[0].name || !data[0].name.common) {
            return reply('Unknown country code.');
        }
        let country = data[0].name.common;
        reply(`🌍 Country code *+${code}* belongs to: *${country}*`);
    } catch (e) {
        console.error("Error in checkcountry command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
