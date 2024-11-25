class Heart {
  constructor() {
    hearts.push(this);
    const pos = randomFieldPosition();
    this.x = pos[0];
    this.y = pos[1];
    this.heart = document.createElement("span");
    this.heart.className = "square";
    this.heart.setAttribute(
      "style",
      `left: ${this.x * 20}px; top: ${this.y * 20}px; background-color: #5d5;`
    );
    can.appendChild(this.heart);
  }

  remove() {
    this.heart.remove();
    removeConnections(this);
  }
}
