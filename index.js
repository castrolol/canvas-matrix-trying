import "./style.css";

const canvas = document.querySelector("canvas");
const canvas2 = document.createElement("canvas");
const canvas3 = document.createElement("canvas");

canvas2.width = canvas.width;
canvas2.height = canvas.height;

canvas3.width = canvas.width;
canvas3.height = canvas.height;

var newImg = new Image();
newImg.onload = function() {
  ctx2.drawImage(newImg, 0, 0, canvas.width, canvas.height);
  start();
};

newImg.src =
  "https://github.com/castrolol/canvas-matrix-trying/blob/master/81108658_2638041152929985_2618873196547407872_n%20(1).jpg?raw=true";

const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const ctx3 = canvas3.getContext("2d");

function start() {
  ctx3.beginPath();
  ctx3.fillStyle = "black";
  ctx3.rect(0, 0, canvas.width, canvas.height);
  ctx3.fill();
  ctx3.closePath();

  loop();
}
let _l = new Date();
var i = 0;

let timeToDrop = 0;

let rainDrops = [];

function loop() {
  var t = (new Date() - _l) / 1000;
  _l = new Date();

  timeToDrop -= t;
  if (timeToDrop <= 0) {
    timeToDrop = 0.5;
    rainDrops.push({
      speed: 2 + Math.random() * 4,
      x: Math.round(Math.random() * canvas.width),
      y: -10,
      ttt: 1,
      letter: getLetter()
    }); 
  }

  rainDrops.forEach(x => {
    x.y += t * 60; 
    x.letter = getLetter(x.letter[0]+1);
  });
 
  ctx3.beginPath();
  ctx3.fillStyle = "rgba(0,0,0,0.005)";
  ctx3.fillRect(0, 0, canvas.width, canvas.height);
  ctx3.fill();
  ctx3.closePath();
  rainDrops.forEach(drop => {
    ctx3.beginPath();
    ctx3.fillStyle = "white";
    ctx3.fillText(drop.letter[1], drop.x, drop.y);
    ctx3.fill();
    ctx3.closePath();
  });

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "normal";

  ctx.drawImage(canvas3, 0, 0);

  ctx.globalCompositeOperation = "multiply";

  ctx.drawImage(canvas2, 0, 0);
  ctx.globalCompositeOperation = "normal";


  rainDrops.forEach(drop => {
    ctx.beginPath();
    ctx.fillStyle = "lime";
    ctx.fillText(drop.letter[1], drop.x, drop.y);
    ctx.fill();
    ctx.closePath();
  });
  requestAnimationFrame(loop);
}

function getLetter(letterIndex) {
   let letters =
    "@#$!abcdefghijklmnopq!@#!#rstuvxzwABCDEFGHIJLKMNOPQRSTUV0123456789$%&@#";
 
  if (!letterIndex) {
    letterIndex = Math.round(Math.random() * (letters.length - 1));
  }
  if (letterIndex >= letters.length) letterIndex = 0;

  return [letterIndex, letters[letterIndex]];
}
