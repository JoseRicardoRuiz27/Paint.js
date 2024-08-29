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
const colorPicker = document.getElementById('color-picker');

//elementos
const $canvas = $('#canvas');
const ctx = $canvas.getContext('2d');

//Estado

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

colorPicker.addEventListener('change', handleColorChange);

//Metodos
function startDrawing(e){    
    isDrawing = true;
    
    const { offsetX, offsetY } = e;

    //Guardar las coordenadas del punto de inicio
    [starX, starY] = [offsetX, offsetY];
    [lastX, lastY] = [offsetX, offsetY];

}
   
function draw(e){
    if(!isDrawing) return;
    const { offsetX, offsetY } = e;

    //conmenzando el trazado
    ctx.beginPath();
    //mover el trazado a las coordenadas actuales
    ctx.moveTo(lastX, lastY);
    //dibujar una linea entre las coordenadas actuales y las nuevas
    ctx.lineTo(offsetX, offsetY);

    ctx.stroke();
    //actualizar las ultimas coordenadas
    [lastX, lastY] = [offsetX, offsetY];
}
function stopDrawing(){
    isDrawing = false;
}

function handleColorChange(){
    const { value } = colorPicker;
    ctx.strokeStyle = value;
}