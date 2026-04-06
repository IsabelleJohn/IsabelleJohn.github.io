// ============================================================
//  color_tables.js  —  colour palette data + table builder
// ============================================================

const palettes = [
    {
        id:          'solar_modulation_colours',
        title:       'Colours from',
        linkText:    'Solar Modulation Paper',
        linkUrl:     'https://isabellejohn.github.io/research.html#paper11',
        tooltipImg:  'papers/SolarModulationUncertainties.png',
        description: 'This colour scheme is partially based on the MS Office theme colours, with some modification and tuning down of the colours.',
        colors: [
            { name: 'orange_light',     hex: '#f6b26b', rgb: [246, 178, 107], hsv: [ 30,  56,  96] },
            { name: 'orange_medium',    hex: '#e69138', rgb: [230, 145,  56], hsv: [ 30,  75,  90] },
            { name: 'orange_dark',      hex: '#b45f06', rgb: [180,  95,   6], hsv: [ 30,  96,  70] },
            { name: 'turquoise_light',  hex: '#76a5af', rgb: [118, 165, 175], hsv: [190,  32,  68] },
            { name: 'turquoise_medium', hex: '#45818e', rgb: [ 69, 129, 142], hsv: [190,  51,  55] },
            { name: 'turquoise_dark',   hex: '#134f5c', rgb: [ 19,  79,  92], hsv: [190,  79,  36] },
            { name: 'burgundy_light',   hex: '#c27ba0', rgb: [194, 123, 160], hsv: [328,  36,  76] },
            { name: 'burgundy_medium',  hex: '#a64d79', rgb: [166,  77, 121], hsv: [330,  53,  65] },
            { name: 'burgundy_dark',    hex: '#741b47', rgb: [116,  27,  71], hsv: [330,  76,  45] },
            { name: 'mossgreen_light',  hex: '#b8c99a', rgb: [184, 201, 154], hsv: [ 81,  23,  78] },
            { name: 'mossgreen_medium', hex: '#88a85d', rgb: [136, 168,  93], hsv: [ 85,  44,  65] },
            { name: 'mossgreen_dark',   hex: '#5b7832', rgb: [ 91, 120,  50], hsv: [ 84,  58,  47] },
            { name: 'red_light',        hex: '#e0a298', rgb: [224, 162, 152], hsv: [  8,  32,  87] },
            { name: 'red_medium',       hex: '#ca5e4d', rgb: [202,  94,  77], hsv: [  8,  61,  79] },
            { name: 'red_dark',         hex: '#9b3329', rgb: [155,  51,  41], hsv: [  5,  73,  60] },
            { name: 'coral_light',      hex: '#d6c3b0', rgb: [214, 195, 176], hsv: [ 29,  17,  83] },
            { name: 'coral_medium',     hex: '#aa8f76', rgb: [170, 143, 118], hsv: [ 28,  30,  66] },
            { name: 'coral_dark',       hex: '#6b533c', rgb: [107,  83,  60], hsv: [ 29,  43,  41] },
            { name: 'steelblue_light',  hex: '#869dc4', rgb: [134, 157, 196], hsv: [217,  31,  76] },
            { name: 'steelblue_medium', hex: '#3e6192', rgb: [ 62,  97, 146], hsv: [215,  57,  57] },
            { name: 'steelblue_dark',   hex: '#263c61', rgb: [ 38,  60,  97], hsv: [217,  60,  38] },
            { name: 'dustyplum_light',  hex: '#c28b85', rgb: [194, 139, 133], hsv: [  5,  31,  76] },
            { name: 'dustyplum_medium', hex: '#8b524e', rgb: [139,  82,  78], hsv: [  3,  43,  54] },
            { name: 'dustyplum_dark',   hex: '#5f3738', rgb: [ 95,  55,  56], hsv: [358,  42,  37] },
            { name: 'yellow_light',     hex: '#f0d974', rgb: [240, 217, 116], hsv: [ 48,  51,  94] },
            { name: 'yellow_medium',    hex: '#e6c12e', rgb: [230, 193,  46], hsv: [ 47,  80,  90] },
            { name: 'yellow_dark',      hex: '#b8912b', rgb: [184, 145,  43], hsv: [ 43,  76,  72] },
            { name: 'plum_light',       hex: '#9e91c4', rgb: [158, 145, 196], hsv: [255,  26,  76] },
            { name: 'plum_medium',      hex: '#6f58aa', rgb: [111,  88, 170], hsv: [256,  48,  66] },
            { name: 'plum_dark',        hex: '#432f76', rgb: [ 67,  47, 118], hsv: [256,  60,  46] },
        ]
    },
    {
        id:          'immortal_stars_colours',
        title:       'Colours from',
        linkText:    'Immortal Stars Paper',
        linkUrl:     'https://isabellejohn.github.io/research.html#paper6',
        tooltipImg:  'papers/StellarMass_vs_GCdistance_1.0GeV_1e-37cm2_1.0spike_withtext.png',
        description: 'I developed this colour scheme for plots with large shaded areas.',
        colors: [
            { name: 'henyey',          hex: '#fee28e', rgb: [254, 226, 142], hsv: [ 44,  44,  99] },
            { name: 'hayashi',         hex: '#ee7416', rgb: [238, 116,  22], hsv: [ 26,  90,  93] },
            { name: 'forever_young',   hex: '#b64203', rgb: [182,  66,   3], hsv: [ 21,  98,  71] },
            { name: 'longevity_light', hex: '#b6e192', rgb: [182, 225, 146], hsv: [ 92,  35,  88] },
            { name: 'longevity_medium',hex: '#3ba358', rgb: [ 59, 163,  88], hsv: [136,  63,  63] },
            { name: 'longevity_dark',  hex: '#006034', rgb: [  0,  96,  52], hsv: [152, 100,  37] },
        ]
    },
    {
        id:          'pulsars_diffusion_colours',
        title:       'Colours from',
        linkText:    'Pulsar Paper',
        linkUrl:     'https://isabellejohn.github.io/research.html#paper8',
        tooltipImg:  'papers/HESS_electrons.png',
        description: 'I made this colour scheme for plots with the green shades as background and orange and burgundy markers on top of the green shades.',
        colors: [
            { name: 'Vela',            hex: '#f6bc6b', rgb: [246, 188, 107], hsv: [ 34,  56,  96] },
            { name: 'Monogem',         hex: '#e69138', rgb: [230, 145,  56], hsv: [ 30,  75,  90] },
            { name: 'Geminga',         hex: '#b45f06', rgb: [180,  95,   6], hsv: [ 30,  96,  70] },
            { name: 'Pulsar',          hex: '#76204a', rgb: [118,  32,  74], hsv: [330,  72,  46] },
            { name: 'one_zone',        hex: '#d8f1eb', rgb: [216, 241, 235], hsv: [165,  10,  94] },
            { name: 'two_zone_light',  hex: '#3fbc9d', rgb: [ 63, 188, 157], hsv: [165,  66,  73] },
            { name: 'two_zone_medium', hex: '#2c836d', rgb: [ 44, 131, 109], hsv: [164,  66,  51] },
            { name: 'two_zone_dark',   hex: '#194b3e', rgb: [ 25,  75,  62], hsv: [164,  66,  29] },
            { name: 'extrapolated',    hex: '#87d7df', rgb: [135, 215, 223], hsv: [185,  39,  87] },
            { name: 'background_bar',  hex: '#eeeeee', rgb: [238, 238, 238], hsv: [  0,   0,  93] },
        ]
    },
    {
        id:          'stellar_colours',
        title:       'Colours from',
        linkText:    'Dark Matter in Stars Paper',
        linkUrl:     'https://isabellejohn.github.io/research.html#paper5',
        tooltipImg:  'papers/S-cluster_stars_vs_important_distances.png',
        description: 'This is the colour scheme for the S-cluster stars.',
        colors: [
            { name: 'S2_1',    hex: '#d9eeee', rgb: [217, 238, 238], hsv: [180,   8,  93] },
            { name: 'S2_2',    hex: '#bfe2e2', rgb: [191, 226, 226], hsv: [180,  15,  88] },
            { name: 'S2_3',    hex: '#a6d7d8', rgb: [166, 215, 216], hsv: [181,  23,  84] },
            { name: 'S2',      hex: '#008a8b', rgb: [  0, 138, 139], hsv: [180, 100,  54] },
            { name: 'S62_1',   hex: '#d8d9ed', rgb: [216, 217, 237], hsv: [237,   8,  92] },
            { name: 'S62_2',   hex: '#bfbfe2', rgb: [191, 191, 226], hsv: [240,  15,  88] },
            { name: 'S62_3',   hex: '#a6a6d7', rgb: [166, 166, 215], hsv: [240,  22,  84] },
            { name: 'S62',     hex: '#00048b', rgb: [  0,   4, 139], hsv: [238, 100,  54] },
            { name: 'S4711_1', hex: '#ecd9ec', rgb: [236, 217, 236], hsv: [300,   8,  92] },
            { name: 'S4711_2', hex: '#dfbfdf', rgb: [223, 191, 223], hsv: [300,  14,  87] },
            { name: 'S4711_3', hex: '#d2a6d4', rgb: [210, 166, 212], hsv: [297,  21,  83] },
            { name: 'S4711',   hex: '#800080', rgb: [128,   0, 128], hsv: [300, 100,  50] },
            { name: 'S4714_1', hex: '#fadce2', rgb: [250, 220, 226], hsv: [348,  11,  98] },
            { name: 'S4714_2', hex: '#f6c4ce', rgb: [246, 196, 206], hsv: [348,  20,  96] },
            { name: 'S4714_3', hex: '#f3adbb', rgb: [243, 173, 187], hsv: [348,  28,  95] },
            { name: 'S4714',   hex: '#db143b', rgb: [219,  20,  59], hsv: [348,  90,  85] },
            { name: 'S1_1',    hex: '#ffe2bf', rgb: [255, 226, 191], hsv: [ 32,  25, 100] },
            { name: 'S1_2',    hex: '#ffd199', rgb: [255, 209, 153], hsv: [ 32,  40, 100] },
            { name: 'S1',      hex: '#ff8c00', rgb: [255, 140,   0], hsv: [ 32, 100, 100] },
        ]
    }
];


