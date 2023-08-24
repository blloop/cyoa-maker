// Canvas preparation
const canvas = document.getElementById('canvas');
canvas.width = 960;
canvas.height = 540;
const c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;
c.fillRect(0, 0, canvas.width, canvas.height);

const box = new Sprite({
  position: { x: 520, y: 300 },
  size: { width: 400, height: 200 },
  source: './img/textbox.png'
})

let choice1 = [550, 330, 340, 60, false];
let choice2 = [550, 410, 340, 60, false];
function drawBox(box) {
  c.fillStyle = box[4] ? 'yellow' : 'blue'
  c.fillRect(box[0], box[1], box[2], box[3])
}

function loop() {
  box.update();
  drawBox(choice1);
  drawBox(choice2);
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
  if (cursorOn(mX, mY, choice1)) {
    canvas.style.cursor = 'pointer';
    choice1[4] = true;
  } else if (cursorOn(mX, mY, choice2)) {
    canvas.style.cursor = 'pointer';
    choice2[4] = true;
  } else {
    canvas.style.cursor = 'default';
    choice1[4] = false;
    choice2[4] = false;
  }
}

window.onmouseup = function(e) {
  let rect = canvas.getBoundingClientRect();
  let mX = e.pageX - rect.left;
  let mY = e.pageY - rect.top;
  if (cursorOn(mX, mY, choice1)) {
    return;
  } else if (cursorOn(mX, mY, choice2)) {
    return;
  }
}
