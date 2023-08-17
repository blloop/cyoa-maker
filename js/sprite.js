class Sprite {
  constructor({ 
    position, size, source
  }) {
    this.position = { 
      x: position.x, y: position.y
    };
    this.width = size.width;
    this.height = size.height;
    this.image = new Image();
    this.image.src = source;
  }

  draw() {
    c.drawImage(this.image, 
      this.position.x, this.position.y,
      this.width, this.height
    );
  }

  update() {
    this.draw();
  }
}