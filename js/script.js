// Canvas preparation
const canvas = document.getElementById('canvas');
canvas.width = 960;
canvas.height = 540;
const c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;
c.fillRect(0, 0, canvas.width, canvas.height);

// Game constants
const NUMCHOICE = 3; // number of user choices
const INDWIDTH = 20; // indicator width, in px
const CBOXW = 400; // width of choice box, in px
const CBOXH = 200; // height of choice box, in px
const CBOXPAD = 40; // padding of choice box, in px
const PAGEPAD = 40; // dialog page padding, in px
const TSDELAY = 400; // transition delay, in ms

// Interface elements
const box = new Sprite({
  position: { x: 520, y: 300 },
  size: { width: CBOXW, height: CBOXH },
  source: './img/textbox.png'
})

let choices = [];
for (let i = 0; i < NUMCHOICE; i++) {
  choices.push([
    'Blank Choice', 
    canvas.width - PAGEPAD - CBOXW + CBOXPAD + INDWIDTH, 
    360 + (i * 50), 
    false
  ]);
}

let box1 = [550, 330, 340, 40];
let box2 = [550, 380, 340, 40];
let box3 = [550, 430, 340, 40];

console.log(choices);
// Event loop
function loop() {
  box.update();
  choices.forEach(ch => drawChoice(ch));
  drawScene(0);
  window.requestAnimationFrame(loop);
}
loop();

function cursorOn(x, y, box) {
  return (x > box[0] && y > box[1] && 
    x < box[0] + box[2] && y < box[1] + box[3]
  );
}

window.onmousemove = function(e) {
  let rect = canvas.getBoundingClientRect();
  let mX = e.pageX - rect.left;
  let mY = e.pageY - rect.top;
  choices[0][3] = cursorOn(mX, mY, box1);
  choices[1][3] = (!choices[0][3] && 
    cursorOn(mX, mY, box2));
  choices[2][3] = (!choices[0][3] && 
    !choices[1][3] && cursorOn(mX, mY, box3));
  canvas.style.cursor = 
    (choices[0][3] || choices[1][3] || choices[2][3]) ?
    'pointer' : 'default';
}

window.onmouseup = function(e) {
  let rect = canvas.getBoundingClientRect();
  let mX = e.pageX - rect.left;
  let mY = e.pageY - rect.top;
  if (cursorOn(mX, mY, box1)) {
    return;
  } else if (cursorOn(mX, mY, box2)) {
    return;
  }
}
