function drawChoice(x) {
  c.fillStyle = x[3] ? 'pink' : 'white';
  c.font = '24px Verdana';
  c.fillText(x[0], x[1], x[2], CBOXW - (2 * CBOXPAD));
  if (x[3]) c.fillText('>', x[1] - INDWIDTH, x[2], INDWIDTH)
}

function drawScene(num) {
  c.fillStyle = 'white';
  c.font = '24px Verdana';
  c.fillText(num.toString(), 30, 40);
}