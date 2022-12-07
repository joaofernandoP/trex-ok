
var trex ,trex_running, trex_collided
var ground;
var invisibleGround
var groundImage
var cloud, cloud_png
var obstacle1
var obstacle2
var obstacle3
var obstacle4
var obstacle5
var obstacle6
var score = 0
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cloudsGroup
var obstaclesGroup
var gameOverImg,restartImg
var restartImg
var restart, gameOver



//Carregar imagens
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png")
  cloud_img = loadImage("cloud.png")
  //carregar as imagens do function preload
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
trex_collided = loadAnimation("trex_collided.png")


}

function setup(){
  createCanvas(600,200)


gameOver = createSprite (300,70)
gameOver.addImage(gameOverImg)
gameOver.scale = 0.5

restart = createSprite (300,140);
restart.addImage(restartImg)
restart.scale = 0.5

// criar grupos de obstáculos e nuvens

obstaclesGroup= createGroup()
cloudsGroup= createGroup()

  //crie um sprite de trex
 trex=createSprite(50,160,20,50)
 //raio de colisão trex
trex.setCollider("circle",0, 0, 40);
trex.debug = true

 trex.addAnimation("running",trex_running);
 trex.scale=0.5
 trex.x=50
trex.addAnimation("collided" ,trex_collided);

ground=createSprite(200,180,400,20)
ground.addImage("ground",groundImage)
}
//Desenhar na tela
function draw(){
  background("white")
  
  //exibir pontuação
text("pontuação:" +  score, 500, 30)

//Impedir que o trex caia
trex.collide(ground);


//Adicionando Gravidade
trex.velocityY=trex.velocityY +0.7

if(gameState===PLAY){
   
  //criar nuvens
spawnClouds();
//criar obstáculos
spawnObstacles()

  gameOver.visible = false
  restart.visible = false
 
  //pontuação
score = score + Math.round(getFrameRate()/60)
 
//Movimento do chão
 ground.velocityX = - (2 + 3* score/100)


 //Plataforma infinita
 if(ground.x<0)
 ground.x=ground.width/2
 
 //trex pular com espaço
 if(keyDown("space")&& trex.y>80){
  trex.velocityY=-10;
}

if(obstaclesGroup.isTouching(trex)){

  gameState = END;

}
}

else if (gameState=== END){
 //mudar a animação do trex
 trex.changeAnimation("collided", trex_collided);
 
trex.velocityY = 0

  gameOver.visible = true
  restart.visible = true

  ground.velocityX = 0

obstaclesGroup.setVelocityXEach (0);
cloudsGroup.setVelocityXEach(0);

if(mousePressedOver(restart)) {
       reset()
}
}
 drawSprites()
}
// criar nuvens
function spawnClouds(){
  

  if(frameCount %  60 == 0){

  cloud = createSprite(600,100,40,10);
  cloud.velocityX = -3;
  cloud.addImage(cloud_img);
  cloud.scale = 0.4;
  cloud.y = Math.round(random(10,100))
  // Define a profundidade dos sprites
    
  cloud.depth = trex.depth;
    trex.depth = trex.depth + 1

     //tempo de vida nuvens
     cloud.lifeTime = 200
     
     cloudsGroup.add(cloud);

     

}
     
}

//Criar a função de obstáculos
 
function spawnObstacles(){
 
  if (frameCount % 60 === 0){
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = - (2 + 3* score/100)
    
   
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
              case 1: obstacle.addImage(obstacle1);
              break;
              case 2: obstacle.addImage(obstacle2);
              break;
              case 3: obstacle.addImage(obstacle3);
              break;
              case 4: obstacle.addImage(obstacle4);
              break;
              case 5: obstacle.addImage(obstacle5);
              break;
              case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    obstacle.lifeTime = 200

// adicione um obstáculo ao grupo

obstaclesGroup.add(obstacle);
}
}
function reset (){

gameState = PLAY;

gameOver.visible = false
restart.visible = false

obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();

score = 0

trex.changeAnimation("running", trex_running);

}
