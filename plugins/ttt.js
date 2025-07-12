const { cmd } = require('../command');

cmd({
  pattern: "ttt",
  alias: ["tictactoe"],
  desc: "Play Tic-Tac-Toe with a friend",
  category: "games",
  react: "🎮",
  filename: __filename
}, async (conn, mek, m, { from, sender, quoted, mentionByTag, reply }) => {
  const opponent = mentionByTag && mentionByTag[0];
  if (!opponent) return reply("❗Mention a user to challenge. Example: .ttt @user");

  if (opponent === sender) return reply("🙄 You can't challenge yourself.");
  if (opponent === conn.user.id) return reply("😂 I'm not playing. Find a friend.");

  await conn.sendMessage(from, {
    text: `🎮 @${sender.split("@")[0]} has challenged @${opponent.split("@")[0]} to a game of *Tic-Tac-Toe*.\nType *yes* to accept.`,
    mentions: [sender, opponent],
    contextInfo: getContext(sender)
  }, { quoted: getVerifiedQuote() });

  try {
    const res = await conn.awaitForMessage({
      chatJid: from,
      sender: opponent,
      timeout: 30000
    });

    const msg = res.message?.conversation?.toLowerCase() || res.message?.extendedTextMessage?.text?.toLowerCase();
    if (msg !== 'yes') return reply("❌ Challenge not accepted.");

    const board = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];
    let turn = sender;
    let winner = null;

    while (!winner) {
      const display = board.map(r => r.join(" | ")).join("\n---------\n");
      await conn.sendMessage(from, {
        text: `🎮 *Tic-Tac-Toe*\n\n${display}\n\n@${turn.split("@")[0]}'s turn. Choose a number (1–9).`,
        mentions: [turn],
        contextInfo: getContext(turn)
      }, { quoted: getVerifiedQuote() });

      const move = await conn.awaitForMessage({
        chatJid: from,
        sender: turn,
        timeout: 30000
      });

      const choice = move.message?.conversation?.trim();
      const flat = board.flat();
      const index = flat.indexOf(choice);

      if (index === -1 || choice === "X" || choice === "O") {
        await reply("❗ Invalid move. Try again.");
        continue;
      }

      const symbol = turn === sender ? "X" : "O";
      const row = Math.floor(index / 3);
      const col = index % 3;
      board[row][col] = symbol;

      if (checkWin(board, symbol)) {
        winner = turn;
        break;
      }

      if (board.flat().every(c => c === "X" || c === "O")) break;

      turn = turn === sender ? opponent : sender;
    }

    const finalBoard = board.map(r => r.join(" | ")).join("\n---------\n");
    const endMsg = winner
      ? `🏆 Game Over! @${winner.split("@")[0]} wins!\n\n${finalBoard}`
      : `🤝 It's a draw!\n\n${finalBoard}`;

    await conn.sendMessage(from, {
      text: endMsg,
      mentions: [sender, opponent],
      contextInfo: getContext(winner || sender)
    }, { quoted: getVerifiedQuote() });

  } catch (err) {
    await reply("⏱️ Game cancelled or timed out.");
  }
});

// Game logic check
function checkWin(b, s) {
  return (
    [0, 1, 2].some(i => b[i][0] === s && b[i][1] === s && b[i][2] === s) ||
    [0, 1, 2].some(i => b[0][i] === s && b[1][i] === s && b[2][i] === s) ||
    (b[0][0] === s && b[1][1] === s && b[2][2] === s) ||
    (b[0][2] === s && b[1][1] === s && b[2][0] === s)
  );
}

// Fake quoted message (verified contact)
function getVerifiedQuote() {
  return {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "NEXUS-XMD",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:Verified Contact\nTEL;type=CELL;type=VOICE;waid=1234567890:+1 234 567 890\nEND:VCARD"
      }
    }
  };
}

// Context with fake forward + channel
function getContext(jid) {
  return {
    mentionedJid: [jid],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "Nexus tech",
      serverMessageId: 151
    }
  };
      }
      
