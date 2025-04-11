// Create grid
(() => {
  // Vertical lines
  for (let i = 0; i <= 50; i++) {
    const line = document.createElement("span");
    line.className = "vertical-line";
    line.style.left = i * 2 + "%";
    field.appendChild(line);
  }
  // Horizontal lines
  for (let i = 0; i <= 25; i++) {
    const line = document.createElement("span");
    line.className = "horizontal-line";
    line.style.top = i * 4 + "%";
    field.appendChild(line);
  }
})();

function resizeCanvas() {
  const wh = window.innerHeight;
  const ww = window.innerWidth;
  let w;
  let h;
  if (ww < wh * 2) {
    w = ww;
    h = ww / 2;
  } else {
    w = wh * 2;
    h = wh;
  }
  document.body.style.fontSize = `${Math.round(w / 110) / 10 - 0.1}rem`;
  canva.style.width = `${w}px`;
  canva.style.height = `${h}px`;
  // field.style.width = `${w - 40}px`;
  // field.style.height = `${h - 20}px`;
  menu.style.width = `${w - 200}px`;
  menu.style.height = `${h - 100}px`;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* MENU RELATED */

function showMainMenu() {
  document.getElementById("mainMenu").style.display = "flex";
  levels.style.display = "none";
  tutorial.style.display = "none";
}

function openTutorial() {
  document.getElementById("mainMenu").style.display = "none";
  tutorial.style.display = "flex";
}

function openLevels() {
  loadLevels();
  document.getElementById("mainMenu").style.display = "none";
  levels.style.display = "flex";
}

function loadLevels() {
  const levelAmount = 30;
  levels.innerHTML = "";

  // Make sure atLevel variable cannot exceed [31]
  if (atLevel > levelAmount + 1) atLevel = levelAmount + 1;

  // If all levels have been beaten, there is no need for this
  if (atLevel !== 31) {
    // locked levels
    for (let i = levelAmount; i > atLevel; i--) {
      const lvl = document.createElement("span");
      lvl.innerText = i;
      lvl.className = "lvl locked";
      levels.prepend(lvl);
    }

    // Unlocked level (not yet beat)
    const lvl = document.createElement("span");
    lvl.innerText = atLevel;
    lvl.className = "lvl unlocked";
    lvl.setAttribute("onclick", `playLevel(${atLevel})`);
    levels.prepend(lvl);
  }

  // Beat levels
  for (let i = atLevel - 1; i > 0; i--) {
    const lvl = document.createElement("span");
    lvl.innerText = i;
    lvl.className = "lvl beat";
    lvl.setAttribute("onclick", `playLevel(${i})`);
    levels.prepend(lvl);
  }
  // Menu button
  const div = document.createElement("div");
  div.innerText = "MENU";
  div.className = "back";
  div.setAttribute("onclick", "showMainMenu()");
  levels.appendChild(div);
}

function playLevel(int) {
  currLevel = int;
  document.getElementById("menu").style.display = "none";
  playerLives = maxLives = levelData[int]["H"];
  hpBarHealth.style.width = (playerLives / maxLives) * 100 + "%";
  // Time (default is 500)
  if (levelData[int]["t"]) {
    intervalTime = levelData[int]["t"];
  }
  const colors = ["h", "r", "b", "B", "p"];
  for (let colIndx = 0; colIndx < colors.length; colIndx++) {
    const list = levelData[int][colors[colIndx]];
    // i keeps track of list position -> Determines lives count
    for (let i = 0; i < list.length; i++) {
      // j keeps track of how many to create
      for (let j = 0; j < list[i]; j++) {
        new [Heart, Red, Blue, Black, Pink][colIndx](i + 1);
      }
    }
  }
}
