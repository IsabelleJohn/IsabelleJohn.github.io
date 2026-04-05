// ============================================================
//  utils.js  —  useful color functions
// ============================================================

// toggle dark and light mode
function toggleDarkLight() {
  var element = document.body;
  element.classList.toggle("dark-light-mode");

  const icon = document.getElementById("modeIcon");
  const text = document.getElementById("modeText");

  if (element.classList.contains("dark-light-mode")) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      text.textContent = "Dark Mode";
  } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      text.textContent = "Light Mode";
  }
}


function rgbToHex(rgb) {
   const nums = rgb.match(/\d+/g).map(Number);
   return "#" + nums.map(x => x.toString(16).padStart(2, "0")).join("");
}

function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return {r, g, b};
}

function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h, s, v = max;

    // Hue
    if (delta === 0) {
        h = 0;
    } else if (max === r) {
        h = ((g - b) / delta) % 6;
    } else if (max === g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    // Saturation
    s = max === 0 ? 0 : delta / max;

    // Value
    v = max;

    return {
      h: h,
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
}

// generate random hex
function randomHex() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}


function interpolateHex(hex1, hex2, t) {
    const {r: r1, g: g1, b: b1} = hexToRgb(hex1);
    const {r: r2, g: g2, b: b2} = hexToRgb(hex2);
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}
