const canvas = document.getElementById("myCanvas");
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext("2d");

context.fillStyle = "White";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

const sp = { x: 0, y: 300 };
const ep = { x: 800, y: 300 };
const cp = { x: canvas.width / 2, y: 50 };
const centerPoint = { x: (sp.x + ep.x) / 2, y: (sp.y + ep.y) / 2 };
// sp.x = 0;
// sp.y = canvas.height / 2;
// ep.x = canvas.width;
// ep.y = canvas.height / 2;
debugPoint(sp);
debugPoint(ep);
debugPoint(centerPoint, "blue");
drawCurve(sp, cp, ep);

const numPoints = 10;
for (let i = 0; i <= numPoints; i++) {
  let dist = 1 / numPoints;
  debugPoint(quadBez(sp, cp, ep, i * dist), "green");
}
function debugPoint(point, color = "red", radius = 5) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
}

function drawCurve(sp, cp, ep) {
  context.strokeStyle = "black";
  context.beginPath();
  context.moveTo(sp.x, sp.y);
  context.quadraticCurveTo(cp.x, cp.y, ep.x, ep.y);
  context.stroke();
}

function quadBez(sp, cp, ep, t) {
  var pFinal = {};
  pFinal.x = Math.pow(1 - t, 2) * sp.x + (1 - t) * 2 * t * cp.x + t * t * ep.x;
  pFinal.y = Math.pow(1 - t, 2) * sp.y + (1 - t) * 2 * t * cp.y + t * t * ep.y;
  return pFinal;
}
