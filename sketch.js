var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var score =0, gamestate = 'play';
var particle = 0, count=0;  
var particles = [];
var plinkos = [];
var divisions = []
var divisionPos =[]
var divisionHeight=300;
var score =0;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
     
   }
   for(var i = 0; i<divisions.length; i++){
    var currentDivide = divisions[i];
    divisionPos.push(currentDivide.body.position);
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
  console.log(divisionPos);   
}
 


function draw() {
  background("black");
  textSize(20)
 //text("Score : "+score,20,30);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
   } 
   
   /*if(frameCount%45===0){
     particles.push(new Particle(random(width/2-100, width/2+50), 10,10));
     //score++;
   }
  */
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
     if(divisions[k].body.position.x<200||divisions[k].body.position.x>500){
       text("500", divisions[k].body.position.x+ 20, 550);
     }
    
     if(divisions[k].body.position.x>200&&divisions[k].body.position.x<500){
      text("200", divisions[k].body.position.x+ 20, 550);
    }
   }
   for(var w = 0; w<particles.length; w++){
  //make it so that when the plinkos fall in between the divisions, the score increases. Use increments of 80.
  //the score will not increment
    if(particles[w].body.position.y>700 && particles[w].body.position.y<710){
      if(particles[w].body.position.x<240 || particles[w].body.position.x>560){
        //particles.pop();
        score += 500;
      }
      if(particles[w].body.position.x>240 && particles[w].body.position.x<560){
        score += 200;
      }
    }
  }
  if(particle >= 5){
    gamestate = 'end';
  }
  if(gamestate === 'end'){
    text("GAME OVER", 100, 40);
  }
   text(score, 20, 30);
   fill(255, 255, 255);
   strokeWeight(5);
   //line(0, 400, 800, 400);
}
function mousePressed(){
  if(gamestate === 'play'){
    particles.push(new Particle(mouseX, 10, 10, 10));
    particle++;
  }
}