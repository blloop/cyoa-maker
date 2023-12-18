// Choice box elements
function drawChoice(ch) {
  c.fillStyle = CFCOLOR;
  c.font = `${CFSIZE}px ${CFONT}`;
  if (ch[3]) {
    c.fillStyle = 'pink';
    carrow.setY(ch[2] - CFSIZE);
    carrow.update();
  }
  c.fillText(ch[0], ch[1], ch[2], CBOXW - (2 * CBOXPAD));
}

// Interface choice box and arrow
let carrow = new Sprite({
  position: {
    x: CANWIDTH - PAGEPAD - CBOXW + CBOXPAD,
    y: 0
  }, 
  size: { width: INDWIDTH - 10, height: CFSIZE },
  source: CARRIMG
});
let cbox = new Sprite({
  position: {
    x: CANWIDTH - PAGEPAD - CBOXW, 
    y: CANHEIGHT - PAGEPAD - CBOXH
  }, 
  size: { width: CBOXW, height: CBOXH },
  source: CBOXIMG
});

// Interface choices and hover boxes
let choices = [];
let boxes = [];
const CHEIGHT = (CBOXH - (2 * CBOXPAD)) / NUMCHOICE;
for (let i = 0; i < NUMCHOICE; i++) {
  choices.push([
    `Blank Choice ${i + 1}`, 
    CANWIDTH - PAGEPAD - CBOXW + CBOXPAD + INDWIDTH, 
    CANHEIGHT - PAGEPAD - CBOXPAD - 
      (CHEIGHT * (NUMCHOICE - i - 1)) - 
      (CHEIGHT - CFSIZE) / 2,
    false
  ]);
  boxes.push([
    CANWIDTH - PAGEPAD - CBOXW + CBOXPAD + INDWIDTH, 
    CANHEIGHT - PAGEPAD - CBOXPAD - 
      (CHEIGHT * (NUMCHOICE - i)),
    CBOXW - (2 * CBOXPAD),
    CHEIGHT
  ]);
}
