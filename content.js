// content.js

function detectClickjacking() {
  const iframes = document.querySelectorAll('iframe');
  let threatFound = false;

  iframes.forEach((iframe) => {
    const style = window.getComputedStyle(iframe);
    const opacity = parseFloat(style.opacity);
    const visibility = style.visibility;
    const width = iframe.offsetWidth;
    const height = iframe.offsetHeight;

    // If it's invisible, very small, or hidden — it's suspicious!
    if (
      opacity < 0.1 || visibility === 'hidden' ||
      width < 10 || height < 10
    ) {
      threatFound = true;
      iframe.remove(); // Remove the threat
    }
  });

  if (threatFound) {
    alert("⚠️ Clickjacking threat found and blocked!");
  } else {
    console.log("✅ No clickjacking threats found.");
  }
}

detectClickjacking();
