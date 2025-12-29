let capture;

function setup() {
  createCanvas(600, 600);
  capture = createCapture(VIDEO);
  capture.size(600,600);
  capture.hide();
}

function draw() {
  background(220);
  image(capture, 0, 0, 600, 600);
}