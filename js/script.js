// Canvas preparation
const canvas = document.getElementById('canvas');
canvas.width = 960;
canvas.height = 540;
const c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;
c.fillRect(0, 0, canvas.width, canvas.height);

// Game constants
const NUMCHOICE = 4; // number of user choices
const INDWIDTH = 30; // indicator width, in px
const CFSIZE = 24; // font size of choice box, in px
const CBOXW = 400; // width of choice box, in px
const CBOXH = 200; // height of choice box, in px
const CBOXPAD = 20; // padding of choice box, in px
const PAGEPAD = 40; // dialog page padding, in px
const TSDELAY = 400; // transition delay, in ms
const FADETIME = 300; // time to fade in / out, in ms

// Interface elements
let choices = [];
let boxes = [];
const CHEIGHT = (CBOXH - (2 * CBOXPAD)) / NUMCHOICE;
for (let i = 0; i < NUMCHOICE; i++) {
  choices.push([
    `Blank Choice ${i + 1}`, 
    canvas.width - PAGEPAD - CBOXW + CBOXPAD + INDWIDTH, 
    canvas.height - PAGEPAD - CBOXPAD - 
      (CHEIGHT * (NUMCHOICE - i - 1)) - 
      (CHEIGHT - CFSIZE) / 2,
    false
  ]);
  boxes.push([
    canvas.width - PAGEPAD - CBOXW + CBOXPAD + INDWIDTH, 
    canvas.height - PAGEPAD - CBOXPAD - 
      (CHEIGHT * (NUMCHOICE - i)),
    CBOXW - (2 * CBOXPAD),
    CHEIGHT
  ]);
}

// Choice selection and screen fading
let canSelect = true;
let fade = 0;
let currScene = 0;
function fadeIn(x, t) {
  if (x < 100) {
    fade = x + 1;
    setTimeout(() => fadeIn(x + 1, t), t / 100);
  } else {
    fadeOut(100, t);
    currScene += 1;
  }
}

function fadeOut(x, t) {
  if (x < 0) return;
  fade = x - 1;
  setTimeout(() => fadeOut(x - 1, t), t / 100);
}

// Event loop
function loop() {
  drawScene(currScene);
  drawCBox();
  choices.forEach(ch => drawChoice(ch));
  window.requestAnimationFrame(loop);
  drawFade(fade);
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
  let chosen = false;
  for (let i = 0; i < NUMCHOICE; i++) {
    choices[i][3] = canSelect && 
      !chosen && cursorOn(mX, mY, boxes[i]);
    chosen = choices[i][3] ? true : chosen;
  }
  canvas.style.cursor = chosen ? 'pointer' : 'default';
}

window.onmouseup = function(e) {
  for (let i = 0; i < NUMCHOICE; i++) {
    if (choices[i][3]) {
      choices[i][3] = false;
      fadeIn(0, FADETIME);
      canSelect = false;
      setTimeout(() => canSelect = true, FADETIME * 2);
      break;
    }
  }
}
