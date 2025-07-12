const { cmd } = require("../command");
const scrape = require("website-scraper");
const PuppeteerPlugin = require("website-scraper-puppeteer");
const fs = require("fs-extra");
const archiver = require("archiver");
const path = require("path");

cmd({
  pattern: "phish",
  desc: "Clone full website and download as ZIP",
  category: "tools",
  react: "📡",
  filename: __filename
}, async (conn, mek, m, { from, q, sender, reply }) => {
  if (!q || !q.startsWith("http")) {
    return reply("❗Usage: `.phish https://example.com`");
  }

  const site = q.trim();
  const folderName = `./tmp/${Date.now()}_cloned`;
  const zipPath = `${folderName}.zip`;

  try {
    await scrape({
      urls: [site],
      directory: folderName,
      plugins: [new PuppeteerPlugin()]
    });

    await zipDir(folderName, zipPath);

    await conn.sendMessage(from, {
      document: { url: zipPath },
      mimetype: "application/zip",
      fileName: "website_clone.zip",
      caption: `✅ Site cloned from: ${site}`,
      contextInfo: getContext(sender)
    }, { quoted: getVerifiedQuote() });

    await fs.remove(folderName);
    await fs.remove(zipPath);

  } catch (e) {
    console.error(e);
    reply("❌ Failed to clone. Site may have advanced protection or puppeteer error.");
  }
});

async function zipDir(srcDir, zipFilePath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", resolve);
    archive.on("error", reject);

    archive.pipe(output);
    archive.directory(srcDir, false);
    archive.finalize();
  });
}

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
        vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:Verified Contact\nTEL;waid=1234567890:+1 234 567 890\nEND:VCARD"
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
      serverMessageId: 162
    }
  };
                                      }
                     
