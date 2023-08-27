function drawChoice(x) {
  c.fillStyle = 'white';
  c.font = '24px Verdana';
  if (x[3]) {
    c.fillStyle = 'pink';
    c.fillText('>', x[1] - INDWIDTH, x[2], INDWIDTH)
  }
  c.fillText(x[0], x[1], x[2], CBOXW - (2 * CBOXPAD));
}

function drawCBox() {
  c.fillStyle = 'gray';
  c.fillRect(
    canvas.width - PAGEPAD - CBOXW, 
    canvas.height - PAGEPAD - CBOXH, 
    CBOXW, CBOXH
  );
}

function drawScene(num) {
  c.fillStyle = 'white';
  c.font = '24px Verdana';
  c.fillText(num.toString(), 30, 40);
}