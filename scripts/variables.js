// Menu & Canvas
const canva = document.getElementById("canvas");
const field = document.getElementById("field");
const menu = document.getElementById("menu");
const levels = document.getElementById("levels");
const tutorial = document.getElementById("tutorial");

// Player
const player = document.getElementById("player");
const hpBarHealth = document.getElementById("hpBarHealth");

player.style.top = "40%";
player.style.left = "50%";
let playerY = 10;
let playerX = 25;

let playerLives = (maxLives = 5);

// Level
let atLevel = localStorage.getItem("atLevel")
  ? localStorage.getItem("atLevel")
  : 1;
let currLevel;

// Timing
let intervalTime = 500;

// Attack
let attackCooldown = [false, false, false, false, false];
let movingNow = false;

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
    [1, 0],
    [2, 0],
  ],
  [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ],
];

// Enemies
let enemies = [];
let hearts = [];

// Level data
let levelData;
(async function () {
  await fetch("levelData.json")
    .then((res) => res.json())
    .then((d) => (levelData = d))
    .catch((e) => console.error(e));
})();
