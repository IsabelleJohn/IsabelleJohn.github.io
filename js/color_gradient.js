// ============================================================
//  color_blind.js  —  handling color gradient functionality
// ============================================================

function updateGradientSelects() {
    const fromMenu = document.getElementById('gradientFromMenu');
    const toMenu   = document.getElementById('gradientToMenu');
    const midMenu  = document.getElementById('gradientMidMenu');

    fromMenu.replaceChildren();
    toMenu.replaceChildren();
    midMenu.replaceChildren();

    // None option for mid
    const noneItem = document.createElement('div');
    noneItem.style.padding    = '8px 12px';
    noneItem.style.cursor     = 'pointer';
    noneItem.style.fontFamily = 'inherit';
    noneItem.textContent      = 'None';
    noneItem.addEventListener('click', () => selectGradientColor('Mid', ''));
    noneItem.addEventListener('mouseover', () => {
        noneItem.style.backgroundColor = document.body.classList.contains('dark-light-mode') ? '#1f1b16' : '#f2efea';
    });
    noneItem.addEventListener('mouseout', () => noneItem.style.backgroundColor = '');
    midMenu.appendChild(noneItem);

    const makeItem = (hex, index, menuType) => {
        const item = document.createElement('div');
        item.style.display    = 'flex';
        item.style.alignItems = 'center';
        item.style.gap        = '8px';
        item.style.padding    = '8px 12px';
        item.style.cursor     = 'pointer';

        const swatch = document.createElement('span');
        swatch.style.width        = '15px';
        swatch.style.height       = '15px';
        swatch.style.borderRadius = '3px';
        swatch.style.background   = hex;
        swatch.style.flexShrink   = '0';

        const label = document.createElement('span');
        label.textContent = `${hex}`;
        label.style.fontFamily = 'inherit';
        // label.style.fontSize   = '12px';

        item.appendChild(swatch);
        item.appendChild(label);

        item.addEventListener('click', () => selectGradientColor(menuType, hex));
        return item;
    };

    for (let i = 1; i <= totalBoxes; i++) {
        const box = document.getElementById('target' + i);
        if (!box.classList.contains('active')) continue;
        const hex = box.dataset.hex;
        fromMenu.appendChild(makeItem(hex, i, 'From'));
        toMenu.appendChild(makeItem(hex, i, 'To'));
        midMenu.appendChild(makeItem(hex, i, 'Mid'));
    }

    updateGradientBar();
}


function selectGradientColor(type, hex) {
    if (type === 'From') {
        gradientFromHex = hex;
        document.getElementById('gradientFromLabel').textContent  = hex;
        document.getElementById('gradientFromSwatch').style.backgroundColor = hex || '#878079';
        document.getElementById('gradientFromMenu').style.display = 'none';
        document.getElementById('gradientFromChevron').style.transform = 'rotate(0deg)';
    } else if (type === 'To') {
        gradientToHex = hex;
        document.getElementById('gradientToLabel').textContent = hex || 'Colour 2';
        document.getElementById('gradientToSwatch').style.backgroundColor = hex || '#878079';
        document.getElementById('gradientToMenu').style.display = 'none';
        document.getElementById('gradientToChevron').style.transform = 'rotate(0deg)';
    } else if (type === 'Mid') {
        gradientMidHex = hex;
        document.getElementById('gradientMidLabel').textContent = hex || 'Mid';
        document.getElementById('gradientMidSwatch').style.backgroundColor = hex || '#878079';
        document.getElementById('gradientMidMenu').style.display = 'none';
        document.getElementById('gradientMidChevron').style.transform = 'rotate(0deg)';
        document.querySelector('.gradient-optional-badge').style.display = hex ? 'none' : 'inline';
    }
    updateGradientBar();
}

// close gradient menus when clicking outside


function updateGradientBar() {
    if (!gradientShown) return;
    const oldBar = document.getElementById('gradientBar');
    const bar    = oldBar.cloneNode(false);
    oldBar.replaceWith(bar);

    const fromSim = applyColorblind(gradientFromHex);
    const toSim   = applyColorblind(gradientToHex);

    if (!gradientFromHex || !gradientToHex) {
        bar.style.background = '';
        bar.style.display    = gradientShown ? 'flex' : 'none';
        return;
    }

    if (gradientSteps === 0) {
        const gradient = gradientMidHex
            ? `linear-gradient(to right, ${fromSim}, ${applyColorblind(gradientMidHex)}, ${toSim})`
            : `linear-gradient(to right, ${fromSim}, ${toSim})`;
        bar.style.background = gradient;

        bar.addEventListener('click', (e) => {
            const rect  = bar.getBoundingClientRect();
            const t     = (e.clientX - rect.left) / rect.width;
            let color;
            if (gradientMidHex) {
                // left half → from→mid, right half → mid→to
                color = t < 0.5
                    ? interpolateHex(gradientFromHex, gradientMidHex, t * 2)
                    : interpolateHex(gradientMidHex,  gradientToHex,  (t - 0.5) * 2);
            } else {
                color = interpolateHex(gradientFromHex, gradientToHex, t);
            }
            pickr.setColor(color);
            scrollToPicker();
        });
        return;
    }

    // stepped — build individual divs
    bar.style.background = 'none';

    const colors = [];
    for (let i = 0; i < gradientSteps; i++) {
        const t = gradientSteps === 1 ? 0.5 : i / (gradientSteps - 1);
        if (gradientMidHex) {
            colors.push(t <= 0.5
                ? interpolateHex(gradientFromHex, gradientMidHex, t * 2)
                : interpolateHex(gradientMidHex,  gradientToHex,  (t - 0.5) * 2)
            );
        } else {
            colors.push(interpolateHex(gradientFromHex, gradientToHex, t));
        }
    }

    colors.forEach((color, i) => {
        const simColor = applyColorblind(color);  // simulated color for display
        const step = document.createElement('div');
        step.style.flex            = '1';
        step.style.backgroundColor = simColor;
        step.style.position        = 'relative';
        step.style.cursor          = 'default';
        if (i === 0)               step.style.borderRadius = '6px 0 0 6px';
        if (i === colors.length-1) step.style.borderRadius = '0 6px 6px 0';

        // tooltip
        const tip = document.createElement('span');
        tip.textContent      = color;
        tip.style.position   = 'absolute';
        tip.style.bottom     = '120%';
        tip.style.left       = '50%';
        tip.style.transform  = 'translateX(-50%)';
        tip.style.background = '#37322c';
        tip.style.color      = '#f2efea';
        tip.style.padding    = '4px 8px';
        tip.style.borderRadius = '6px';
        tip.style.fontSize   = '10px';
        tip.style.whiteSpace = 'nowrap';
        tip.style.opacity    = '0';
        tip.style.pointerEvents = 'none';
        tip.style.transition = 'opacity 0.2s ease';
        tip.style.zIndex     = '300';

        step.addEventListener('mouseenter', () => tip.style.opacity = '1');
        step.addEventListener('mouseleave', () => tip.style.opacity = '0');
        step.addEventListener('click', () => { // original color for picker
            pickr.setColor(color);
            scrollToPicker();
        });

        step.appendChild(tip);
        bar.appendChild(step);
    });
}

