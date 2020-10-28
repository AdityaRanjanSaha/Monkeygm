
var monkey ,monkey_collided, monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var banana, bananaGroup;
var obstacle,obstacleGroup;
var score;
var ground,groundImage;
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided=loadAnimation("sprite_5.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
 monkey=createSprite(80,315,10,10); 
 monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.1;
  
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}
score=0;
survivalTime=0;


function draw() {
  background("white");
  
  fill("black");
  text("score:"+score,100,50);
  
  fill("blue");
  text("survivalTime:"+survivalTime,180,50);
  survivalTime=Math.round(frameRate());
  
    if(keyWentDown('space')){
      monkey.velocityY=-12;
    }
    monkey.velocityY=monkey.velocityY+0.8;
    monkey.collide(ground);
    
    if (monkey.isTouching(bananaGroup)){
      score=score+1;
      bananaGroup.destroyEach();
    }
    if(monkey.isTouching(obstacleGroup)){
      monkey.changeAnimation("collided",monkey_collided);
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      monkey.velocityY=0;
      score=0;
      bananaGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
    }
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
  bananas();
  obstacles();
  
  
  
  drawSprites();
}
 function obstacles(){
   if (frameCount%300==0){
  obstacle=createSprite(550,326,10,10);
  obstacle.addImage(obstaceImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-5;
  obstacle.x=obstacle.width/1;
  obstacle.lifetime=300;
  obstacleGroup.add(obstacle);
   
   }
}
function bananas(){
  if(frameCount%80==0){
    banana=createSprite(550,150,10,10);
    banana.y=Math.round(random(120,180));
  banana.addImage(bananaImage);
  banana.scale=0.07;
  banana.velocityX=-5;
  banana.lifetime=300;
  bananaGroup.add(banana);
}}





