class Blue {
  constructor(lives = 1) {
    enemies.push(this);
    this.lives = lives <= 2 ? lives : 2;
    [this.newX, this.newY] = [this.x, this.y] = randomPosition();

    // Create blue enemy square
    this.square = document.createElement("span");
    this.square.className = `square b${this.lives}`;
    this.updatePos();

    this.charge = true; // true = charge, false = not charge
    // Create charge line + dot
    this.chargeLine = document.createElement("span");
    this.chargeLine.className = "charge";
    this.chargeLine.setAttribute("style", "display:none;");
    this.dot = document.createElement("span");
    this.dot.className = "dot";

    this.chargeLine.appendChild(this.dot);
    field.appendChild(this.chargeLine);
    field.appendChild(this.square);

    // Desyncs enemy movement
    setTimeout(() => {
      this.startInterval();
    }, Math.random() * 1000);
  }

  startInterval() {
    this.timer = setInterval(() => this.move(), intervalTime * 2); // Do something every 2 ticks
  }

  move() {
    this.charge = !this.charge; // Invert variable
    // If charge (negated as the variable is already inverted)
    if (!this.charge) {
      // If already in line of sight with player, (charge and) teleport there
      if (this.x === playerX) {
        this.newY = playerY;
      } else if (this.y === playerY) {
        this.newX = playerX;
      } else {
        // Else, randomized (to desync enemy movement) (carge and) teleport to player x or y axis
        if (Math.round(Math.random()) === 0) {
          this.newY = playerY;
        } else {
          this.newX = playerX;
        }
      }
      this.setCharge();

      return;
    }

    // Apply the new positions (aka teleport)
    this.x = this.newX;
    this.y = this.newY;

    this.chargeLine.setAttribute("style", "display:none;");

    if (this.x === playerX && this.y === playerY) damagePlayer();
    this.updatePos();
  }

  updatePos() {
    this.square.setAttribute(
      "style",
      `left: ${this.x * 2}%; top: ${this.y * 4}%;`
    );
  }

  setCharge() {
    // Calculate line length (and set width)
    const x = this.newX - this.x > 0 ? this.x : this.newX;
    const y = this.newY - this.y > 0 ? this.y : this.newY;
    const w = this.newX - this.x === 0 ? 0.2 : Math.abs(this.newX - this.x) * 2;
    const h = this.newY - this.y === 0 ? 0.2 : Math.abs(this.newY - this.y) * 4;

    // Style charge line and dot appropriately
    this.chargeLine.setAttribute(
      "style",
      `display:block; 
      left: ${x * 2 + 1}%; 
      top: ${y * 4 + 2}%; 
      width: ${w}%;
      height: ${h}%`
    );

    this.dot.setAttribute(
      "style",
      `left: calc(${this.newX * 2 + 1}% - 2px); top: calc(${
        this.newY * 4 + 2
      }% - 2px);`
    );
  }

  checkAttack(list) {
    // Check if square is on an attacked field
    const hit = list.some((x) => {
      return x[0] === this.x && x[1] === this.y;
    });
    if (!hit) return;

    this.lives--;
    if (this.lives > 0) {
      this.square.className = `square b${this.lives}`;
      return;
    }
    this.die();
  }

  die() {
    // Removes square from html
    this.square.remove();
    this.chargeLine.remove();

    clearInterval(this.timer);

    // Set object to null and remove it from enemies list
    const index = enemies.indexOf(this);
    removeConnections(index, true);
  }
}
