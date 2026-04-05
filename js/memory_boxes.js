// ============================================================
//  memory_boxes.js  —  handling memory boxes
// ============================================================

// cycle colors through memory boxes
function changeColorMemory(element) {
    const rgb      = window.getComputedStyle(element).backgroundColor;
    const hexText  = rgbToHex(rgb);
    const colorKey = element.dataset.color;

    updateMemoryBoxes(rgb, hexText, colorKey);
}

// queue memory boxes and move colours along
function updateMemoryBoxes(rgb, hexText, colorKey) {
    const lastBox = document.getElementById('memory' + totalMemories);
    const isFull = lastBox.dataset.color && lastBox.dataset.color !== '';

    if (!isFull) {
        for (let i = 1; i <= totalMemories; i++) {
            const box = document.getElementById('memory' + i);
            if (!box.dataset.color) {
                box.style.backgroundColor = rgb;
                box.dataset.color = colorKey;
                box.dataset.hex = hexText;
                box.classList.add('active');
                break;
            }
        }
    } else {
        for (let i = 1; i < totalMemories; i++) {
            const current = document.getElementById('memory' + i);
            const next = document.getElementById('memory' + (i + 1));

            current.style.backgroundColor = next.style.backgroundColor;
            current.dataset.color = next.dataset.color;
            current.dataset.hex = next.dataset.hex;

            if (next.classList.contains('active')) {
                current.classList.add('active');
            } else {
                current.classList.remove('active');
            }
        }

        const rightmost = document.getElementById('memory' + totalMemories);
        rightmost.style.backgroundColor = rgb;
        rightmost.dataset.color = colorKey;
        rightmost.dataset.hex = hexText;
        rightmost.classList.add('active');
    }
}


// when click on memory box, go either to picker or existing colour box

function handleMemoryClick(memoryBox) {
    const colorKey = memoryBox.dataset.color;
    if (!colorKey) return;

    const source = document.querySelector('.color-box[data-color="' + colorKey + '"]');

    activeMemoryBox = memoryBox;
    pickr.setColor(memoryBox.dataset.hex);
    pickr.getRoot().app.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (source) {
        jumpToColor(memoryBox);
    }

    // if (source) {
    //     jumpToColor(memoryBox);
    // } else {
    //     activeMemoryBox = memoryBox;
    //
    //     const picker = document.getElementById('colorPicker');
    //     picker.value = memoryBox.dataset.hex || '#000000';
    //     picker.click();
    // }
}
