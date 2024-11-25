function initialize() {
  for (let i = 0; i < 51; i++) {
    const line = document.createElement("span");
    line.className = "line_vertical";
    line.style.left = i * 20 + "px";
    can.appendChild(line);
  }
  for (let i = 0; i < 26; i++) {
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
    mc.style.top = y + 0.5 + "px";
  }
  checkClipping();
}

function moveHorizontal(int) {
  const x = (McPosX + int) * 20;
  if (!(x < 0 || x >= 1000)) {
    McPosX += int;
    mc.style.left = x + 0.5 + "px";
  }
  checkClipping();
}

function checkClipping() {
  enemies.forEach((obj) => {
    if (obj.posX === McPosX && obj.posY === McPosY) {
      kill();
    }
  });
  hearts.forEach((obj) => {
    if (obj.x === McPosX && obj.y === McPosY) {
      McLives++;
      filling.style.width = (McLives / maxLives) * 30 + "px";
      obj.remove();
    }
  });
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
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].checkAttack(killFields);
  }
  if (
    enemies.length === 0 &&
    document.getElementById("menu").style.display === "none"
  ) {
    if (currLevel === atLevel) {
      atLevel++;
    }
    document.getElementById("menu").style.display = "flex";
    openLevels();
  }
}

function hide(elem) {
  elem.style.display = "none";
}

function kill() {
  McLives--;
  filling.style.width = (McLives / maxLives) * 30 + "px";
  if (McLives > 0) {
    return;
  }

  document.getElementById("menu").style.display = "flex";
  mainMenu();

  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].die();
  }
}

function removeConnections(obj) {
  obj = null;
}
