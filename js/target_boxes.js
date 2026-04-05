// ============================================================
//  target_boxes.js  —  handling target boxes
// ============================================================

// cycle colors through target boxes
function changeColorTarget(element) {
    const rgb      = window.getComputedStyle(element).backgroundColor;
    const hexText  = rgbToHex(rgb);
    const colorKey = element.dataset.color;

    let index = findFirstEmptyTarget();

    if (index === null) {
        index = nextBox;
    }

    const box = document.getElementById("target" + index);

    box.dataset.hex = hexText;
    box.dataset.color = colorKey;

    applyColor(box);
    updateGradientSelects();
    updateNextBox(index);
}

function findFirstEmptyTarget() {
    for (let i = 1; i <= totalBoxes; i++) {
        const box = document.getElementById('target' + i);
        if (!box.classList.contains('active')) {
            return i;
        }
    }
    return null;
}

function updateNextBox(afterIndex) {
    const firstEmpty = findFirstEmptyTarget();

    if (firstEmpty !== null) {
        nextBox = firstEmpty;
    } else {
        nextBox = afterIndex + 1;
        if (nextBox > totalBoxes) {
            nextBox = 1;
        }
    }
}

// jump from target box to small colour box
function jumpToColor(varBox) {
    const colorKey = varBox.dataset.color;
    if (!colorKey) return;

    const source = document.querySelector('.color-box[data-color="' + colorKey + '"]');
    if (!source) return;

    source.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
    });

    source.classList.add('selected-source');
    setTimeout(function () {
    source.classList.remove('selected-source');
    }, 1200);
}

// clear target boxes
function clearTargetBoxes() {
    for (let i = 1; i <= totalBoxes; i++) {
      document.getElementById("target" + i).style.backgroundColor = "";
      document.getElementById('target' + i).dataset.color = "";
      document.getElementById("target" + i).dataset.hex = "";
      document.getElementById('target' + i).classList.remove('active');
      document.getElementById("targetText" + i).textContent = "";
    }
    nextBox = 1; // reset to start with target1 again

    if (pieChart) {
        pieChart.destroy();
    }
    if (lineChart) {
        lineChart.destroy();
    }
    if (barChart) {
        barChart.destroy();
    }
    if (scatterChart) {
        scatterChart.destroy();
    }

    pieChart       = null;
    lineChart      = null;
    barChart       = null;
    scatterChart   = null;
    chartShown = false;
    document.getElementById("chartButtonText").textContent = "Show Plots";
    document.getElementById("pieChart").style.border = "none";
    document.getElementById("lineChart").style.border = "none";
    document.getElementById("barChart").style.border = "none";
    document.getElementById("scatterChart").style.border = "none";
    document.getElementById('pieChart').classList.remove('chart-canvas');
    document.getElementById('lineChart').classList.remove('chart-canvas');
    document.getElementById('barChart').classList.remove('chart-canvas');
    document.getElementById('scatterChart').classList.remove('chart-canvas');

    colorblindType = 'none';
    document.getElementById('colorblindLabel').textContent = 'Normal Vision';
    document.getElementById('colorblindChevron').style.transform = 'rotate(0deg)';
    document.getElementById('colorblindMenu').style.display = 'none';

    clearGradient();
}



// clear individual target box
function clearTarget(index) {
    const target = document.getElementById('target' + index);
    const targetText = document.getElementById('targetText' + index);

    target.style.backgroundColor = '';
    target.dataset.color = '';
    target.dataset.hex = '';
    target.classList.remove('active');
    targetText.textContent = '';
    const firstEmpty = findFirstEmptyTarget();
    nextBox = firstEmpty !== null ? firstEmpty : 1;
}


// drag colors between target boxes
function applyColor(box) {
    const hex = box.dataset.hex;

    if (!hex || hex === "undefined") {
        box.style.backgroundColor = "";
        box.querySelector(".target-text").textContent = "";
        box.classList.remove("active");
        return;
    }

    box.style.backgroundColor = hex;
    box.querySelector(".target-text").textContent = hex;
    box.classList.add("active");
}

document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.target-box');

    boxes.forEach(box => {
        applyColor(box);

        // Drag
        box.addEventListener("dragstart", () => {
            draggedBox = box;
            didDrag = false;
            box.classList.add("dragging");
        });

        box.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        box.addEventListener("dragend", () => {
            box.classList.remove("dragging");
            draggedBox = null;
        });

        box.addEventListener("drop", (e) => {
            e.preventDefault();
            didDrag = true;
            const target = e.currentTarget;
            if (!draggedBox || draggedBox === target) return;

            const draggedHex   = draggedBox.dataset.hex    || "";
            const draggedColor = draggedBox.dataset.color  || "";
            const targetHex    = target.dataset.hex        || "";
            const targetColor  = target.dataset.color      || "";

            target.dataset.hex   = draggedHex;
            target.dataset.color = draggedColor;

            if (targetHex) {
                draggedBox.dataset.hex   = targetHex;
                draggedBox.dataset.color = targetColor;
            } else {
                draggedBox.dataset.hex   = "";
                draggedBox.dataset.color = "";
            }

            applyColor(target);
            applyColor(draggedBox);
        });

        // click, only if not dragging
        box.addEventListener("click", (e) => {
            if (didDrag) {didDrag = false; return;}
            handleTargetClick(box);
        });
    });
});


// when click on target box, go either to picker or existing colour box

function handleTargetClick(targetBox) {
    const colorKey = targetBox.dataset.color;
    if (!colorKey) return;

    const source = document.querySelector('.color-box[data-color="' + colorKey + '"]');

    activeTargetBox = targetBox;

    pickr.setColor(targetBox.dataset.hex);
    pickr.getRoot().app.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (source) {
        jumpToColor(targetBox);
    }
}
