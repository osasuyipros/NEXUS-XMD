const config = require('../config');

async function handleAnticall(sock, update) {
    if (config.ANTICALL !== 'true') return;

    for (const call of update) {
        const callerId = call.from;
        if (call.status === 'offer') {
            console.log(`Rejected a call from: ${callerId}`);
            await sock.sendMessage(callerId, {
                text: `🚫 *Calling the bot is not allowed!*\nPlease send a message instead. Contact the owner if it's important: wa.me/${config.OWNER_NUMBER}`,
            });

            // Reject the call using the WebSocket
            await sock.rejectCall(call.id, call.from);
        }
    }
}

module.exports = handleAnticall;
