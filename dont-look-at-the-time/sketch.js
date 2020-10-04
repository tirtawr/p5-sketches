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

let digitalMono;

let currentSecond = moment().second()
let currentMinute = moment().minute()
let currentHour = moment().hour()

const faceDetectionOptions = {
  withLandmarks: true,
  withDescriptors: false,
}
let faceapi
let video
let detections
let faceHeight = 50

function preload() {
  digitalMono = loadFont('assets/digital-7-mono.ttf');
}

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('sketch-container');
  noLoop()

  // setup face detection
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  faceapi = ml5.faceApi(video, faceDetectionOptions, onFaceDetectionReady)


  // setup for text
  textSize(32);
  textAlign(CENTER, CENTER);
  textFont(digitalMono);

  // start the clock
  startClock()
}

function draw() {
  background(COLOR_PALLETE.background);

  // draw clock face background
  noStroke()
  fill(COLOR_PALLETE.primary)
  circle(centerX, centerY, faceDiameter)

  const secondAngle = map(currentSecond, 0, 60, 0, TWO_PI) - HALF_PI
  const minuteAngle = map(currentMinute, 0, 60, 0, TWO_PI) - HALF_PI
  const hourAngle = map(currentHour, 0, 24, 0, TWO_PI) - HALF_PI

  // draw arcs
  angleMode(RADIANS)
  strokeWeight(arcStrokeWeight)
  stroke(COLOR_PALLETE.secondary)
  arc(centerX, centerY, secondDiameter, secondDiameter, -HALF_PI, secondAngle)
  stroke(COLOR_PALLETE.primary_highlight)
  arc(centerX, centerY, minuteDiameter, minuteDiameter, -HALF_PI, minuteAngle)
  stroke(COLOR_PALLETE.secondary_highlight)
  arc(centerX, centerY, hourDiameter, hourDiameter, -HALF_PI, hourAngle)

  // draw text
  noStroke()
  fill(COLOR_PALLETE.background)
  text(`${zeroPad(currentHour)}:${zeroPad(currentMinute)}:${zeroPad(currentSecond)}`, centerX, centerY);
}

function onFaceDetectionReady() {
  console.log('face detection ready')
  faceapi.detect(onDetectionResult)
}

function onDetectionResult(_err, result) {
  if (result) {
    if (result.length > 0) {
      // TODO: get max height of all detected faces, right now just use the first face found
      const detection = result[0]
      faceHeight = detection.alignedRect._box._height
      console.log('faceHeight', faceHeight)
    }

  }
  faceapi.detect(onDetectionResult)
}

function startClock() {
  tick()
}

function tick() {
  currentSecond++
  if (currentSecond > 59) {
    currentMinute++
    currentSecond = 0
  }
  if (currentMinute > 59) {
    currentHour++
    currentMinute = 0
  }
  if(currentHour > 23) {
    currentHour = 0
  }

  redraw()

  millisecondsToNextTick = map(faceHeight, 0, canvasHeight, 1000, 1)
  setTimeout(tick, millisecondsToNextTick)
}

function zeroPad(n) {
  if (n < 10) return `0${n}`
  return `${n}`
}

function toTweleveHourFormat(h) {
  if (h > 12) return h - 12
  return h
}