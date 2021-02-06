var balloon;
var database;
var position;
function preload(){
  backgroundImage=loadImage("background1.png");
  balloonAnimation=loadAnimation("balloon3.png","balloon1.png","balloon2.png")
}
function setup() {
  createCanvas(1440,700);
  database = firebase.database();
  balloon = createSprite(400, 500, 50, 50);
  balloon.addAnimation("balloonanime",balloonAnimation);
  balloon.scale=0.6

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);
}

function draw() {
  background(backgroundImage);  
  textSize(20);
  textWidth(7)
  text("Use Arrow Keys To Move The Balloon",50,50);
  if(position !== undefined){
  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x -10;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x +10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y=balloon.y -10;
    balloon.scale=balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y +10;
    balloon.scale=balloon.scale+0.01;
  }
  
  
  drawSprites();
  }
}
function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
