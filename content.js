chrome.runtime.sendMessage({ action: "checkStatus" }, (response) => {
  if (response && response.active) {
    console.log(`Kingo: ${response.seconds} saniye sonra yenileniyor...`);
    setTimeout(() => {
      window.location.reload();
    }, response.seconds * 1000);
  }
});