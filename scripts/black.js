class Black {
  constructor() {
    enemies.push(this);

    [this.posX, this.posY] = randomPosition();

    this.square = document.createElement("span");
    this.square.className = "black";
    this.updatePos();

    this.warn = 0;

    this.warnLineV = document.createElement("span");
    this.warnLineH = document.createElement("span");

    this.warnLineV.className = "warnV";
    this.warnLineH.className = "warnH";

    this.square.appendChild(this.warnLineV);
    this.square.appendChild(this.warnLineH);

    this.killLineV = document.createElement("span");
    this.killLineH = document.createElement("span");

    this.killLineV.className = "killV";
    this.killLineH.className = "killH";

    this.square.appendChild(this.killLineV);
    this.square.appendChild(this.killLineH);

    can.appendChild(this.square);

    setTimeout(() => {
      this.startInterval();
    }, Math.random() * 2000);
  }

  startInterval() {
    this.timer = setInterval(() => this.move(), intervalTime * 4);
  }

  move() {
    let x = -5;
    let y = -5;
    if (this.warn === 0) {
      if (Math.random() > 0.5) {
        do {
          x = Math.floor(Math.random() * 50);
        } while (Math.abs(x - McPosX) < 8 || Math.abs(x - McPosX) > 15);
        this.posX = x;
        this.posY = McPosY;
      } else {
        do {
          y = Math.floor(Math.random() * 25);
        } while (Math.abs(y - McPosY) < 8 || Math.abs(y - McPosY) > 15);
        this.posX = McPosX;
        this.posY = y;
      }
      this.updatePos();
      this.warn++;
      return;
    }

    if (this.warn === 1) {
      this.updateWarn();
      this.warn++;
      return;
    }

    this.checkKill();
    this.warn = 0;
  }

  checkKill() {
    this.killLineH.setAttribute("style", "animation: none;");
    this.killLineV.setAttribute("style", "animation: none;");

    requestAnimationFrame(() => {
      this.killLineV.setAttribute(
        "style",
        `display:block; 
      left: ${this.posX * 20}px;
      animation: fadeOut 0.5s forwards;`
      );
      this.killLineH.setAttribute(
        "style",
        `display:block; 
      top: ${this.posY * 20}px; 
      opacity: 1;
      animation: fadeOut 0.5s forwards;`
      );
    });

    if (this.posX === McPosX || this.posY === McPosY) {
      kill();
    }
  }

  updatePos() {
    this.square.setAttribute(
      "style",
      `left: ${this.posX * 20}px; top: ${this.posY * 20}px;`
    );
  }

  updateWarn() {
    this.warnLineV.setAttribute("style", "animation:none;");
    this.warnLineH.setAttribute("style", "animation:none;");

    requestAnimationFrame(() => {
      this.warnLineV.setAttribute(
        "style",
        `display:block; 
      left: ${this.posX * 20 + 5}px;
      animation: fadeOut 2s;`
      );
      this.warnLineH.setAttribute(
        "style",
        `display:block; 
      top: ${this.posY * 20 + 5}px;
      animation: fadeOut 2s;`
      );
    });
  }

  checkAttack(list) {
    const hit = list.some((x) => {
      return x[0] === this.posX && x[1] === this.posY;
    });
    if (!hit) {
      return;
    }

    this.die();
  }

  die() {
    this.square.remove();
    this.warnLineV.remove();
    this.warnLineH.remove();

    clearInterval(this.timer);
    const index = enemies.indexOf(this);
    if (index > -1) {
      // only splice array when item is found
      enemies.splice(index, 1); // 2nd parameter means remove one item only
    }
    removeConnections(this);
  }
}
