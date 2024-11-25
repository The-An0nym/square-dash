function playLevel(int) {
  currLevel = int;
  console.log("Playing level " + int);
  document.getElementById("menu").style.display = "none";
  McLives = maxLives = levelData[int]["hp"];
  filling.style.width = (McLives / maxLives) * 30 + "px";
  if (levelData[int]["time"]) {
    intervalTime = levelData[int]["time"];
  }
  for (let i = 0; i < levelData[int]["r1"]; i++) {
    new Red();
  }
  for (let i = 0; i < levelData[int]["r2"]; i++) {
    new Red(2);
  }
  for (let i = 0; i < levelData[int]["r3"]; i++) {
    new Red(3);
  }
  for (let i = 0; i < levelData[int]["b1"]; i++) {
    new Blue();
  }
  for (let i = 0; i < levelData[int]["b2"]; i++) {
    new Blue(2);
  }
  for (let i = 0; i < levelData[int]["bl"]; i++) {
    new Black();
  }
}

async function getFile() {
  await fetch("levelData.json")
    .then((res) => res.json())
    .then((d) => (levelData = d))
    .catch((e) => console.error(e));
}

let levelData;
getFile();
