function randomPosition() {
  const x = Math.floor(Math.random() * 60) - 5;
  const y = Math.floor(Math.random() * 35) - 5;

  const margin = Math.floor(Math.random() * 15) + 15;
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
