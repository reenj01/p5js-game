let video, handPose;
let hands = [];

function preload(){
  handPose = ml5.handPose({flipped: true});
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO, {flipped: true});
  video.size(600,600);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(220);
  
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    let index = hand.keypoints[4];
    let thumb = hand.keypoints[8];

    fill(255, 0, 0);
    noStroke();
    circle(thumb.x, thumb.y, 15);
    circle(index.x, index.y, 15);
  }
}

function gotHands(results){
  hands = results;
}