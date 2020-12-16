
var monkey , monkey_running;
var bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime=0;
var ground;


var gameState="play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  monkey=createSprite(50,250,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(300,270,1200,10);
  
  bananaGroup=createGroup();
  obstaclesGroup=createGroup();
}


function draw() {
background(255);

  text("Survival Time:"+survivalTime,500,20);

  if(gameState==="play"){
  
  ground.velocityX=-3;
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")&&monkey.y>=230){
    monkey.velocityY=-15;
  }
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
  }

    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
     spawnBanana();
 spawnObstacles(); 
 
    
    
  }
  monkey.velocityY = monkey.velocityY + 0.8
  
  
  if(gameState=="end"){
    ground.velocityX=0;
    monkey.velocityY=0;
    
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    

  }
  
  if(monkey.isTouching(obstaclesGroup)){
    gameState="end";
  }
 
   
  monkey.collide(ground);

  
  
  drawSprites();
}
function spawnBanana(){
 if(frameCount%60===0){  
var  banana=createSprite(width,random(101,180),50,50);
  banana.addImage(bananaImage);
  banana.scale=0.08;
  banana.velocityX=-3;
  banana.lifetime=200;
   bananaGroup.add(banana);
 }
}
function spawnObstacles(){
  if(frameCount%100===0){
    var obstacle=createSprite(width,245,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-3;
    obstacle.lifetime=200;
    obstacle.scale=0.11;
    obstaclesGroup.add(obstacle);
  }
}





