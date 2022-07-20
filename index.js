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
const radius = 100;
let numPoints = 8;
let cpOff = 100;
let squishX = 1;
let squishY = 1;
const points = generatePoints();
const controlPoints = generateControlPoints();

// for (point of points) {
//   debugPoint(point, "green");
// }

// for (point of controlPoints) {
//   debugPoint(point, "yellow");
// }

// debugPoint(points[0]);
// debugPoint(controlPoints[0]);

// context.moveTo(points[0].x, points[0].y);
// context.quadraticCurveTo(
//   controlPoints[0].x,
//   controlPoints[0].y,
//   points[1].x,
//   points[1].y
// );
// context.stroke();
context.fillStyle = "purple";
context.beginPath();
let cpIndex = 0;
for (let i = 0; i < controlPoints.length; i++) {
  let toIndex = i == controlPoints.length - 1 ? 0 : i + 1;
  context.moveTo(points[i].x, points[i].y);
  context.quadraticCurveTo(
    controlPoints[i].x,
    controlPoints[i].y,
    points[toIndex].x,
    points[toIndex].y
  );
  context.lineTo(centerPoint.x, centerPoint.y);

  // context.stroke();
}
context.closePath();
context.fill();

function generatePoints() {
  let newPoints = [];
  let offset = (Math.PI * 2) / numPoints;
  for (let i = 0; i < numPoints; i++) {
    const angle = i * offset;
    newPoints.push({
      x: centerPoint.x + Math.cos(angle) * radius * squishX,
      y: centerPoint.y + Math.sin(angle) * radius * squishY,
    });
  }
  console.log(newPoints);
  return newPoints;
}
function generateControlPoints() {
  let newPoints = [];
  let offset = (Math.PI * 2) / numPoints;
  for (let i = 1; i < numPoints * 2; i += 2) {
    let ran = getRandomArbitrary(1, 2);
    const angle = i * offset;
    newPoints.push({
      x: centerPoint.x + Math.cos(angle / 2) * (radius + cpOff) * ran * squishX,
      y: centerPoint.y + Math.sin(angle / 2) * (radius + cpOff) * ran * squishY,
    });
  }
  console.log(newPoints);
  return newPoints;
}

function debugPoint(point, color = "red", radius = 10) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
}

// function getRandomPos(max) {
//   let ran = Math.abs(Math.random() * max);
//   console.log(ran);
//   return ran;
// }

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function quadBez(sp, cp, ep, t) {
  var pFinal = {};
  pFinal.x = Math.pow(1 - t, 2) * sp.x + (1 - t) * 2 * t * cp.x + t * t * ep.x;
  pFinal.y = Math.pow(1 - t, 2) * sp.y + (1 - t) * 2 * t * cp.y + t * t * ep.y;
  return pFinal;
}
