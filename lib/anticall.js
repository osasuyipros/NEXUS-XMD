// 🔕 Reject calls if anticall is enabled in config
conn.ev.on("call", async (callData) => {
  if (!config.ANTICALL || config.ANTICALL !== 'true') return;
  for (let call of callData) {
    if (call.status === "offer") {
      await conn.rejectCall(call.id, call.from); // Reject the call
      await conn.sendMessage(call.from, {
        text: `🚫 Calls are not allowed on this bot. You have been blocked!\n\nContact the owner to get unblocked.`,
      });
      await conn.updateBlockStatus(call.from, "block"); // Optional: block the caller
      console.log(`❌ Call rejected and blocked: ${call.from}`);
    }
  }
});
