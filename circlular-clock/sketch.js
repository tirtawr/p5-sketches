const COLOR_PALLETE = {
  background: '#F7FFF7', // mint cream
  primary: '#1A535C', // midnight green
  secondary: '#4ECDC4', // medium turqoise
  primary_highlight: '#FF6B6B', // bittersweet red 
  secondary_highlight: 'FFE66D' // naples yellow
}



const canvasWidth = 400
const canvasHeight = 400
const centerX = canvasWidth / 2
const centerY = canvasHeight / 2

const faceDiameter = 350
const arcStrokeWeight = 24
const arcPadding = 12
const secondDiameter = faceDiameter - (arcStrokeWeight + arcPadding)
const minuteDiameter = secondDiameter - ((arcStrokeWeight * 2) + arcPadding)
const hourDiameter = minuteDiameter - ((arcStrokeWeight * 2) + arcPadding)

console.log('secondDiameter', secondDiameter)
console.log('minuteDiameter', minuteDiameter)
console.log('hourDiameter', hourDiameter)


let digitalMono;
function preload() {
  digitalMono = loadFont('assets/digital-7-mono.ttf');
}

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('sketch-container');

  frameRate(1)

  textSize(32);
  textAlign(CENTER, CENTER);
  textFont(digitalMono);
}

function draw() {
  background(COLOR_PALLETE.background);

  // clock face background
  noStroke()
  fill(COLOR_PALLETE.primary)
  circle(centerX, centerY, faceDiameter)
  
  const second = moment().second()
  const minute = moment().minute()
  const hour = toTweleveHourFormat(moment().hour())

  console.log('second', second)
  console.log('minute', minute)
  console.log('hour', hour)

  const secondAngle = map(second, 0, 60, 0, TWO_PI) - HALF_PI
  const minuteAngle = map(minute, 0, 60, 0, TWO_PI) - HALF_PI
  const hourAngle = map(hour, 0, 12, 0, TWO_PI) - HALF_PI

  // arcs
  angleMode(RADIANS)
  strokeWeight(arcStrokeWeight)
  stroke(COLOR_PALLETE.secondary)
  arc(centerX, centerY, secondDiameter, secondDiameter, -HALF_PI, secondAngle)
  stroke(COLOR_PALLETE.primary_highlight)
  arc(centerX, centerY, minuteDiameter, minuteDiameter, -HALF_PI, minuteAngle)
  stroke(COLOR_PALLETE.secondary_highlight)
  arc(centerX, centerY, hourDiameter, hourDiameter, -HALF_PI, hourAngle)

  // text
  noStroke()
  fill(COLOR_PALLETE.background)
  text(moment().format('LTS'), centerX, centerY);
}

function toTweleveHourFormat(h) {
  if (h > 12) return h - 12
  return h
}