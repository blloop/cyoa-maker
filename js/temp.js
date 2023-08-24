function drawChoice(x) {
  c.fillStyle = x[4] ? 'pink' : 'white';
  c.font = '24px Verdana';
  c.fillText(x[0], x[1], x[2], x[3]);
  if (x[4]) c.fillText('>', x[1] - 40, x[2], x[3])
  // c.fillStyle = x[4] ? 'yellow' : 'blue'
  // c.fillRect(x[0], x[1], x[2], x[3]);
}

function drawScene(num) {
  c.fillStyle = 'white';
  c.font = '24px Verdana';
  c.fillText(num.toString(), 30, 40);
}