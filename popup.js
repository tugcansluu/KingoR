function updateUI(active, seconds) {
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  const input = document.getElementById('secondInput');

  if (active) {
    dot.classList.add('active-mode');
    text.innerText = "Yenileme Aktif";
    text.style.color = "#34c759";
    if (seconds) input.value = seconds;
  } else {
    dot.classList.remove('active-mode');
    text.innerText = "Sistem Hazır";
    text.style.color = "#86868b";
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.storage.local.get(["refreshData"], (result) => {
    const data = result.refreshData || {};
    if (data[tab.id] && data[tab.id].active) {
      updateUI(true, data[tab.id].seconds);
    } else {
      updateUI(false);
    }
  });
});

document.getElementById('startBtn').addEventListener('click', async () => {
  const seconds = parseInt(document.getElementById('secondInput').value);
  if (!seconds || seconds <= 0) return;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.storage.local.get(["refreshData"], (result) => {
    const data = result.refreshData || {};
    data[tab.id] = { active: true, seconds: seconds };
    chrome.storage.local.set({ refreshData: data }, () => {
      updateUI(true, seconds);
      chrome.tabs.reload(tab.id);
    });
  });
});

document.getElementById('stopBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.storage.local.get(["refreshData"], (result) => {
    const data = result.refreshData || {};
    if (data[tab.id]) data[tab.id].active = false;
    chrome.storage.local.set({ refreshData: data }, () => {
      updateUI(false);
      chrome.tabs.reload(tab.id);
    });
  });
});