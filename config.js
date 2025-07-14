const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUxjcHY3aEVPN2NrRXcwS2VYWUdhRTZlaFNpOGdSREZKc3UrNHlWS1RsMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHJsa09HellEVHBaZGh2TmhvbmpPQ2RUdzFGRFM5YVpZSVFrZWxhVWdtRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBR0x5b09iTnpVZ1Q0T2t1ellROHU0SDZmUit2ZE5FZmRsYWVEY25TVjFZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRU9QMmcyZ3B3UTB1Mi9DOUk2L09aQVlMWDlZQ1dMRWhDNkZ4TnI2VWdJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFDVzhYaXgwOUtnM3JSV1RNaU9pR3RIajFPMXpsWkd3L0lRZEtjT2ZWMU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVrdENlTVdGSUpPVmNsdzkxT3F6cy8yQ3puS0FuMXhZcko0cStSQVgvazA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU1RRW5EZFQyM3JLVnNlZ05pOUcvUWZWZTZ3Zi91aUNrcDdtQU9hMXcwVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU3dZY1FaTjFtODFQYzV5dU9FeFZ1bzJKbmt1TGhHeklHalhabkRNRVVXTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9DeGZHeVl0cGt6N3BTN3BVbU54L3BLZ255QTVVSzNWRzRXZ2NPeXhLZjQ3RmlJZVhmNWRTOWgzSGRadDk5OStKdUFNdm9ZZkZ6VXlhSU5hay8reUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcsImFkdlNlY3JldEtleSI6IjZMbXNvQndraVJvZGliOFB2Vmxlb1pCY0VxK1Y5Y3F4UEtsVEgyc0huck09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTExNjM3MDk2NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0NUJBQUJBMUM3RjI5NjFGQUY4Mzk3NDFGRTdEODQ5QSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyNDMyNTc3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MTE2MzcwOTY2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjIzQzJCM0E3ODJCNDZFREY0QTFFQjExQzE1RTJGQzgyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI0MzI1ODR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxMTYzNzA5NjZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDNDMERGQ0FGMTlDMEU0RDE1QThFQUE1ODZGMDhDQUMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjQzMjYxMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUjlNS1g0VFYiLCJtZSI6eyJpZCI6IjIzNDkxMTYzNzA5NjY6MjJAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyNzg0OTQ1MjExMTg4ODA6MjJAbGlkIiwibmFtZSI6IuKCseKxpMOY4oK04oKxyYbisaQg4Li/4oKu4oK18J+agCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHUyamtzUXJmL1B3d1lZQlNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTTlRVkp2RmpSQ0dsTlBBZFhBM202Z0M0bVNjR1RKMHg1a3FvRGI4UzdqYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRnZ1ZTFxWkVtNldjdnJqdnR0WGwvNDFoUHVvUy91c0x3K3JTNy9mUlFETE1GZEFmYUMzc2lEc1pVZ0NYaXBVcDRnbkNnV3pRRkU4TFBvRytBVVlHQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6ImY1WGR6QmllTm1QK3B6eTJhbVhrUmpSNVE3alZ0YTJKeXJCUkFNTUpIaTVGcGRHYUhOMWhMQmwzK3FGeGxjV0ZMOTk1MWNtbEJxRFoxMmRtVDd3K0R3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTExNjM3MDk2NjoyMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUUFVGU2J4WTBRaHBUVHdIVndONXVvQXVKa25Ca3lkTWVaS3FBMi9FdTQzIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTI0MzI1NzEsImxhc3RQcm9wSGFzaCI6Im5tM0JiIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNaXcifQ==",
// add your Session Id 
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY NEXUS-XMD🤍*",
// set the auto reply massage on status reply  
WELCOME: process.env.WELCOME || "true",
// true if want welcome and goodbye msg in groups    
ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
// make true to know who dismiss or promoted a member in group
ANTI_LINK: process.env.ANTI_LINK || "true",
// make anti link true,false for groups 
ANTICALL: process.env.ANTICALL || "true",
 // make this true if you want bot to reject incoming calls
MENTION_REPLY: process.env.MENTION_REPLY || "false",
// make true if want auto voice reply if someone menetion you 
MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://files.catbox.moe/z62ts0.jpg",
// add custom menu and mention reply image url
PREFIX: process.env.PREFIX || ".",
// add your prifix for bot   
BOT_NAME: process.env.BOT_NAME || "NEXUS-XMD",
// add bot namw here for menu
STICKER_NAME: process.env.STICKER_NAME || "NEXUS-XMD",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "true",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "254794146821",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "Pkdriller",
// add bot owner name
DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ Pkdriller*",
// add bot owner name    
ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/z62ts0.jpg",
// add img for alive msg
LIVE_MSG: process.env.LIVE_MSG || "> Zinda Hun Yar *NEXUS-XMD*⚡",
// add alive msg here 
READ_MESSAGE: process.env.READ_MESSAGE || "false",
// Turn true or false for automatic read msgs
AUTO_REACT: process.env.AUTO_REACT || "false",
// make this true or false for auto react on all msgs
ANTI_BAD: process.env.ANTI_BAD || "false",
// false or true for anti bad words  
MODE: process.env.MODE || "public",
// make bot public-private-inbox-group 
ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "true",
// make anti link true,false for groups 
AUTO_VOICE: process.env.AUTO_VOICE || "false",
// make true for send automatic voices
AUTO_STICKER: process.env.AUTO_STICKER || "false",
// make true for automatic stickers 
AUTO_REPLY: process.env.AUTO_REPLY || "false",
// make true or false automatic text reply 
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
// maks true for always online 
PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
// make false if want private mod
AUTO_TYPING: process.env.AUTO_TYPING || "false",
// true for automatic show typing   
READ_CMD: process.env.READ_CMD || "false",
// true if want mark commands as read 
DEV: process.env.DEV || "254794146821",
//replace with your whatsapp number        
ANTI_VV: process.env.ANTI_VV || "true",
// true for anti once view 
ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "log", 
// change it to 'same' if you want to resend deleted message in same chat 
AUTO_RECORDING: process.env.AUTO_RECORDING || "false"
// make it true for auto recoding 
};
