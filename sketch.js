var gameState=0
var player,plrImg
var bg1,bg2
var start
var ground,gImg
var iGround
var gravity=0.8
var fGroup,oGroup
var fruit,obstacle
var score,energy,lives,key
var fruit1, fruit2,fruit3,fruit4
var hearts,h1,h2,h3,h1I,h2I,h3I
var k1,k1I,k2,k2I,k3,k3I
var kGroup,k
var gameOver,gOImg
var bGroup
var bg2Img
var o1,o2,o3
var  reset
var youWon,ywI
var cloudImage,cloudsGroup;
var upButton,I;
 var sound
function  preload() {
gImg=loadImage("ground.png")
plrImg=loadAnimation("player.1.png","player.2.png","player.3.png","player.4.png")
fruit1=loadImage("fruit1.png")
fruit2=loadImage("fruit2.png")
fruit3=loadImage("fruit3.png")
cloudImage = loadImage("cloud.png");
fruit4=loadImage("fruit4.png")
h1I=loadImage("lives1.png")
h2I=loadImage("lives1.png")
h3I=loadImage("lives1.png")
k1I=loadImage("key.png")
k2I=loadImage("key.png")
k3I=loadImage("key.png")
gOImg=loadImage("gameOver.png")
bg2Img=loadImage("bg.jpg")
o1=loadImage("obstacle1.png")
o2=loadImage("obstacle2.png")
o3=loadImage("obstacle3.png")
ywI=loadImage("ww.png")
I=loadImage("button.png")
sound=loadSound("level.wav")
}
function setup() {

  createCanvas(innerWidth,innerHeight);

  bg1=createSprite(innerWidth/2,innerHeight/2,innerWidth,innerHeight)
  start=createButton("start")

  bg2=createSprite(innerWidth/2,innerHeight/2,innerWidth,innerHeight)
 // bg2.shapeColor="green"
  bg2.visible=false
  ground=createSprite(innerWidth/2,innerHeight-80,innerWidth,10)

  ground.addImage("ground",gImg)
  ground.visible=false
  
  iGround=createSprite(innerWidth/2,innerHeight-180,innerWidth,10)
  iGround.visible=false
  ground.x=ground.width/2
  h1=createSprite(innerWidth-200,30,50,50)
  h1.addImage("live1",h1I)
  h1.scale=0.25
  h2=createSprite(innerWidth-150,30,50,50)
  h2.addImage("live2",h2I)
  h2.scale=0.25
  h3=createSprite(innerWidth-100,30,50,50)
  h3.addImage("live3",h3I)
  h3.scale=0.25
  k1=createSprite(innerWidth-200,80,30,30)

  k2=createSprite(innerWidth-150,80,30,30)

  k3=createSprite(innerWidth-100,80,30,30)
k1.visible=false
k2.visible=false
k3.visible=false
k1.scale=0.2
k2.scale=0.2
k3.scale=0.2
  player=createSprite(80,500,30,30)
  player.visible=false
  player.shapeColor="red"
  player.addAnimation("player",plrImg)
  player.setCollider("circle",0,0,100)
  player.scale=0.4
  fGroup=new Group()
  oGroup=new Group()
  kGroup=new Group()
  bGroup=new Group()
  cloudsGroup=new Group()
  ground.scale=1
gameOver=createSprite(innerWidth/2,innerHeight/2)
gameOver.addImage("over",gOImg)
gameOver.visible=false
gameOver.scale=0.85
reset=createButton("REPLAY")
/*upButton=createSprite(innerWidth-innerWidth+50,innerHeight-100)
upButton.addImage("jupm",I)
upButton.scale=0.3*/
youWon=createSprite(innerWidth/2,innerHeight/2)
youWon.addImage("jet gaye",ywI)
youWon.visible=false
youWon.scale=1
}

