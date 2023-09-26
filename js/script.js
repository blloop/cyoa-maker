// Canvas preparation
const canvas = document.getElementById('canvas');
canvas.width = CANWIDTH;
canvas.height = CANHEIGHT;
const c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;
c.fillRect(0, 0, CANWIDTH, CANHEIGHT);

// Import: fade.js
// - Variables: fade
// - Functions: fadeIn, fadeOut, drawFade

// Import: sprite.js
// - Classes: Sprite

// Import: interface.js
// - Variables: cbox, carrow, choices, boxes
// - Functions: drawChoice

// Scene and choice structure
let canSelect = true;
let isSelect = true;
let sceneNum = 0;
let sceneImg = new Sprite({
  position: { x: 0, y: 0 }, 
  size: { width: CANWIDTH, height: CANHEIGHT },
  source: SCENES[0][0]
});

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
