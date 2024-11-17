class Red {
  constructor(posX, posY, timeDelay) {
    enemies.push(this);
    this.lives = 1;
    this.posX = posX;
    this.posY = posY;
    this.square = document.createElement("span");
    this.square.className = "red";
    this.updatePos();
    can.appendChild(this.square);
    this.timer;
    setTimeout(() => {
      this.timer = setInterval(() => this.move(), 500);
    }, timeDelay);
  }

  move() {
    if (Math.abs(this.posX - McPosX) - Math.abs(this.posY - McPosY) > 0) {
      if (this.posX < McPosX) {
        this.posX++;
      } else {
        this.posX--;
      }
    } else {
      if (this.posY < McPosY) {
        this.posY++;
      } else {
        this.posY--;
      }
    }
    if (this.posX === McPosX && this.posY === McPosY) {
      kill();
    }
    this.updatePos();
  }

  updatePos() {
    this.square.setAttribute(
      "style",
      `left: ${this.posX * 20}px; top: ${this.posY * 20}px;`
    );
  }

  checkAttack(list) {
    const hit = list.some((x) => {
      return x[0] === this.posX && x[1] === this.posY;
    });
    if (!hit) {
      return;
    }
    this.square.remove();
    clearInterval(this.timer);
    const index = enemies.indexOf(this);
    if (index > -1) {
      // only splice array when item is found
      enemies.splice(index, 1); // 2nd parameter means remove one item only
    }
  }
}
