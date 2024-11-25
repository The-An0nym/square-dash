class Pink {
  constructor(lives = 1) {
    enemies.push(this);
    this.lives = lives <= 3 ? lives : 3;

    [this.posX, this.posY] = randomPosition();

    this.counter = Math.floor(Math.random() * 4);

    this.square = document.createElement("span");
    this.square.className = `square p${this.lives}`;
    this.updatePos();

    this.areaAttack = document.createElement("span");
    this.areaAttack.className = "areaAttack";
    this.areaAttack.style.opacity = "0";
    this.fields = [
      [0, 3],
      [0, -3],
      [3, 0],
      [-3, 0],
      [2, -1],
      [2, 0],
      [2, 1],
      [1, 2],
      [0, 2],
      [-1, 2],
      [-2, 1],
      [-2, 0],
      [-2, -1],
      [-1, -2],
      [0, -2],
      [1, -2],
    ];
    for (let x of this.fields) {
      const tile = document.createElement("span");
      tile.className = "tile p1";
      tile.setAttribute("style", `left: ${x[0] * 20}px; top: ${x[1] * 20}px;`);
      this.areaAttack.appendChild(tile);
    }

    this.square.appendChild(this.areaAttack);

    can.appendChild(this.square);

    setTimeout(() => {
      this.startInterval();
    }, Math.random() * 500);
  }

  startInterval() {
    this.timer = setInterval(() => this.move(), intervalTime);
  }

  move() {
    if (this.counter === 0) {
      this.areaAttack.style.display = "none";
    }
    if (this.counter >= 4) {
      this.counter = 0;
      if (
        Math.abs(this.posX - McPosX) < 7 &&
        Math.abs(this.posY - McPosY) < 7
      ) {
        this.attack();

        return;
      }
    }
    this.counter++;
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

  attack() {
    this.areaAttack.setAttribute("style", "animation: none;");

    requestAnimationFrame(() => {
      this.areaAttack.setAttribute("style", "animation: fadeOut 1s forwards;");
    });

    if (
      this.fields.some(
        (x) => this.posX + x[0] === McPosX && this.posY + x[1] === McPosY
      )
    )
      kill();
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
      this.square.className = `square p${this.lives}`;
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
