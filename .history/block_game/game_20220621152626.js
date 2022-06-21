const canvas = document.getElementById("canvas"); // DOMでidの要素を変数canvasに代入
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.stockStyle = "blue";
ctx.moveTo(20, 20);
ctx.lineTo(200, 20);
ctx.stock();
