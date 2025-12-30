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

  resetLines();
}

function resetLines() {
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;
  let spacing = 100;

  horizY1 = centerY - spacing / 2;
  horizY2 = centerY + spacing / 2;
  vertX1 = centerX - spacing / 2;
  vertX2 = centerX + spacing / 2;
}

function draw() {
  background(255);

  // the 2 horiz and 2 vertic lines at beginning
  strokeWeight(1);

  // draw the 4 lines
  stroke(0, 0, 0, 50);
  drawingContext.setLineDash([15, 25]);
  line(0, horizY1, windowWidth, horizY1);
  line(0, horizY2, windowWidth, horizY2);

  line(vertX1, 0, vertX1, windowHeight);
  line(vertX2, 0, vertX2, windowHeight);

  noStroke();
  drawingContext.setLineDash([])

  // detect which hands
  let leftHand = null;
  let rightHand = null;

  for (let hand of hands) {
    if (hand.handedness === "Left"){
      leftHand = hand;
    } else if (hand.handedness === "Right"){
      rightHand = hand;
    }
  }

  // LEFT HAND
  if (leftHand) {
    let Lindex = leftHand.keypoints[4];
    let Lthumb = leftHand.keypoints[8];

    fill(255, 0, 0);
    circle(Lthumb.x, Lthumb.y, 15);
    circle(Lindex.x, Lindex.y, 15);

    stroke(255, 0, 0, 150);
    strokeWeight(2);
    line(Lthumb.x, Lthumb.y, Lindex.x, Lindex.y);
    noStroke();

    let pinchDist = dist(Lthumb.x, Lthumb.y, Lindex.x, Lindex.y);
    let midY = (Lthumb.y + Lindex.y) / 2;

    let spacing = map(pinchDist, 20, 200, 40, 400, true);
    horizY1 = midY - spacing / 2;
    horizY2 = midY + spacing / 2;
  }

  // RIGHT HAND
  if (rightHand) {
    let Rindex = rightHand.keypoints[4];
    let Rthumb = rightHand.keypoints[8];

    fill(0, 0, 255);
    circle(Rthumb.x, Rthumb.y, 15);
    circle(Rindex.x, Rindex.y, 15);

    stroke(0, 0, 255, 150);
    strokeWeight(2);
    line(Rthumb.x, Rthumb.y, Rindex.x, Rindex.y);
    noStroke();

    let pinchDist = dist(Rthumb.x, Rthumb.y, Rindex.x, Rindex.y);
    let midX = (Rthumb.y + Rindex.y) / 2;

    let spacing = map(pinchDist, 20, 200, 40, 400, true);
    vertX1 = midX - spacing / 2;
    vertX2 = midX + spacing / 2;
  }
}

function gotHands(results){
  hands = results;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetLines();
}