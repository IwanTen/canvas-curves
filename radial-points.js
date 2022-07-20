const canvas = document.getElementById("myCanvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const context = canvas.getContext("2d");

context.fillStyle = "White";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

const sp = { x: 0, y: 300 };
const ep = { x: 800, y: 300 };
const cp = { x: canvas.width / 2, y: 50 };
const centerPoint = { x: (sp.x + ep.x) / 2, y: (sp.y + ep.y) / 2 };
debugPoint(sp);
debugPoint(ep);
debugPoint(centerPoint, "blue");
// drawCurve(sp, cp, ep);
const radius = 200;
const points = generatePoints();
const subPoints = generateSubPoints(points);

for (point of points) {
  debugPoint(point, "green");
}

for (point of subPoints) {
  debugPoint(point, "yellow");
}

function generatePoints() {
  let newPoints = [];
  let numPoints = 6;
  let offset = (Math.PI * 2) / numPoints;
  for (let i = 0; i < numPoints; i++) {
    const angle = i * offset;
    newPoints.push({
      x: centerPoint.x + Math.cos(angle) * radius,
      y: centerPoint.y + Math.sin(angle) * radius,
    });
  }
  console.log(newPoints);
  return newPoints;
}

function generateSubPoints(points = []) {
  let newSubPoints = [];
  for (let i = 0; i < points.length; i++) {
    if (i === points.length - 1) {
      newSubPoints.push({
        x: (points[i].x + points[0].x) / 2,
        y: (points[i].y + points[0].y) / 2,
      });
    } else {
      newSubPoints.push({
        x: (points[i].x + points[i + 1].x) / 2,
        y: (points[i].y + points[i + 1].y) / 2,
      });
    }
  }
  console.log(newSubPoints);
  return newSubPoints;
}

function debugPoint(point, color = "red", radius = 10) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
}

function quadBez(sp, cp, ep, t) {
  var pFinal = {};
  pFinal.x = Math.pow(1 - t, 2) * sp.x + (1 - t) * 2 * t * cp.x + t * t * ep.x;
  pFinal.y = Math.pow(1 - t, 2) * sp.y + (1 - t) * 2 * t * cp.y + t * t * ep.y;
  return pFinal;
}
