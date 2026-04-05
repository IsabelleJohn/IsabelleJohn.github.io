// ============================================================
//  color_blind.js  —  handling color blind functionality
// ============================================================

function toggleColorblindMenu() {
    const menu = document.getElementById('colorblindMenu');
    const chevron = document.getElementById('colorblindChevron');
    const isOpen = menu.style.display === 'block';
    menu.style.display = isOpen ? 'none' : 'block';
    chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    chevron.style.transition = 'transform 0.2s ease';
}

function selectColorblind(type, label) {
    colorblindType = type;
    document.getElementById('colorblindLabel').textContent = label;
    document.getElementById('colorblindMenu').style.display = 'none';
    document.getElementById('colorblindChevron').style.transform = 'rotate(0deg)';

    if (chartShown) toggleCharts();  // auto-update plots if visible
    if (gradientShown) updateGradientBar();
}

// close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!document.getElementById('colorblindDropdown').contains(e.target)) {
        document.getElementById('colorblindMenu').style.display = 'none';
        document.getElementById('colorblindChevron').style.transform = 'rotate(0deg)';
    }
});

// color blind matrices
function simulateColorblindness(hex, type) {
    const {r, g, b} = hexToRgb(hex);

    // Matrices from Machado et al. (2009)
    const matrices = {
        deuteranopia: [
            0.367,  0.861, -0.228,
            0.280,  0.673,  0.047,
           -0.012,  0.043,  0.969
        ],
        protanopia: [
            0.152,  1.053, -0.205,
            0.115,  0.786,  0.099,
           -0.004, -0.048,  1.052
        ],
        tritanopia: [
            1.256, -0.077, -0.179,
           -0.078,  0.931,  0.148,
            0.005,  0.691,  0.304
        ],
        achromatopsia: [
            0.299,  0.587,  0.114,
            0.299,  0.587,  0.114,
            0.299,  0.587,  0.114
        ]
    };

    const m = matrices[type];
    const sr = Math.min(255, Math.max(0, Math.round(m[0]*r + m[1]*g + m[2]*b)));
    const sg = Math.min(255, Math.max(0, Math.round(m[3]*r + m[4]*g + m[5]*b)));
    const sb = Math.min(255, Math.max(0, Math.round(m[6]*r + m[7]*g + m[8]*b)));

    return '#' + [sr, sg, sb].map(x => x.toString(16).padStart(2, '0')).join('');
}
