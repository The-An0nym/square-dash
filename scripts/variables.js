const can = document.getElementById("canvas");
const mc = document.getElementById("mc");
const filling = document.getElementById("filling");
mc.style.top = "200.5px";
mc.style.left = "500.5px";
var McPosY = 10;
var McPosX = 25;

var maxLives = 5;
var McLives = maxLives;

var atLevel = 1;
var currLevel;

var intervalTime = 500;

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

var enemies = [];
var hearts = [];
