function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('sketch-container');

  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(240)
  text('Make Something', width/2, height/2);
}