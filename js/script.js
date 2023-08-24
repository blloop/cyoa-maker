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

let choice1 = ['Go Left', 590, 370, 340, false];
let choice2 = ['Go Right', 590, 440, 340, false];
let box1 = [550, 330, 340, 60];
let box2 = [550, 410, 340, 60];

function loop() {
  box.update();
  drawChoice(choice1);
  drawChoice(choice2);
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
  if (cursorOn(mX, mY, box1)) {
    canvas.style.cursor = 'pointer';
    choice1[4] = true;
    choice2[4] = false;
  } else if (cursorOn(mX, mY, box2)) {
    canvas.style.cursor = 'pointer';
    choice1[4] = false;
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
  if (cursorOn(mX, mY, box1)) {
    return;
  } else if (cursorOn(mX, mY, box2)) {
    return;
  }
}
