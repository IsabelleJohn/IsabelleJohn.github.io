// ============================================================
//  blob_popup.js  —  make a colour blob popup when clicking on
//                    the palette in the header
// ============================================================


function toggleBlob() {
    // toggle blob when clicking the color palette
    const paletteIcon = document.getElementById("palette");
    const popup = document.getElementById("popup");
    const blob = popup.querySelector(".popup-content");
    const color = randomHex();

    // Open popup
    // paletteIcon.addEventListener("click", (e) => {
      popup.style.display = "block";
      popup.style.color = color;
      document.getElementById("palette").style.color = color;
      pickr.setColor(color);
      // e.stopPropagation();

      requestAnimationFrame(() => {
          const maxX = Math.max(0, window.innerWidth  - blob.offsetWidth);
          const maxY = Math.max(0, window.innerHeight - blob.offsetHeight);

          const randomX = Math.random() * maxX;
          const randomY = Math.random() * maxY;
          const randomF = Math.random() * 400;


          blob.style.left = randomX + "px";
          blob.style.top = randomY + "px";
          blob.style.fontSize = randomF + "px";

          // trigger fade-in
          blob.classList.add("show");
      });
    // });

    // Close when clicking outside the box
    window.addEventListener("click", () => {
        blob.classList.remove("show"); // fade out first

        // wait for animation before hiding completely
        setTimeout(() => {
          popup.style.display = "none";
      }, 0); // match CSS duration
    });
}

// Close when clicking outside the box
window.addEventListener("click", () => {
    blob.classList.remove("show"); // fade out first

    // wait for animation before hiding completely
    setTimeout(() => {
      popup.style.display = "none";
  }, 200); // match CSS duration
});
