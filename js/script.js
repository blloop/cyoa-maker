// Canvas preparation
const canvas = document.getElementById('canvas');
canvas.width = CANWIDTH;
canvas.height = CANHEIGHT;
const c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;
c.fillRect(0, 0, CANWIDTH, CANHEIGHT);

// Interface elements
let choices = [];
let boxes = [];
const CHEIGHT = (CBOXH - (2 * CBOXPAD)) / NUMCHOICE;
for (let i = 0; i < NUMCHOICE; i++) {
  choices.push([
    `Blank Choice ${i + 1}`, 
    CANWIDTH - PAGEPAD - CBOXW + CBOXPAD + INDWIDTH, 
    CANHEIGHT - PAGEPAD - CBOXPAD - 
      (CHEIGHT * (NUMCHOICE - i - 1)) - 
      (CHEIGHT - CFSIZE) / 2,
    false
  ]);
  boxes.push([
    CANWIDTH - PAGEPAD - CBOXW + CBOXPAD + INDWIDTH, 
    CANHEIGHT - PAGEPAD - CBOXPAD - 
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
    fade = x + 4;
    setTimeout(() => fadeIn(x + 4, t), t / 25);
  } else {
    fadeOut(100, t);
    currScene += 1;
  }
}

function fadeOut(x, t) {
  if (x < 0) return;
  fade = x - 4;
  setTimeout(() => fadeOut(x - 4, t), t / 25);
}

// Event loop
function loop() {
  drawScene(currScene);
  if (canSelect) {
    drawCBox();
    choices.forEach(ch => drawChoice(ch));    
  }
  drawFade(fade);
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
