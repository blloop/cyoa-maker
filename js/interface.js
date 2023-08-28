function drawChoice(ch) {
  c.fillStyle = 'white';
  c.font = '24px Verdana';
  if (ch[3]) {
    c.fillStyle = 'pink';
    c.fillText('>', ch[1] - INDWIDTH, ch[2], INDWIDTH)
  }
  c.fillText(ch[0], ch[1], ch[2], CBOXW - (2 * CBOXPAD));
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

function drawFade(x) {
  c.fillStyle = `rgba(0, 0, 0, ${x/100}`;
  c.fillRect(0, 0, canvas.width, canvas.height);
}