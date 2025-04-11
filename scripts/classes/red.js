class Red {
  constructor(lives = 1) {
    enemies.push(this);
    this.lives = lives <= 3 ? lives : 3;

    [this.x, this.y] = randomPosition();

    // Create square
    this.square = document.createElement("span");
    this.square.className = `square r${this.lives}`;
    this.updatePos();

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
    // If y difference to player = x difference to player, decide by random
    if (
      Math.abs(this.x - playerX) - Math.abs(this.y - playerY) >=
      Math.round(Math.random())
    ) {
      // If enemy is to the right of player (or not)
      if (this.x < playerX) this.x++;
      else this.x--;
    } else {
      // If enemy is above the player (or not)
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

  checkAttack(list) {
    // Check if square is on an attacked field
    const hit = list.some((x) => {
      return x[0] === this.x && x[1] === this.y;
    });
    if (!hit) return;

    this.lives--;
    if (this.lives > 0) {
      this.square.className = `square r${this.lives}`;
      return;
    }
    this.die();
  }

  die() {
    // Remove square from html
    this.square.remove();

    clearInterval(this.timer);

    // Set object to null and remove it from enemies list
    const index = enemies.indexOf(this);
    removeConnections(index, true);
  }
}
