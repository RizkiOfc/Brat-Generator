const input = document.getElementById("inputText");
const content = document.getElementById("content");
const downloadBtn = document.getElementById("downloadBtn");


downloadBtn.addEventListener("click", () => {
  html2canvas(content).then(canvas => {
    const link = document.createElement("a");
    link.download = "brat-generator.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

let originalFontSize = window.getComputedStyle(content).getPropertyValue("font-size");

function handleInput(event) {
  const text = event.target.value.trim();
  content.textContent = text === "" ? "" : text;
  adjustFontSize();
}

input.addEventListener("input", handleInput);

function adjustFontSize() {
  if (content.textContent.length < 35) {
    content.style.fontSize = originalFontSize;
    return;
  }

  while (
    content.scrollHeight > content.clientHeight ||
    content.scrollWidth > content.clientWidth
  ) {
    let fontSize = parseFloat(window.getComputedStyle(content).getPropertyValue("font-size"));
    if (fontSize <= 10) break;
    fontSize--;
    content.style.fontSize = fontSize + "px";
  }
}

adjustFontSize();
