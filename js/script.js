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

function loop() {
  box.update();
  window.requestAnimationFrame(loop);
}
loop();