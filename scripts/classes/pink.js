class Pink {
  constructor(lives = 1) {
    enemies.push(this);
    this.lives = lives <= 3 ? lives : 3;
    [this.x, this.y] = randomPosition();

    // Desync the counter
    this.counter = Math.floor(Math.random() * 4); // Attacks every 4th tick

    // Create pink square
    this.square = document.createElement("span");
    this.square.className = `square p${this.lives}`;
    this.updatePos();

    // Create the attack fields
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
      tile.setAttribute("style", `left: ${x[0] * 2}%; top: ${x[1] * 4}%;`);
      this.areaAttack.appendChild(tile);
    }

    this.square.appendChild(this.areaAttack);
    field.appendChild(this.square);

    // Desync enemy movement
    setTimeout(() => {
      this.startInterval();
    }, Math.random() * 500);
  }

  startInterval() {
    this.timer = setInterval(() => this.move(), intervalTime); // Do something every tick
  }

  move() {
    // Hide attack squares
    if (this.counter === 0) this.areaAttack.style.display = "none";

    // Attack & reset counter
    if (this.counter >= 4) {
      this.counter = 0;
      // Checks whether pink square is close enough
      if (Math.abs(this.x - playerX) < 7 && Math.abs(this.y - playerY) < 7) {
        this.attack();
        return;
      }
    }
    this.counter++;

    // Movement of the pink square. If y difference to player = x difference to player, decide by random
    if (
      Math.abs(this.x - playerX) - Math.abs(this.y - playerY) >
      Math.round(-Math.random())
    ) {
      // If enemy is to the right of player (or not)
      if (this.x < playerX) this.x++;
      else this.x--;
    } else {
      // If the enemy is above player (or not)
      if (this.y < playerY) this.y++;
      else this.y--;
    }

    // If on player square
    if (this.x === playerX && this.y === playerY) damagePlayer();
    this.updatePos();
  }

  updatePos() {
    this.square.setAttribute(
      "style",
      `left: ${this.x * 2}%; top: ${this.y * 4}%;`
    );
  }

  attack() {
    // Reset animation
    this.areaAttack.setAttribute("style", "animation: none;");

    // Play animation
    requestAnimationFrame(() => {
      this.areaAttack.setAttribute("style", "animation: fadeOut 1s forwards;");
    });

    // If player is on attacked square
    if (
      this.fields.some(
        (x) => this.x + x[0] === playerX && this.y + x[1] === playerY
      )
    )
      damagePlayer();
  }

  checkAttack(list) {
    // Check if square is on an attacked field
    const hit = list.some((x) => {
      return x[0] === this.x && x[1] === this.y;
    });
    if (!hit) return;

    this.lives--;
    if (this.lives > 0) {
      this.square.className = `square p${this.lives}`;
      return;
    }
    this.die();
  }

  die() {
    // Remove square from thml
    this.square.remove();

    clearInterval(this.timer);

    // Set object to null and remove it from enemies list
    const index = enemies.indexOf(this);
    removeConnections(index, true);
  }
}
