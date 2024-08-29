//constantes
const MODES = {
    DRAW: 'draw',
    ERASE: 'erase',
    RECTANGLE: 'rectangle',
    ELLIPSE: 'ellipse',
    PICKER: 'picker',
};

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

//elementos
const $canvas = $('#canvas');
const ctx = $canvas.getContext('2d');

//Stado

let isDrawing = false;
let starX, starY;
let lastX = 0;
let lastY = 0;
let mode = MODES.DRAW;

//Eventos
$canvas.addEventListener('mousedown', startDrawing)
$canvas.addEventListener('mousemove', draw)
$canvas.addEventListener('mouseup', stopDrawing)
$canvas.addEventListener('mouseLeave', stopDrawing)

//Metodos
function startDrawing(e){    
    isDrawing = true;
    console.log(e)
}   
function draw(e){}
function stopDrawing(){}