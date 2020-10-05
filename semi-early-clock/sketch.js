const COLOR_PALLETE = {
  faceBackground: '#0D3B66',
  background: '#FAF0CA',
  hourHand: '#F95738',
  minuteHand: '#EE964B',
  secondHand: '#F4D35E'
}

const canvasWidth = 400
const canvasHeight = 400
const centerX = canvasWidth / 2
const centerY = canvasHeight / 2

const faceDiameter = 350

const hoursPerDay = 24
const minutesPerHour = 60
const secondsPerMinute = 60
const secondsPerDay = hoursPerDay * minutesPerHour * secondsPerMinute
const secondsPerHour = minutesPerHour * secondsPerMinute 

let currentHour
let currentMinute
let currentSecond
let lastCurrentRealMinute

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

  const currentRealSecond = moment().second()
  const currentRealMinute = moment().minute()
  const currentRealHour = moment().hour()
  const currentSecondOfDay = currentRealHour * 60 * 60 + currentRealMinute * 60 + currentRealSecond

  currentHourInTweleveHourFormat = getHourInTweleveHourFormat(currentSecondOfDay)
  currentHour = getHour(currentSecondOfDay)
  if (currentRealMinute != lastCurrentRealMinute) {
    currentMinute = Math.floor(getMinute(currentSecondOfDay) + random(-10, 10))
  }
  currentSecond = getSecond(currentSecondOfDay)
  lastCurrentRealMinute = currentRealMinute
  
  const hourAngle = map(currentHourInTweleveHourFormat, 0, hoursPerDay / 2, 0, TWO_PI) - HALF_PI
  const minuteAngle = map(currentMinute, 0, minutesPerHour, 0, TWO_PI) - HALF_PI
  const secondAngle = map(currentSecond, 0, secondsPerMinute, 0, TWO_PI) - HALF_PI


  // clock face background
  push()
  noStroke()
  fill(COLOR_PALLETE.faceBackground)
  circle(centerX, centerY, faceDiameter)
  pop()

  // second hand
  push()
  translate(centerX, centerY)
  strokeWeight(12)
  rotate(secondAngle)
  stroke(COLOR_PALLETE.secondHand)
  line(0, 0, 160, 0)
  pop()

  // minute hand
  push()
  translate(centerX, centerY)
  strokeWeight(12)
  rotate(minuteAngle)
  stroke(COLOR_PALLETE.minuteHand)
  line(0, 0, 135, 0)
  pop()

  // hour hand
  push()
  translate(centerX, centerY)
  strokeWeight(12)
  rotate(hourAngle)
  stroke(COLOR_PALLETE.hourHand)
  line(0, 0, 110, 0)
  pop()

  // text
  push()
  noStroke()
  rectMode(CENTER);
  const borderRadius = 8
  fill(COLOR_PALLETE.background)
  rect(centerX, centerY, 135, 38, borderRadius, borderRadius, borderRadius, borderRadius)
  fill(COLOR_PALLETE.faceBackground)
  text(`${zeroPad(currentHour)}:${zeroPad(currentMinute)}:${zeroPad(currentSecond)}`, centerX - 4, centerY);
  pop()
}

function getHour(secondOfDay) {
  return Math.floor(secondOfDay / secondsPerHour)
}

function getHourInTweleveHourFormat(secondOfDay) {
  return toTweleveHourFormat(getHour(secondOfDay))
}

function getMinute(secondOfDay) {
  const currentHour = getHour(secondOfDay)
  return Math.floor((secondOfDay - (currentHour * secondsPerHour)) / secondsPerMinute)
}

function getSecond(secondOfDay) {
  const currentHour = getHour(secondOfDay)
  const currentMinute = getMinute(secondOfDay)
  return Math.floor(secondOfDay - ((currentHour * secondsPerHour) + (currentMinute * secondsPerMinute)))
}

function zeroPad(n) {
  if (n < 10) return `0${n}`
  return `${n}`
}

function toTweleveHourFormat(h) {
  if (h > 12) return h - 12
  return h
}
