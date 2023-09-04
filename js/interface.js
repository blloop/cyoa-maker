function drawChoice(ch) {
  c.fillStyle = CFCOLOR;
  c.font = `${CFSIZE}px ${CFONT}`;
  if (ch[3]) {
    c.fillStyle = 'pink';
    c.fillText('>', ch[1] - INDWIDTH, ch[2], INDWIDTH)
  }
  c.fillText(ch[0], ch[1], ch[2], CBOXW - (2 * CBOXPAD));
}

function drawCBox() {
  c.fillStyle = 'gray';
  c.fillRect(
    CANWIDTH - PAGEPAD - CBOXW, 
    CANHEIGHT - PAGEPAD - CBOXH, 
    CBOXW, CBOXH
  );
}

function drawFade(x) {
  c.fillStyle = `rgba(0, 0, 0, ${x/100}`;
  c.fillRect(0, 0, CANWIDTH, CANHEIGHT);
}