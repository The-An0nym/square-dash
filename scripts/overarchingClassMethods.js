function randomPosition() {
  const x = Math.floor(Math.random() * 60) - 5;
  const y = Math.floor(Math.random() * 35) - 5;

  const margin = Math.floor(Math.random() * 5) + 5;
  const rand = Math.floor(Math.random() * 4);

  switch (rand) {
    case 0:
      return [x, -margin];
    case 1:
      return [x, 25 + margin];
    case 2:
      return [-margin, y];
    case 3:
      return [50 + margin, y];
  }
  return [0, 0];
}

function randomFieldPosition() {
  return [Math.floor(Math.random() * 50), Math.floor(Math.random() * 25)];
}

function removeConnections(index, isEnemy) {
  // Check if index is valid (if enemy is found in list)
  if (index === -1) return;
  if (isEnemy) {
    enemies[index] = null;
    enemies.splice(index, 1); // 2nd parameter means remove one item only
  } else {
    hearts[index] = null;
    hearts.splice(index, 1);
  }
}
