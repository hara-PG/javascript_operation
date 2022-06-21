var canvas = document.getElementById("myCanvas"); // DOMでidの要素を変数canvasに代入
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
