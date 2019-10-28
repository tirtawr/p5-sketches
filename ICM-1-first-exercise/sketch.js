// Prompt:
// Take this image:
// Make every other pixel green.
// Erase a line that is 10 pixels tall across the middle of it.
// Turn a line that is 10 pixels wide down the middle of it blue.

let img;

function preload() {
  img = loadImage('cat.jpg');
}

function setup() {
  pixelDensity(1);
  createCanvas(480, 270);
  image(img, 0, 0);

  loadPixels();

  //Turn every other pixel green
  for (let i = 0; i < pixels.length; i += 8) {
    pixels[i] = 0;
    pixels[i + 1] = 255;
    pixels[i + 2] = 0;
    pixels[i + 3] = 255;
  }

  //Erase a line that is 10 pixels tall across the middle of it.
  for (let x = img.width / 2 - 5; x < img.width / 2 + 5; x++) {
    for (let y = 0; y < img.height; y++) {
      const i = 4 * ((img.width * y) + x);
      pixels[i + 3] = 0;
    }
  }

  //Erase a line that is 10 pixels tall across the middle of it.
  for (let x = 0; x < img.width; x++) {
    for (let y = img.height / 2 - 5; y < img.height / 2 + 5; y++) {
      const i = 4 * ((img.width * y) + x);
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 255;
      pixels[i + 3] = 255;
    }
  }


  updatePixels();

}