var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

var bird, birdImg;
var restart, restartImg;
var start, startImg
var ceu, ceuImg;

var restart, restartImg;

var grupoObs, obs;

var solo;

var canvas;

function preload() {
  birdImg = loadImage('assets/bird.webp');
  startImg = loadImage('assets/start.png');
  ceuImg = loadImage('assets/ceu.png');
  restartImg = loadImage('assets/restart.png');
  obsImg = loadImage('assets/obs.png');
}

function setup() {
  canvas = createCanvas(1600,800);

  bird = createSprite(160,160,0,0);
  bird.addImage(birdImg);
  bird.scale = 0.25;
  bird.visible = false;

  start = createSprite(500,400,0,0);
  start.addImage(startImg);
  start.scale = 3.0;
  start.visible = true;
  
  restart = createSprite(160,160,0,0);
  restart.addImage(restartImg);
  restart.scale = 1.0;
  restart.visible = false;

  ceu = createSprite(160,160,0,0);
  ceu.addImage(ceuImg);
  ceu.scale = 1.0;
  ceu.visible = false;

  grupoObs = new Group();

  solo = createSprite(width/2 - 5,height,width,2);
  solo.x = width/2
  solo.visible = false;
}

function draw() {
  background(0, 150, 200)

  bird.collide(solo);

  if((touches.length > 0 || keyDown("SPACE")) && bird.y  >= height-700) {
    bird.velocityY = -16;
    touches = [];
     
  }
  
  //Implementação da gravidade
  bird.velocityY = bird.velocityY + 0.8


if (estadoJogo === JOGAR){
  if(keyDown("space")) {
    bird.visible = true;
    start.visible = false;
  }

   if(grupoObs.isTouching(bird)){
    estadoJogo = ENCERRAR;
  }
}

else if (estadoJogo === ENCERRAR) {

  grupoObs.setVelocityXEach(0);

  restart.visible = true;

  if(mousePressed(restart)){
  reset();
  }  
}
gerarObs();
drawSprites();
}

function gerarObs(){
  if (frameCount % 60 === 0){
    var obstaculo = createSprite(20,30,20,30);
     obstaculo.setCollider('circle',0,0,45)
     // obstaculo.debug = true
     
     //atribuir escala e tempo de duração ao obstáculo         
     obstaculo.scale = 0.3;
     obstaculo.lifetime = 300;
     
     //adicionar cada obstáculo ao grupo
     grupoObs.add(obstaculo);
  }
}

function reset(){
  estadoJogo = JOGAR;
  restart.visible = false;
  
  grupoObs.destroyEach(-1);

}