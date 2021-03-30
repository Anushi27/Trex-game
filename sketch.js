var trex,trexRun,ground,groundAnimation,invisibleGround,cactus,obstacle1,cactus1,cactus2,cactu3,cactus4,cactus5,cactus6,cloud,cloundAnimation,gameState,collided,score,checkpoint,die,jump,restartAni,gameOverAni,gameOver,restart

  const PLAY=1
   const END=0
   
function preload(){
  trexRun=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundAnimation=loadImage("ground2.png")
  cactus1=loadImage("obstacle1.png")
  cactus2=loadImage("obstacle2.png")
  cactus3=loadImage("obstacle3.png")
  cactus4=loadImage("obstacle4.png")
  cactus5=loadImage("obstacle5.png")
  cactus6=loadImage("obstacle6.png")
  cloudAnimation=loadImage("cloud.png")
  collided=loadImage("trex_collided.png")
  checkpoint=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  restartAni=loadImage("restart.png")
  gameOverAni=loadImage("gameOver.png")
  
}

function setup() {
  createCanvas(600,200)
  
   gameState=PLAY

  
  trex=createSprite(40,150,20,20)
  trex.addAnimation("trex",trexRun)
  trex.scale=0.5
  
  ground=createSprite(300,160,600,20)
  ground.addImage("ground",groundAnimation)
  
  invisibleGround=createSprite(300,170,600,10)
  invisibleGround.visible=false
  
  cloudGroup=new Group()
  obstacleGroup=new Group()
   
  trex.addImage("collided",collided)
  
  score=0
  
  gameOver=createSprite(300,100)
    gameOver.addImage("gameOver",gameOverAni)
    gameOver.scale=0.5
  gameOver.visible=false
  
  
  restart=createSprite(300,125)
   restart.addImage("restart",restartAni)
    restart.scale=0.5
  restart.visible=false
  
}

function draw() {
  
  background(220);
  
  if(gameState===PLAY){
    ground.velocityX = -(6 + 3*score/100);
  
  if(ground.x<0){
    ground.x=ground.width/2
  }
  trex.collide(invisibleGround)
  
  if(keyDown("space")&&trex.y>140){
    trex.velocityY=-12
    jump.play()
  }
    
    if(score%100===0&&score>0){
      checkpoint.play()
    }
  
  trex.velocityY=trex.velocityY+0.8
   
    if(frameCount%20===0){
    score=score+1
  }
  
  spawnObstacles()
  spawnClouds()
  
  if(obstacleGroup.isTouching(trex)){
    gameState=END
    die.play()
    
    
  }
}

  if(gameState===END){
    obstacleGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    
    cloudGroup.setVelocityXEach(0)
    cloudGroup.setLifetimeEach(-1)
    
    trex.velocityY=0
    
    ground.velocityX=0
    
    trex.changeImage("collided")
    
    gameOver.visible=true
    restart.visible=true
  }
  
  if(mousePressedOver(restart)){
    gameState=PLAY
    
    obstacleGroup.destroyEach()
    cloudGroup.destroyEach()
    trex.changeAnimation("trex")
    
    gameOver.visible=false
     restart.visible=false
    
    score=0
    
  }
  text("SCORE: "+score,530,20)

  drawSprites()
}


function spawnObstacles(){
  if(World.frameCount%80===0){
  cactus=createSprite(590,150,20,20)
    
   cactus.velocityX = - (6 + 3*score/100);
   
    var ran=Math.round(random(1,6))
   // console.log(ran)
/*if(ran===1) {
  cactus.addImage("cactus1",cactus1)
  cactus.scale=0.5
}
    else if(ran===2) {
  cactus.addImage("cactus2",cactus2)
   cactus.scale=0.5
}
    else if(ran===3) {
  cactus.addImage("cactus3",cactus3)
   cactus.scale=0.5
}
    else if(ran===4) {
  cactus.addImage("cactus4",cactus4)
   cactus.scale=0.5
}
    else if(ran===5) {
  cactus.addImage("cactus5",cactus5)
   cactus.scale=0.5
}
    else if(ran===6) {
  cactus.addImage("cactus6",cactus6)
   cactus.scale=0.5
}*/
    
    switch(ran){
      case 1:cactus.addImage("cactus1",cactus1)
             cactus.scale=0.5
      break;
      case 2:cactus.addImage("cactus2",cactus2)
             cactus.scale=0.5
      break;
      case 3:cactus.addImage("cactus3",cactus3)
             cactus.scale=0.5
      break;
      case 4:cactus.addImage("cactus4",cactus4)
             cactus.scale=0.5
      break;
      case 5:cactus.addImage("cactus5",cactus5)
             cactus.scale=0.5
      break;
      case 6:cactus.addImage("cactus6",cactus6)
             cactus.scale=0.5
      break;
      default:console.log("default is the else part not used in code")
      break;  
    }
      
cactus.lifetime=100
    obstacleGroup.add(cactus)
}
}

function spawnClouds(){
  if(World.frameCount%80===0){
    cloud=createSprite(390,90,20,20)
    cloud.velocityX=-4
    cloud.addImage("cloud",cloudAnimation)
    cloud.lifetime=150
    
     cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudGroup.add(cloud)
  }
}