var monkey,monkeyAnimation;
var scene,sceneImage;
var invisibleGround;
var score,chance;
var BananaGroup;
var bananaImage;
var ObstaclesGroup;
var obstacleImage;
var gameState;
function preload(){
  sceneImage=loadImage("jungle.jpg");
  
  monkeyAnimation=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_01.png");
  
bananaImage=loadImage("banana.png");
  
obstacleImage=loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  scene=createSprite(500,200,400,400);
  scene.addImage("My Jungle",sceneImage);
  
  scene.velocityX=-6;
  
  monkey=createSprite(100,300,20,20);
  monkey.addAnimation("My Monkey",monkeyAnimation);
  monkey.scale=0.1;
  
  invisibleGround=createSprite(200,360,400,1);
  invisibleGround.visible=false;
  
  score=0;
 
  chance=0;
  
  BananaGroup=new Group();
  
  ObstaclesGroup=new Group();
  
  gameState="play";
}

function draw() {
  background(0);
  monkey.velocityY=monkey.velocityY + 0.5;
  monkey.collide(invisibleGround);
  
  if(scene.x<0){
    scene.x=scene.width/2;
  }
  
  if(keyDown("space") && monkey.y>=328){
    monkey.velocityY=-10;
  }
  if(monkey.isTouching(BananaGroup)){
    BananaGroup.destroyEach();
    score=score + 2;
  }
    
  if(gameState==="play"){
    if(monkey.scale===0.15){
     if(keyDown("space") && monkey.y>=314){
      monkey.velocityY=-10;
    }
  }
  if(monkey.scale===0.2){
    if(keyDown("space") && monkey.y>=298){
      monkey.velocityY=-10.4;
      
    }
  }
     if(monkey.scale===0.25){
        if(keyDown("space") && monkey.y>=282){
      monkey.velocityY=-10.8;
      
    }
     }
  if(monkey.scale===0.3){
    if(keyDown("space") && monkey.y>=268){
      monkey.velocityY=-11;
      
    }
  }
    monkey.visible=true;
    scene.visible=true;
    BananaGroup.setVisibleEach(true);
    ObstaclesGroup.setVisibleEach(true);
    switch(score){
    case 10 : monkey.scale=0.15;
    
    break;
    case 20 : monkey.scale=0.2;
    
      break;
    
    case 30 : monkey.scale=0.25;
   
      break;
    case 40 : monkey.scale=0.3;
    
      BananaGroup.y=Math.round(random(80,120));
      break;
 }
  }
  if(gameState==="end"){
    BananaGroup.destroyEach();
    ObstaclesGroup.destroyEach();
    monkey.visible=false;
    BananaGroup.setVisibleEach(false);
    ObstaclesGroup.setVisibleEach(false);
    scene.visible=false;
    textSize(25);
    textFont("algerian");
    fill("white");
    text("You Lose",150,200);
    text("Press Enter To Restart ",50,300);
    text("The Game",150,340);
    if(keyDown("enter")){
      reset();
      gameState="play";
    }
  }
  
  if(monkey.isTouching(ObstaclesGroup)){
    monkey.scale=0.1;
    chance=chance + 1;
    ObstaclesGroup.destroyEach();
   if(chance===1){
    score=0;
  }
  }
  
  if(chance===2){
    gameState="end";
  }
  if(score>=50){
    gameState="serve";
  }
  if(gameState==="serve"){
    scene.visible=false;
    monkey.visible=false;
    ObstaclesGroup.destroyEach();
    BananaGroup.destroyEach();
    ObstaclesGroup.setVisibleEach(false);
    BananaGroup.setVisibleEach(false);
     textSize(25);
    textFont("algerian");
    fill("white");
    text("You Won",150,200);
    text("Press Enter To Restart ",50,300);
    text("The Game",150,340);
    if(keyDown("enter")){
      reset();
      gameState="play";
    }
  }
  spawnBanana();
  
  spawnObstacles();
  
  drawSprites();
  textSize(20);
  textFont("algerian");
  fill("white");
  text("Score: " + score,150,50);
}
function spawnBanana(){
 if(frameCount%80===0){
  var banana;
  banana=createSprite(480,200,20,20);
  banana.addImage("My Banana",bananaImage);
   banana.scale=0.1;
  banana.velocityX=-6;
  banana.lifeTime=100;
  BananaGroup.add(banana);

  banana.setCollider("rectangle",0,0,400,400);
  if(monkey.scale===0.1){
    banana.scale=0.06
    banana.y=Math.round(random(200,220));
  } 
   
  if(monkey.scale===0.15){
    banana.scale=0.08;
    banana.y=Math.round(random(190,200));
  }
   
  if(monkey.scale===0.2){
    banana.scale=0.1;
    BananaGroup.y=Math.round(random(180,200));
  }
  
  if(monkey.scale===0.25){
    banana.scale=0.12;
    banana.y=Math.round(random(170,190));
  }
  if(monkey.scale===0.3){
    banana.scale=0.14;
    banana.y=Math.round(random(160,190));
  }
  }
}

function spawnObstacles(){
  var stone;
 if(frameCount%300===0){
  stone=createSprite(480,350,40,40);
  stone.addImage("My Stone",obstacleImage);
  stone.scale=0.1;
   stone.setCollider("circle",0,0,150);
   stone.velocityX=-6;
   ObstaclesGroup.add(stone);
   if(monkey.scale===0.1){
    stone.scale=0.1
  } 
   
  if(monkey.scale===0.15){
    stone.scale=0.14;
  }
   
  if(monkey.scale===0.2){
    stone.scale=0.16;
  }
  
  if(monkey.scale===0.25){
    stone.scale=0.18;
    
  }
  if(monkey.scale===0.3){
    stone.scale=0.2;
  }
}
}

function reset(){
  score=0;
  monkey.visible=true;
  scene.visible=true;
  ObstaclesGroup.setVisibleEach(true);
  BananaGroup.setVisibleEach(true);
  gameState="play";
  chance=0;
  monkey.scale=0.1;
}