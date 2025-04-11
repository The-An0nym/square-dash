document.addEventListener("keydown", (e) => {
  switch (e.key) {
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
  const y = (playerY - int) * 4; // inverted due to 0 being at the top
  if (!(y < 0 || y >= 100)) {
    playerY -= int;
    player.style.top = y + "%";
  }
  checkSquare();
}

function moveHorizontal(int) {
  const x = (playerX + int) * 2;
  if (!(x < 0 || x >= 100)) {
    playerX += int;
    player.style.left = x + "%";
  }
  checkSquare();
}

function checkSquare() {
  // Check if on enemy square
  enemies.forEach((obj) => {
    if (obj.posX === playerX && obj.posY === playerY) {
      damagePlayer();
    }
  });

  // Check if on heart square
  hearts.forEach((obj) => {
    if (obj.x === playerX && obj.y === playerY) {
      playerLives++;
      hpBarHealth.style.width = (playerLives / maxLives) * 100 + "%";
      obj.remove();
    }
  });
}

function attack(int) {
  if (attackCooldown[int]) return;
  attackCooldown[int] = true;

  // Handles cool-down and attack animation
  attackElements[int].style.opacity = "1";
  attackElements[int].style.display = "block";
  setTimeout(() => (attackElements[int].style.opacity = "0.3"), 100);
  setTimeout(() => {
    attackCooldown[int] = false;
    attackElements[int].style.display = "none";
  }, intervalTime);

  const killFields = JSON.parse(JSON.stringify(attackFields[int]));
  // Calculate attacked coordinates
  killFields.map((x) => {
    x[0] += playerX;
    x[1] += playerY;
  });
  // Apply the attack fields (represented as coordinates)
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].checkAttack(killFields);
  }

  // If the player has won (=> no enemies are left in the fiel)
  if (enemies.length === 0 && menu.style.display === "none") {
    // Clear hearts
    for (let i = hearts.length - 1; i >= 0; i--) {
      hearts[i].remove();
    }
    if (currLevel === atLevel) {
      atLevel++;
      localStorage.setItem("atLevel", atLevel);
    }
    menu.style.display = "flex";
    openLevels();
  }
}

function damagePlayer() {
  playerLives--;
  // Update hp bar
  hpBarHealth.style.width = (playerLives / maxLives) * 100 + "%";

  // Guard clause in case the player isn't dead yet
  if (playerLives > 0) return;

  menu.style.display = "flex";
  showMainMenu();

  // Clear enemies and hearts
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].die();
  }
  for (let i = hearts.length - 1; i >= 0; i--) {
    hearts[i].remove();
  }
}
