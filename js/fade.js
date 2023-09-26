// Screen fade
let fade = 0;

// Fade change
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

// Fade draw
function drawFade(x) {
  c.fillStyle = `rgba(0, 0, 0, ${x/100}`;
  c.fillRect(0, 0, CANWIDTH, CANHEIGHT);
}
