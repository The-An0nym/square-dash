const levels = document.getElementById("levels");

function loadLevels() {
  levels.innerHTML = "";
  for (let i = 60; i > atLevel; i--) {
    const lvl = document.createElement("span");
    lvl.innerText = i;
    lvl.className = "lvl locked";
    levels.prepend(lvl);
  }
  for (let i = atLevel; i > 0; i--) {
    const lvl = document.createElement("span");
    lvl.innerText = i;
    lvl.className = "lvl unlocked";
    lvl.setAttribute("onclick", `playLevel(${i})`);
    levels.prepend(lvl);
  }
  const div = document.createElement("div");
  div.innerText = "BACK";
  div.className = "back";
  div.setAttribute("onclick", "mainMenu()");
  levels.appendChild(div);
}

function openLevels() {
  loadLevels();
  document.getElementById("mainMenu").style.display = "none";
  levels.style.display = "flex";
}

function mainMenu() {
  document.getElementById("mainMenu").style.display = "flex";
  levels.style.display = "none";
}
