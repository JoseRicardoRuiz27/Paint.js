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
const $colorPicker = $('#color-picker');
const $pickerBtn = $('#picker-btn');
const $clearBtn = $('#clear-btn');
const $drawBtn = $('#draw-btn');
const $eraseBtn = $('#erase-btn');
const $rectangleBtn = $('#rectangle-btn');

const ctx = $canvas.getContext('2d');

//Estado

let isDrawing = false;
let starX, starY;
let lastX = 0;
let lastY = 0;
let mode = MODES.DRAW;
let imageData

//Eventos
$canvas.addEventListener('mousedown', startDrawing)
$canvas.addEventListener('mousemove', draw)
$canvas.addEventListener('mouseup', stopDrawing)
$canvas.addEventListener('mouseLeave', stopDrawing)

$colorPicker.addEventListener('change', handleColorChange);
$clearBtn.addEventListener('click', clearCanvas);
$rectangleBtn.addEventListener('click', () => {
    setMode(MODES.RECTANGLE);
})
$drawBtn.addEventListener('click', () => {
    setMode(MODES.DRAW);
})
$eraseBtn.addEventListener('click', () => {
    setMode(MODES.ERASE);
})
$pickerBtn.addEventListener('click', () => {
    setMode(MODES.PICKER);
})

//Metodos
function startDrawing(e){    
    isDrawing = true;
    
    const { offsetX, offsetY } = e;

    //Guardar las coordenadas del punto de inicio
    [starX, starY] = [offsetX, offsetY];
    [lastX, lastY] = [offsetX, offsetY];

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

}
function draw(e){
    if(!isDrawing) return;
    const { offsetX, offsetY } = e;

    if (mode === MODES.DRAW || mode === MODES.ERASE) {
    //conmenzando el trazado
    ctx.beginPath();
    //mover el trazado a las coordenadas actuales
    ctx.moveTo(lastX, lastY);
    //dibujar una linea entre las coordenadas actuales y las nuevas
    ctx.lineTo(offsetX, offsetY);

    ctx.stroke();
    //actualizar las ultimas coordenadas
    [lastX, lastY] = [offsetX, offsetY];
    return
    }
    if (mode === MODES.RECTANGLE) {
        ctx.putImageData(imageData, 0, 0);

        const width = offsetX - starX;
        const height = offsetY - starY;

        ctx.beginPath();
        ctx.rect(starX, starY, width, height);
        ctx.stroke();
        return
    }
}
function stopDrawing(){
    isDrawing = false;
}
function handleColorChange(){
    const { value } = $colorPicker;
    ctx.strokeStyle = value;
}
function clearCanvas(){
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}
function setMode(newMode){    
    mode = newMode;
    //para cambiar el boton con la clase activa
    $('button.active')?.classList.remove('active');

    if(newMode === MODES.DRAW){
        $drawBtn.classList.add('active');
        canvas.style.cursor = 'crosshair';
        ctx.lineWidth = 1;
        ctx.globalCompositeOperation = 'source-over'
        return
    }
    if(newMode === MODES.RECTANGLE){
        $rectangleBtn.classList.add('active');
        canvas.style.cursor = 'nw-resize';
        ctx.lineWidth = 2;
        ctx.globalCompositeOperation = 'source-over'
        return
    }
    if(newMode === MODES.ERASE){
        $eraseBtn.classList.add('active');
        canvas.style.cursor = 'url("./cursor/erase.png")0 24, auto';
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineWidth = 20
        return
    }
    if(newMode === MODES.PICKER){
        $pickerBtn.classList.add('active');
        return
    }
}
//init
setMode(MODES.DRAW);

//Show picker if browser supports it
if(typeof window.EyeDropper !== 'undefined'){
    $pickerBtn.removeAttribute('disabled');
}