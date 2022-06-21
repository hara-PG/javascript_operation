const canvas = document.getElementById("myCanvas"); // DOMでidの要素を変数canvasに代入
const ctx = canvas.getContext("2d"); // canvasを2D化

let paddleHeight = 10; // パドルの高さ
let paddleWidth = 75; // パドルの長さ
let paddleX = (canvas.width - paddleWidth) / 2; // パドルの初期位置
let x = canvas.width / 2; // ボールの初期位置(横位置)　canvas.widthは480px / 2
let y = canvas.height - 30; // ボールの初期位置(高さ位置) canvas.height320px - 30
let dx = 2; // ボールの角度(X軸) +の場合はcanvas.width　/　2より右に射出、-の場合はcanvas.width / 2より左に射出.
let dy = -2; // ボールの角度(Y軸) +の場合はcanvas.height / 2より下に射出、 -の場合はcanvas.height / 2より上に射出。
let ballRadius = 10; // ボールの大きさ
let color = "#0095DD"; // ボールとパドルの色

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  // draw => ボールを描く
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  // draw => 描く
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall(); // drawBall関数を出力
  drawPaddle(); // drawPaddle関数を出力

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  x += dx; // ボールが壁に当たると(X軸)反転させるため！ X軸を＋値・ー値に反転させている
  y += dy; // ボールが壁に当たると(Y軸)反転させるため！ Y軸を＋値・ー値に反転させている
}
setInterval(draw, 10); // setInterval(function, delay) functionは関数名(関数を出力)、delayは1000ms

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
