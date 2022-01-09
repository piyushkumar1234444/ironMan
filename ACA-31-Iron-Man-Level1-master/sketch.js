
var bg, backgroundImg;
var ironMan;
var stone,stoneGroup;
var spike,spikeGroup;
var diamond,diamondGroup;
var score =0;
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironManImg=loadImage("images/iron.png")
  stoneImage=loadImage("images/stone.png")
  spikeImage=loadImage("images/spikes.png")
  diamondImage=loadImage("images/diamond.png")
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.scale=2
  bg.velocityY=5
  bg.addImage(backgroundImg)
  ironMan=createSprite(470,440,20,30)
  ironMan.addImage(ironManImg)
  ironMan.scale=0.3
  ironMan.debug=true;
  ironMan.setCollider("rectangle",100,0,200,400)
  stoneGroup = new Group();
  spikeGroup = new Group();
  diamondGroup = new Group();
  ground=createSprite(500,600,400,30)

}

function draw() {
  if(keyDown("space"))
  {
    ironMan.velocityY=-4     
  } 
  if(keyDown("left"))
  {
    ironMan.velocityX=-4
  }
  if(keyDown("right"))
  {
    ironMan.velocityX=4
  }
  
if(bg.y>300){
  bg.y = 100
}
if(ironMan.x<10){
  ironMan.x=20
}
if(ironMan.y<10){
  ironMan.y=20
}

 ironMan.velocityY=ironMan.velocityY+0.5
 ironMan.collide(ground )
 ground.visible=false;
 generateStone();

 for( i = 0; i<(stoneGroup).length; i++)
 {
   var temp = (stoneGroup).get(i)
   if(temp.isTouching(ironMan)){
     ironMan.collide(temp)
   }
 }
   generateSpike();
   for( i = 0; i<(spikeGroup).length; i++)
   {
     var temp = (spikeGroup).get(i)
     if(temp.isTouching(ironMan)){
       ironMan.collide(temp)
     }
   }
   generateDiamond();
   for(i=0;i<(diamondGroup).length;i++){
     var temp = (diamondGroup).get(i)
     if(ironMan.isTouching(temp)){
        score++
        temp.destroy()
        temp = null
     }
   }
    drawSprites();
    textSize(20)
    fill("brown")
    text("Your Score : "+score,550,100)
   
}
function generateStone()
{
  if(frameCount%70==0){
    var stone = createSprite(1200,120,40,10)
    stone.scale=0.2
    stone.addImage(stoneImage)
    stone.y=random(50,450)
    stone.scale=0.5
    stone.velocityX=-5
    stone.lifetime=250
    stoneGroup.add(stone)
  }
}
   function generateSpike(){
     if(frameCount%60==0){
     var spike = createSprite(random(0,1000),0,50,50)
     spike.addImage(spikeImage)
     spike.scale=0.5
     spike.velocityY=5
     spike.lifetime=280
     spikeGroup.add(spike)

    }
    }   
function generateDiamond(){
  if(frameCount%50==0){
    var diamond = createSprite(1200,120,50,50)
    diamond.addImage(diamondImage)
    diamond.scale=0.4
    diamond.velocityX=-5
    diamond.lifetime=280
    diamond.y=random(10,500)
    diamondGroup.add(diamond)
    
  }
}
   