function draw() {
 bg1.shapeColor="yellow"
  //console.log(gameState)
  background(255,255,255);
  
  drawSprites();
  if(gameState!==0){
  textSize(30)
  fill(255)
  text("Energy Level :"+energy,30,30)
  text("Distance :"+score,30,60)
  text("Lives :"+lives,30,90)
  }
  if(gameState===0){
    bg1.visible=true
    bg2.visible=false
    player.visible=false
    youWon.visible=false
    reset.hide()
    score=0
    energy=0
    lives=3
    k=0
    h1.visible=true
    h3.visible=true
    bg2.shapeColor="blue"
    h2.visible=true
    start.show()
    k1.visible=false
      k2.visible=false
k3.visible=false
gameOver.visible=false
//reset.hide()
  textSize(40)
  fill("red")
  text("Save your friend your friend has been kidnapped",innerWidth/2-420,80)
  textSize(35)
  fill("magenta")
  text("Rules",innerWidth/2-50,innerHeight-300)
  textSize(30)
  text("Click up arrow or tap to jump from obstacles"+"\n"+"   get fruit collect three key to "+"\n"+"       rescue your friend"
  ,innerWidth/2-200,innerHeight-200)
  start.position(innerWidth/2,innerHeight/2-200)
  start.size(100,70)
  start.mousePressed(()=>{
  gameState=1
  })
  } 
  if(gameState===1) {
 sound.play()
    ground.scale=3
    console.log(player.y)
  bg1.visible=false
  bg2.visible=true
  reset.hide()
  player.visible=true
  ground.visible=true
  start.hide()
  bg2.shapeColor="blue"
  ground.velocityX=-(5+score/100)
  player.velocityY = player.velocityY + gravity;
  if((keyDown(UP_ARROW)||touches.length>0)&&player.y>=497){
    player.velocityY= -20
    touches=[]
  }
if(mouseDown("left")&&player.y>=497){
  player.velocityY=-20
}
if(mouseDown()&&score>700&&energy>=10){
  var bullet=createSprite(player.x,player.y,10,10)
  bullet.velocityX=5
  energy-=10
  bullet.shapeColor="red"
  bGroup.add(bullet)
}
  if(ground.x<0){
  ground.x=ground.width/2
}
spawnObstacles()
spawnFruit()
spawnKeys()
spawnClouds()
if(player.isTouching(fGroup)){
fGroup.destroyEach()
energy+=5
youWon.visible=false
}
score=score+Math.round(getFrameRate()/60)
if(player.isTouching(oGroup)){
lives=lives-1
energy-=5
player.velocityY=player.velocityY* -1
oGroup.destroyEach()
}
if(lives<=0||k===3){
gameState=2
h3.visible=false
}

if(lives<=2){
  h1.visible=false
}
if(lives<=1){
  h2.visible=false
}
if(player.isTouching(kGroup)){
kGroup.destroyEach()
k++

}
if(k===1){
  k1.addImage("key1",k1I)
  k1.visible=true
}
if(k===2){
  k2.addImage("key2",k2I)
  k2.visible=true
}
if(k===3){
  k3.addImage("key3",k3I)
  k3.visible=true
}
if(score>700&&score<850&&gameState===1){
textSize(26)
text("You have unlocked gun feature, "+"\n"+"      Press SPACE to shoot",70,140)
}
if(keyDown("space")&&energy>=10&&score>700){
  var bullet=createSprite(player.x,player.y,10,10)
  bullet.velocityX=5
  energy-=10
  bullet.shapeColor="red"
  bGroup.add(bullet)
}

if(bGroup.isTouching(oGroup)){
  oGroup.destroyEach()
  
}
  }
  player.collide(iGround)
 
  if(gameState===2){
 
    if (k<3){
      ground.velocityX=0
      oGroup.velocityX=0
      kGroup.velocityX=0
      fGroup.velocityX=0
      player.visible=false
      gameOver.visible=true
      ground.visible=false
      bg2.shapeColor="red"
    }
else if(k===3){
  ground.velocityX=0
  oGroup.velocityX=0
  kGroup.velocityX=0
  fGroup.velocityX=0
  player.visible=false
  youWon.visible=true
  ground.visible=false
  bg2.shapeColor="yellow"
  text("You Won",400,400)
  
    
}
reset.position(innerWidth/2-30,400)
reset.show()
reset.size(70,30)
reset.mousePressed(()=>{
  gameState=0
  })

  }

}