// Canvas preparation
const canvas = document.getElementById('canvas');
canvas.width = CANWIDTH;
canvas.height = CANHEIGHT;
const c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;
c.fillRect(0, 0, CANWIDTH, CANHEIGHT);

// Interface choice box
let cbox = new Sprite({
  position: {
    x: CANWIDTH - PAGEPAD - CBOXW, 
    y: CANHEIGHT - PAGEPAD - CBOXH
  }, 
  size: { width: CBOXW, height: CBOXH },
  source: CBOXIMG
});

// Interface choices
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

let carrow = new Sprite({
  position: {
    x: CANWIDTH - CBOXW + CBOXPAD,
    y: 0
  }, 
  size: { width: INDWIDTH, height: CHEIGHT },
  source: CARRIMG
});

// Scene and choice structure
let canSelect = true;
let isSelect = true;
let sceneNum = 0;
let sceneImg = new Sprite({
  position: { x: 0, y: 0 }, 
  size: { width: CANWIDTH, height: CANHEIGHT },
  source: SCENES[0][0]
});

// Screen fade
let fade = 0;
function fadeIn(x, t) {
  if (x > 100) return;
  fade = x + 4;
  setTimeout(() => fadeIn(x + 4, t), t / 25);
}
function fadeOut(x, t) {
  if (x < 0) return;
  fade = x - 4;
  setTimeout(() => fadeOut(x - 4, t), t / 25);
}

// Event loop
function loop() {
  sceneImg.update();
  if (SCENES[sceneNum][1]) {
    cbox.update();
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
  if (!SCENES[sceneNum][1]) {
    canvas.style.cursor = canSelect ? 'pointer' : 'default';
    return;
  }
  for (let i = 0; i < NUMCHOICE; i++) {
    choices[i][3] = canSelect &&
      !chosen && cursorOn(mX, mY, boxes[i]);
    chosen = choices[i][3] ? true : chosen;
  }
  canvas.style.cursor = chosen ? 'pointer' : 'default';
}

window.onmouseup = function(e) {
  if (!SCENES[sceneNum][1]) {
    if (canSelect) {
      sceneNum = SCENES[sceneNum][2];
      sceneImg.src(SCENES[sceneNum][0]);
    }
    return;
  }
  for (let i = 0; i < NUMCHOICE; i++) {
    if (choices[i][3]) {
      choices[i][3] = false;
      canSelect = false;
      fadeIn(0, FADETIME);
      setTimeout(() => {
        sceneNum = SCENES[sceneNum][3][i];
        sceneImg.src(SCENES[sceneNum][0]);
        fadeOut(100, FADETIME);
      }, FADETIME);
      setTimeout(() => {
        canSelect = true;
      }, FADETIME);
      break;
    }
  }
}
