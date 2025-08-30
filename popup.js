document.getElementById("scanBtn").addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: detectClickjacking
    });
  });
});

function detectClickjacking() {
  const iframes = document.querySelectorAll('iframe');
  let threatFound = false;

  iframes.forEach((iframe) => {
    const style = window.getComputedStyle(iframe);
    const opacity = parseFloat(style.opacity);
    const visibility = style.visibility;
    const width = iframe.offsetWidth;
    const height = iframe.offsetHeight;

    if (
      opacity < 0.1 || visibility === 'hidden' ||
      width < 10 || height < 10
    ) {
      threatFound = true;
      iframe.remove();
    }
  });

  if (threatFound) {
    alert("⚠️ Clickjacking threat found and blocked!");
  } else {
    alert("✅ No threats found.");
  }
}
