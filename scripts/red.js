class Red {
  constructor(lives = 1) {
    enemies.push(this);
    this.lives = lives <= 3 ? lives : 3;

    [this.posX, this.posY] = randomPosition();

    this.square = document.createElement("span");
    this.square.className = `square r${this.lives}`;
    this.updatePos();

    can.appendChild(this.square);

    setTimeout(() => {
      this.startInterval();
    }, Math.random() * 500);
  }

  startInterval() {
    this.timer = setInterval(() => this.move(), intervalTime);
  }

  move() {
    if (
      Math.abs(this.posX - McPosX) - Math.abs(this.posY - McPosY) >
      Math.round(-Math.random())
    ) {
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

    this.lives--;
    if (this.lives > 0) {
      this.square.className = `square r${this.lives}`;
      return;
    }
    this.die();
  }

  die() {
    this.square.remove();
    clearInterval(this.timer);
    const index = enemies.indexOf(this);
    if (index > -1) {
      // only splice array when item is found
      enemies.splice(index, 1); // 2nd parameter means remove one item only
    }
    removeConnections(this);
  }
}
