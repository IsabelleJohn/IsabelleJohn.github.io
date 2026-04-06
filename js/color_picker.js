// ============================================================
//  color_picker.js  —  handling color picker from Pickr Nano
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    function setLabelValue(container, labelText, valueText) {
        container.textContent = '';

        const label = document.createElement('span');
        label.textContent  = labelText;
        label.style.fontWeight = 'bold';

        const value = document.createElement('span');
        value.textContent = valueText;

        const icon = document.createElement('i');
        icon.className = 'fa-regular fa-copy copy-icon';
        icon.title     = '';  // handled by CSS tooltip

        const tooltip = document.createElement('span');
        tooltip.className   = 'copy-tooltip';
        tooltip.textContent = `Copy ${labelText} to clipboard`;

        const iconWrapper = document.createElement('span');
        iconWrapper.className = 'copy-icon-wrapper';
        iconWrapper.appendChild(icon);
        iconWrapper.appendChild(tooltip);

        icon.addEventListener('click', () => {
            navigator.clipboard.writeText(valueText).then(() => {
                tooltip.textContent = 'Copied!';
                setTimeout(() => {
                    tooltip.textContent = `Copy ${labelText} to clipboard`;
                }, 1500);
            });
        });

        container.appendChild(label);
        container.appendChild(document.createElement('br'));
        container.appendChild(value);
        container.appendChild(document.createElement('br'));
        container.appendChild(iconWrapper);
    }



    const preview = document.getElementById("previewBox");
    const hexText = document.getElementById("colorHex");
    const rgbText = document.getElementById("colorRGB");
    const hsvText = document.getElementById("colorHSV");
    const palette = document.getElementById("palette");

    pickr = Pickr.create({
        el: '#pickrContainer',
        theme: 'nano',
        default: randomHex(),
        inline: true,
        showAlways: true,
        components: {
            palette: true,
            preview: false,
            opacity: false,
            hue: true,
            interaction: {
                input: true,
                save: false,
            },
        }
    });

    function applyPickrColor(color) {
        const hex        = color.toHEXA().toString();
        const [r, g, b]  = color.toRGBA().map(Math.round);
        const { h, s, v} = rgbToHsv(r, g, b);

        preview.style.backgroundColor = hex;
        preview.dataset.hex   = hex;
        preview.dataset.color = hex;

        palette.style.color = hex;

        setLabelValue(hexText, 'HEX', hex);
        setLabelValue(rgbText, 'RGB', `(${r}, ${g}, ${b})`);
        setLabelValue(hsvText, 'HSV', `(${h}, ${s}, ${v})`);
    }

    pickr.on('init',   ()      => applyPickrColor(pickr.getColor()));
    pickr.on('change', (color) => applyPickrColor(color));

});