function toggleGradientBar() {
    const bar     = document.getElementById('gradientBar');
    const options = document.getElementById('gradientOptions');
    gradientShown = !gradientShown;

    bar.style.display     = gradientShown ? 'flex' : 'none';
    options.style.display = gradientShown ? 'flex'  : 'none';

    document.getElementById('gradientButtonText').textContent = gradientShown ? 'Hide Gradient' : 'Show Gradient';
    if (gradientShown) updateGradientBar();
}

function toggleGradientMenu(type) {
    const menu    = document.getElementById(`gradient${type}Menu`);
    const chevron = document.getElementById(`gradient${type}Chevron`);
    const isOpen  = menu.style.display === 'block';

    document.getElementById('gradientFromMenu').style.display  = 'none';
    document.getElementById('gradientToMenu').style.display    = 'none';
    document.getElementById('gradientMidMenu').style.display   = 'none';
    document.getElementById('gradientStepsMenu').style.display = 'none';
    ['From', 'To', 'Mid', 'Steps'].forEach(t => {
        const c = document.getElementById(`gradient${t}Chevron`);
        if (c) c.style.transform = 'rotate(0deg)';
    });

    menu.style.display = isOpen ? 'none' : 'block';
    chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    chevron.style.transition = 'transform 0.2s ease';
}


document.addEventListener('click', (e) => {
    if (!document.getElementById('gradientFromDropdown').contains(e.target)) {
        document.getElementById('gradientFromMenu').style.display = 'none';
        document.getElementById('gradientFromChevron').style.transform = 'rotate(0deg)';
    }
    if (!document.getElementById('gradientToDropdown').contains(e.target)) {
        document.getElementById('gradientToMenu').style.display = 'none';
        document.getElementById('gradientToChevron').style.transform = 'rotate(0deg)';
    }
    if (!document.getElementById('gradientMidDropdown').contains(e.target)) {
        document.getElementById('gradientMidMenu').style.display = 'none';
        document.getElementById('gradientMidChevron').style.transform = 'rotate(0deg)';
    }
    if (!document.getElementById('gradientStepsDropdown').contains(e.target)) {
        document.getElementById('gradientStepsMenu').style.display = 'none';
        document.getElementById('gradientStepsChevron').style.transform = 'rotate(0deg)';
    }
});


function selectGradientSteps(steps, label) {
    gradientSteps = steps;
    document.getElementById('gradientStepsLabel').textContent = label;
    document.getElementById('gradientStepsMenu').style.display = 'none';
    document.getElementById('gradientStepsChevron').style.transform = 'rotate(0deg)';
    updateGradientBar();
}


function clearGradient() {
    gradientFromHex = '';
    gradientToHex   = '';
    gradientMidHex  = '';
    gradientSteps   = 0;

    document.getElementById('gradientFromLabel').textContent  = 'Colour 1';
    document.getElementById('gradientToLabel').textContent    = 'Colour 2';
    document.getElementById('gradientMidLabel').textContent = 'Mid';
    document.getElementById('gradientStepsLabel').textContent = 'Steps';
    document.getElementById('gradientFromSwatch').style.backgroundColor = '#878079';
    document.getElementById('gradientToSwatch').style.backgroundColor   = '#878079';
    document.getElementById('gradientMidSwatch').style.backgroundColor = '#878079';

    const bar = document.getElementById('gradientBar');
    bar.replaceChildren();
    bar.style.background = '';
    bar.style.display    = 'none';
    gradientShown = false;

    document.getElementById('gradientButtonText').textContent = 'Show Gradient';
    document.getElementById('gradientOptions').style.display = 'none';

    updateGradientSelects();
    document.getElementById('gradientOptions').style.display = 'none';
    document.getElementById('gradientBar').style.display     = 'none';
    document.querySelector('.gradient-optional-badge').style.display = 'inline';
}

function scrollToPicker() {
    const pcr = document.querySelector('.pcr-app');
        if (pcr) pcr.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function applyColorblind(hex) {
    if (colorblindType === 'none') return hex;
    return simulateColorblindness(hex, colorblindType);
}
