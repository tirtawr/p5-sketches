let capture;
const scale = 25;

function setup() {
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(30, 30);
  capture.hide();
  createCanvas(capture.width * scale, capture.height * scale);
}

function draw() {
  background(255);
  capture.loadPixels();
  for (let x = 0; x <= capture.width; x++) {
    for (let y = 0; y <= capture.height; y++) {
      const i = 4 * ((capture.width - x - 1) + (y * capture.width))
      const red = capture.pixels[i];
      const green = capture.pixels[i + 1];
      const blue = capture.pixels[i + 2];
      const brightness = (red + green + blue) / 2;
      const mappedBrightness = map(brightness, 0, 255, 0, scale, true);
      image(capture, x * scale, y * scale, mappedBrightness, mappedBrightness)
    }
  }
}