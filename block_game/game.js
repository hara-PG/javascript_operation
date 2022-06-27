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
let rightPressed = false; // 押されているボタンをブーリアン値として定義、初期化しています。
let leftPressed = false; // 押されているボタンをブーリアン値として定義、初期化しています。

// ブロック変数
let brickRowCount = 3; // プロックの横列
let brickColumnCount = 5; // ブロックの縦列
let brickWidth = 75; // ブロックの横幅
let brickHeight = 20; // ブロックの縦幅
let brickPadding = 10; // ブロックの四方の余白
let brickOffsetTop = 30; // ブロックと上面の幅
let brickOffsetLeft = 30; // ブロックと左面の幅

document.addEventListener("keydown", keyDownHandler, false); // keydownイベントが発火したとき (どれかが押されたとき) 、keyDownHandler()関数が実行
document.addEventListener("keyup", keyUpHandler, false); // keyupイベントが発火した時　(そのキーが押されなくなったき) 、keyUpHandler()関数が実行

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true; // キーが押された時trueへ
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true; // // キーが押された時trueへ
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false; // キーが押された時falseへ
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false; // キーが押された時falseへ
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
        }
      }
    }
  }
}

function drawBall() {
  // drawBall => ボールを描く
  ctx.beginPath(); // キャンバス 2D API のメソッドで、サブパスのリストを空にすることにより新しいパスを開始します。新しいパスを作成したい場合は、このメソッドを呼び出してください。
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2); // サブパスに円弧を加えます。.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
  ctx.fillStyle = color;
  ctx.fill(); // .fill()は現在のパスまたは指定されたパスを現在のパスで埋めます。メソッドを使用して長方形を塗りつぶしfill()ます。
  ctx.closePath(); // 図形の最初と最後の点を自動的に接続する closePath() メソッドで、底辺を作成します。
}

function drawPaddle() {
  collisionDetection();
  // drawPaddle => パドルを描く
  ctx.beginPath(); //　キャンバス 2D API のメソッドで、サブパスのリストを空にすることにより新しいパスを開始します。新しいパスを作成したい場合は、このメソッドを呼び出してください。
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = color; // .fillStyleは図形の内側を塗りつぶすために使用する色、グラデーション、またはパターンを指定します。
  ctx.fill(); // .fill()は現在のパスまたは指定されたパスを現在のパスで埋めます。メソッドを使用して長方形を塗りつぶしfill()ます。
  ctx.closePath(); // 図形の最初と最後の点を自動的に接続する closePath() メソッドで、底辺を作成します。
}

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  // draw => 描く
  collisionDetection();
  ctx.clearRect(0, 0, canvas.width, canvas.height); /* clearRect() メソッドは、矩形領域のピクセルを透明な黒 (rgba(0,0,0,0)) に設定します。
  clearRect(x, y, width, height); */
  drawBall(); // drawBall関数を出力
  drawPaddle(); // drawPaddle関数を出力
  drawBricks();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx; // ボールが壁に当たると(X軸)反転させるため！ X軸を＋値・ー値に反転させている
  }
  if (y + dy < ballRadius) {
    dy = -dy; // ボールが壁に当たると(Y軸)反転させるため！ Y軸を＋値・ー値に反転させている
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      // ボールがパドルに当たると反転する。
      dy = -dy;
    } else {
      alert("Game Over!");
      location.reload(); // 再読み込みボタンのように現在の URL を再読み込み
      clearInterval(interval); // clearInterval(intervalID) タイマーの繰り返し動作を取り消す
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx; // ボールが壁に当たるとX軸動作させるため！
  y += dy; // ボールが壁に当たるとY軸動作させるため！
}

let interval = setInterval(draw, 10); // setInterval(function, delay) functionは関数名(関数を出力)、delayは1000ms

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
