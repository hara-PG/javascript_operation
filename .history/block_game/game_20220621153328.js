const canvas = document.getElementById("canvas"); // DOMでidの要素を変数canvasに代入
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