// ============================================================
//  buildPaletteTables  —  generates all tables from data above
// ============================================================

function buildPaletteTables() {
    palettes.forEach(palette => {
        const heading = document.getElementById(palette.id);
        if (!heading) return;

        // build <h1> content
        heading.textContent = '';
        const titleText = document.createTextNode(palette.title + ' ');
        const link = document.createElement('a');
        link.className         = 'links-to-papers';
        link.href              = palette.linkUrl;
        link.target            = '_blank';
        link.dataset.tooltipImg = palette.tooltipImg;
        link.textContent       = palette.linkText;
        heading.appendChild(titleText);
        heading.appendChild(link);

        // description paragraph
        const desc = document.createElement('p');
        desc.textContent = palette.description;
        heading.insertAdjacentElement('afterend', desc);

        // build table
        const table = document.createElement('table');

        // header row
        const thead = document.createElement('tr');
        // ['', 'HEX', 'RGB', 'HSV', 'Colour Label'].forEach(text => {
        ['', 'HEX', 'RGB', 'HSV'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            thead.appendChild(th);
        });
        table.appendChild(thead);

        // color rows
        palette.colors.forEach(color => {
            const tr = document.createElement('tr');

            // swatch cell
            const boxTd = document.createElement('td');
            const box   = document.createElement('div');
            box.className        = 'color-box';
            box.style.background = `var(--${color.name})`;
            box.dataset.color    = color.name;
            box.addEventListener('click', function () {
                changeColorTarget(this);
                changeColorMemory(this);
            });
            boxTd.appendChild(box);

            // hex cell
            const hexTd   = document.createElement('td');
            const hexSpan = document.createElement('span');
            hexSpan.className   = 'color-label';
            hexSpan.textContent = color.hex;
            hexTd.appendChild(hexSpan);

            // rgb cell
            const rgbTd   = document.createElement('td');
            const rgbSpan = document.createElement('span');
            rgbSpan.className = 'color-label';
            const rgbPre  = document.createElement('pre');
            rgbPre.textContent = `(${color.rgb.map(v => String(v).padStart(3)).join(', ')})`;
            rgbSpan.appendChild(rgbPre);
            rgbTd.appendChild(rgbSpan);

            // hsv cell
            const hsvTd   = document.createElement('td');
            const hsvSpan = document.createElement('span');
            hsvSpan.className = 'color-label';
            const hsvPre  = document.createElement('pre');
            hsvPre.textContent = `(${color.hsv.map(v => String(v).padStart(3)).join(', ')})`;
            hsvSpan.appendChild(hsvPre);
            hsvTd.appendChild(hsvSpan);

            // name cell
            const nameTd   = document.createElement('td');
            const nameSpan = document.createElement('span');
            nameSpan.className   = 'color-label';
            nameSpan.textContent = color.name;
            nameTd.appendChild(nameSpan);

            // tr.append(boxTd, hexTd, rgbTd, hsvTd, nameTd);
            tr.append(boxTd, hexTd, rgbTd, hsvTd);
            table.appendChild(tr);
        });

        // insert table after description
        desc.insertAdjacentElement('afterend', table);
    });

    // re-run tooltip image setup after tables are built
    if (typeof setupTooltips === 'function') setupTooltips();
}
