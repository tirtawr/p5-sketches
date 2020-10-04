const COLOR_PALLETE = {
  faceBackground: '#2D3142',
  background: '#BFC0C0',
  hourHand: '#FFFFFF',
  minuteHand: '#EF8354',
  secondHand: '#4F5D75'
}

const canvasWidth = 400
const canvasHeight = 400
const centerX = canvasWidth / 2
const centerY = canvasHeight / 2

const faceDiameter = 350

const decimalHoursPerDay = 100
const decimalMinutesPerDecimalHour = 10
const decimalSecondsPerDecimalMinute = 100
const decimalSecondsPerDay = decimalHoursPerDay * decimalMinutesPerDecimalHour * decimalSecondsPerDecimalMinute
const decimalSecondsPerDecimalHour = decimalMinutesPerDecimalHour * decimalSecondsPerDecimalMinute 


let digitalMono;

function preload() {
  digitalMono = loadFont('assets/digital-7-mono.ttf');
}

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('sketch-container');

  frameRate(30)

  textSize(32);
  textAlign(CENTER, CENTER);
  textFont(digitalMono);
}

function draw() {
  background(COLOR_PALLETE.background);

  const currentMillisecond = moment().millisecond()
  const currentSecond = moment().second()
  const currentMinute = moment().minute()
  const currentHour = moment().hour()
  const currentSecondOfDay = currentHour * 60 * 60 + currentMinute * 60 + currentSecond + (currentMillisecond / 1000)
  const currentDecimalSecondOfDay = currentSecondOfDay / 0.864

  const currentDecimalHour = getDecimalHour(currentDecimalSecondOfDay)
  const currentDecimalMinute = getDecimalMinute(currentDecimalSecondOfDay)
  const currentDecimalSecond = getDecimalSecond(currentDecimalSecondOfDay)
  
  const decimalHourAngle = map(currentDecimalHour, 0, decimalHoursPerDay, 0, TWO_PI) - HALF_PI
  const decimalMinuteAngle = map(currentDecimalMinute, 0, decimalMinutesPerDecimalHour, 0, TWO_PI) - HALF_PI
  const decimalSecondAngle = map(currentDecimalSecond, 0, decimalSecondsPerDecimalMinute, 0, TWO_PI) - HALF_PI


  // clock face background
  push()
  noStroke()
  fill(COLOR_PALLETE.faceBackground)
  circle(centerX, centerY, faceDiameter)
  pop()

  // hour hand
  push()
  translate(centerX, centerY)
  strokeWeight(12)
  rotate(decimalHourAngle)
  stroke(COLOR_PALLETE.hourHand)
  line(0, 0, 110, 0)
  pop()

  // minute hand
  push()
  translate(centerX, centerY)
  strokeWeight(12)
  rotate(decimalMinuteAngle)
  stroke(COLOR_PALLETE.minuteHand)
  line(0, 0, 135, 0)
  pop()

  // second hand
  push()
  translate(centerX, centerY)
  strokeWeight(12)
  rotate(decimalSecondAngle)
  stroke(COLOR_PALLETE.secondHand)
  line(0, 0, 160, 0)
  pop()

  // text
  push()
  noStroke()
  rectMode(CENTER);
  const borderRadius = 8
  fill(COLOR_PALLETE.background)
  rect(centerX, centerY, 120, 38, borderRadius, borderRadius, borderRadius, borderRadius)
  fill(COLOR_PALLETE.faceBackground)
  text(`${zeroPad(currentDecimalHour)}:${currentDecimalMinute}:${zeroPad(currentDecimalSecond)}`, centerX, centerY);
  pop()
}

function getDecimalHour(decimalSecondOfDay) {
  return Math.floor(decimalSecondOfDay / decimalSecondsPerDecimalHour)
}

function getDecimalMinute(decimalSecondOfDay) {
  const currentDecimalHour = getDecimalHour(decimalSecondOfDay)
  return Math.floor((decimalSecondOfDay - (currentDecimalHour * decimalSecondsPerDecimalHour)) / decimalSecondsPerDecimalMinute)
}

function getDecimalSecond(decimalSecondOfDay) {
  const currentDecimalHour = getDecimalHour(decimalSecondOfDay)
  const currentDecimalMinute = getDecimalMinute(decimalSecondOfDay)
  return Math.floor(decimalSecondOfDay - ((currentDecimalHour * decimalSecondsPerDecimalHour) + (currentDecimalMinute * decimalSecondsPerDecimalMinute)))
}

function zeroPad(n) {
  if (n < 10) return `0${n}`
  return `${n}`
}

function doubleZeroPad(n) {
  if (n < 100) {
    if (n < 10) {
      return `00${n}`
    } else {
      return `0${n}`
    }
  }
  return `${n}`
}