class Heart {
  constructor() {
    hearts.push(this);
    this.x = Math.floor(Math.random() * 50);
    this.y = Math.floor(Math.random() * 25);

    // Create heart square
    this.heart = document.createElement("span");
    this.heart.className = "square";
    this.heart.setAttribute(
      "style",
      `left: ${this.x * 2}%; top: ${this.y * 4}%; background-color: #5d5;`
    );

    // Delay the spawn of the square
    this.spawnDelay = setTimeout(() => {
      this.spawn();
    }, (Math.random() + 0.5) * intervalTime * 30);
  }

  spawn() {
    field.appendChild(this.heart);
  }

  remove() {
    // Called from Main() when the level is finished or if the player lands on the heart square
    this.heart.remove();
    // To make sure the heart doesn't spawn in later (e.g. in case the level finished too early for the heart to spawn)
    clearTimeout(this.spawnDelay);

    // Set object to null and remove it from enemies list
    const index = hearts.indexOf(this);
    removeConnections(index, false);
  }
}
