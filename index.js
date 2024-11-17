const can = document.getElementById("canvas");
const mc = document.getElementById("mc");
mc.style.top = "200px";
mc.style.left = "500px";
var McPosY = 10;
var McPosX = 25;

const aUp = document.getElementById("aUp");
const aLeft = document.getElementById("aLeft");
const aDown = document.getElementById("aDown");
const aRight = document.getElementById("aRight");
const aRound = document.getElementById("aRound");
const attackElements = [aUp, aLeft, aDown, aRight, aRound];
const attackFields = [
  [
    [0, -1],
    [0, -2],
  ],
  [
    [-1, 0],
    [-2, 0],
  ],
  [
    [0, 1],
    [0, 2],
  ],
  [
    [0, 1],
    [0, 2],
  ],
  [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ],
];

var enemies = [];

function initialize() {
  for (let i = 1; i < 50; i++) {
    const line = document.createElement("span");
    line.className = "line_vertical";
    line.style.left = i * 20 + "px";
    can.appendChild(line);
  }
  for (let i = 1; i < 25; i++) {
    const line = document.createElement("span");
    line.className = "line_horizontal";
    line.style.top = i * 20 + "px";
    can.appendChild(line);
  }
}

initialize();

document.addEventListener("keydown", (e) => {
  const key = e.key;
  switch (key) {
    case "ArrowUp":
      moveVertical(1);
      break;
    case "ArrowLeft":
      moveHorizontal(-1);
      break;
    case "ArrowDown":
      moveVertical(-1);
      break;
    case "ArrowRight":
      moveHorizontal(1);
      break;
    case "w":
      attack(0);
      break;
    case "a":
      attack(1);
      break;
    case "s":
      attack(2);
      break;
    case "d":
      attack(3);
      break;
    case " ":
      attack(4);
      break;
  }
});

function moveVertical(int) {
  const y = (McPosY - int) * 20; // inverted due to 0 being at the top
  if (!(y < 0 || y >= 500)) {
    McPosY -= int;
    mc.style.top = y + "px";
  }
}

function moveHorizontal(int) {
  const x = (McPosX + int) * 20;
  if (!(x < 0 || x >= 1000)) {
    McPosX += int;
    mc.style.left = x + "px";
  }
}

function attack(int) {
  requestAnimationFrame(() => {
    attackElements[int].style.display = "block";
    setTimeout(hide, 100, attackElements[int]);
  });

  const killFields = JSON.parse(JSON.stringify(attackFields[int]));
  killFields.map((x) => {
    x[0] += McPosX;
    x[1] += McPosY;
  });
  enemies.forEach((item) => item.checkAttack(killFields));
}

function hide(elem) {
  elem.style.display = "none";
}

function kill() {
  console.log("Game Over!");
}
