// Prompt:
// Make a pixelated 2-tone mirror with createCapture(VIDEO)and 20x20 pixels.
// Pixels that are > 50% bright are white.
// Pixels that are < 50% bright are black.
let capture;
const scale = 24;

function setup() {
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(20, 20);
  capture.hide();
  createCanvas(capture.width * scale, capture.height * scale);
}

function draw() {
  background(0);
  capture.loadPixels();
  for (let x = 0; x <= capture.width; x++) {
    for (let y = 0; y <= capture.height; y++) {
      const i = 4 * ((capture.width - x + 1) + (y * capture.width))
      const red = capture.pixels[i];
      const green = capture.pixels[i + 1];
      const blue = capture.pixels[i + 2];
      const brightness = (red + green + blue) / 2;
      if (brightness > 127) {
        noStroke();
        fill(255);
        rectMode(CENTER);
        rect(x * scale, y * scale, scale, scale);
      }
    }
  }
}

