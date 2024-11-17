class Blue {
  constructor(posX, posY, timeDelay) {
    enemies.push(this);
    this.lives = 1;
    this.posX = posX;
    this.newX = posX;
    this.posY = posY;
    this.newY = posY;
    this.square = document.createElement("span");
    this.square.className = "blue";
    this.updatePos();
    can.appendChild(this.square);

    this.charge = true;
    this.chargeLine = document.createElement("span");
    this.chargeLine.className = "charge";
    can.appendChild(this.chargeLine);

    this.timer;
    setTimeout(() => {
      this.timer = setInterval(() => this.move(), 1000);
    }, timeDelay);
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
