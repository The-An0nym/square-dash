class Blue {
  constructor(lives = 1) {
    enemies.push(this);
    this.lives = lives <= 2 ? lives : 2;

    const pos = randomPosition();
    this.posX = this.newX = pos[0];
    this.posY = this.newY = pos[1];

    this.square = document.createElement("span");
    this.square.className = `square b${this.lives}`;
    this.updatePos();

    this.charge = true;
    this.chargeLine = document.createElement("span");
    this.chargeLine.className = "charge";
    this.square.appendChild(this.chargeLine);

    can.appendChild(this.square);

    setTimeout(() => {
      this.startInterval();
    }, Math.random() * 1000);
  }

  startInterval() {
    this.timer = setInterval(() => this.move(), 1000);
  }

  move() {
    this.charge = !this.charge;
    if (!this.charge) {
      if (Math.abs(this.posX - McPosX) - Math.abs(this.posY - McPosY) > 0) {
        this.newX = McPosX;
      } else {
        this.newY = McPosY;
      }
      this.updateCharge();
      return;
    }

    this.posX = this.newX;
    this.posY = this.newY;

    this.updateCharge();

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

  updateCharge() {
    if (this.charge) {
      this.chargeLine.setAttribute("style", "display:none;");
      return;
    }
    const x = this.newX - this.posX > 0 ? this.posX : this.newX;
    const y = this.newY - this.posY > 0 ? this.posY : this.newY;
    const w =
      this.newX - this.posX === 0 ? 1.5 : Math.abs(this.newX - this.posX) * 20;
    const h =
      this.newY - this.posY === 0 ? 1.5 : Math.abs(this.newY - this.posY) * 20;

    this.newX >=
      this.chargeLine.setAttribute(
        "style",
        `display:block; 
      left: ${x * 20 + 10}px; 
      top: ${y * 20 + 10}px; 
      width: ${w}px;
      height: ${h}px`
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
      this.square.className = `square b${this.lives}`;
      return;
    }
    this.die();
  }

  die() {
    this.square.remove();
    this.chargeLine.remove();

    clearInterval(this.timer);
    const index = enemies.indexOf(this);
    if (index > -1) {
      // only splice array when item is found
      enemies.splice(index, 1); // 2nd parameter means remove one item only
    }
  }
}
