const canvas = document.getElementById("myCanvas"); // DOMでidの要素を変数canvasに代入
const ctx = canvas.getContext("2d");

let paddleHeight = 10; // パドルの高さ
let paddleWidth = 75; // パドルの長さ
let paddleX = (canvas.width - paddleWidth) / 2; // パドルの初期位置
let x = canvas.width / 2; // ボールの初期位置　canvas.widthは480px / 2
let y = canvas.height - 30; // ボールの初期位置 canvas.height320px - 30
let dx = 2;
let dy = -2;
let ballRadius = 10;
let color = "#0095DD";

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  console.log("Y" + x);
  console.log("DY" + dx);
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  x += dx;
  y += dy;
}
setInterval(draw, 10);

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.fillStyle = "rgba(0,0,255,0.5)";
// ctx.fill();
// ctx.closePath();
