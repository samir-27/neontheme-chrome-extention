chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_SUGGESTIONS") {
    fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(msg.query)}`)
      .then(res => res.json())
      .then(data => {
        sendResponse(
          Array.isArray(data)
            ? data.map(item => item.phrase)
            : []
        );
        console.log("Background service worker loaded");

      })
      .catch(err => {
        console.error("BG fetch error:", err);
        sendResponse([]);
      });

    return true; // 🔴 REQUIRED
  }
});
