class Black {
  constructor() {
    enemies.push(this);
    [this.x, this.y] = randomPosition();

    // Create black square
    this.square = document.createElement("span");
    this.square.className = "square B";
    this.updatePos();

    this.stage = 0; // Enemy cycle stage. 0 = change position, 1 = warn, 2 = kill

    // Create warn lines
    this.warnLineV = document.createElement("span");
    this.warnLineH = document.createElement("span");
    this.warnLineV.className = "warnV";
    this.warnLineH.className = "warnH";
    this.square.appendChild(this.warnLineV);
    this.square.appendChild(this.warnLineH);

    // Create kill lines
    this.killLineV = document.createElement("span");
    this.killLineH = document.createElement("span");
    this.killLineV.className = "killV";
    this.killLineH.className = "killH";
    this.square.appendChild(this.killLineV);
    this.square.appendChild(this.killLineH);

    // Append square to field
    field.appendChild(this.square);

    // Desyncs enemy movement
    setTimeout(() => {
      this.startInterval();
    }, Math.random() * 2000);
  }

  startInterval() {
    this.timer = setInterval(() => this.move(), intervalTime * 4); // Do something every 4 ticks
  }

  updatePos() {
    this.square.setAttribute(
      "style",
      `left: ${this.x * 2}%; top: ${this.y * 4}%;`
    );
  }

  move() {
    // Teleport black square
    if (this.stage === 0) {
      let x;
      let y;
      // Decides whether to land on the players x or y axis
      if (Math.round(Math.random()) === 0) {
        // Determine x position (can't be too close to the player)
        do {
          x = Math.floor(Math.random() * 50);
        } while (Math.abs(x - playerX) < 8 || Math.abs(x - playerX) > 15);
        // Apply positions
        this.x = x;
        this.y = playerY;
      } else {
        // Determine y position (can't be too close to the player)
        do {
          y = Math.floor(Math.random() * 25);
        } while (Math.abs(y - playerY) < 8 || Math.abs(y - playerY) > 15);
        // Apply positions
        this.x = playerX;
        this.y = y;
      }
      this.updatePos();
      this.stage++;
      return;
    }

    // Sends out warn beams
    if (this.stage === 1) {
      this.updateWarn();
      this.stage++;
      return;
    }

    // Kills player
    this.checkKill();
    this.stage = 0;
  }

  updateWarn() {
    // Reset animation
    this.warnLineV.setAttribute("style", "animation:none;");
    this.warnLineH.setAttribute("style", "animation:none;");

    // Set animation and position
    requestAnimationFrame(() => {
      this.warnLineV.setAttribute(
        "style",
        `display:block; 
      left: calc(${this.x * 2}% + 3px);
      animation: fadeOut 2s;`
      );
      this.warnLineH.setAttribute(
        "style",
        `display:block; 
      top: calc(${this.y * 4}% + 3px);
      animation: fadeOut 2s;`
      );
    });
  }

  checkKill() {
    // Reset kill beam animation
    this.killLineH.setAttribute("style", "animation: none;");
    this.killLineV.setAttribute("style", "animation: none;");

    // Set kill beam animation
    requestAnimationFrame(() => {
      this.killLineV.setAttribute(
        "style",
        `display:block; 
      left: ${this.x * 2}%;
      animation: fadeOut 0.5s forwards;`
      );
      this.killLineH.setAttribute(
        "style",
        `display:block; 
      top: ${this.y * 4}%; 
      opacity: 1;
      animation: fadeOut 0.5s forwards;`
      );
    });

    if (this.x === playerX || this.y === playerY) {
      damagePlayer();
    }
  }

  checkAttack(list) {
    // Check if square is on an attacked field
    const hit = list.some((x) => {
      return x[0] === this.x && x[1] === this.y;
    });
    if (!hit) return;

    // Black enemy only has one life, so it will immediately die
    this.die();
  }

  die() {
    // Removes square from html
    this.square.remove();
    this.warnLineV.remove();
    this.warnLineH.remove();

    clearInterval(this.timer);

    // Set object to null and remove it from enemies list
    const index = enemies.indexOf(this);
    removeConnections(index, true);
  }
}
