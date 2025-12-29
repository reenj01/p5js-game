let video, handPose;
let hands = [];

function preload(){
  handPose = ml5.handPose({flipped: true});
}

function setup() {
  createCanvas(600, 600);
  video = createCapture(VIDEO);
  video.size(600,600);
  video.hide();
}

function draw() {
  background(220);
  //image(capture, 0, 0, 600, 600);
}