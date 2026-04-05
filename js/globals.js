// ================================================================
//  globals.js  —  global variables shared state across all scripts
// ================================================================

let pieChart       = null;
let lineChart      = null;
let barChart       = null;
let scatterChart   = null;
let chartShown = false;

let activeTargetBox = null;
let   nextBox = 1;
const totalBoxes = 5;

let draggedBox = null;
let didDrag = false;

let   nextMemory = 1;
const totalMemories = 21;
let activeMemoryBox = null;

let pickr = null;

let colorblindType = 'none';

let gradientFromHex = '';
let gradientToHex   = '';
let gradientMidHex  = '';
let gradientSteps = 0;
let gradientShown = false;
