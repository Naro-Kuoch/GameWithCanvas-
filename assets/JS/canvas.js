var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
canvas.width=800;
canvas.height=600;
//score and time 


var score = 0, time =60;

//propertiy of the big square 
var x = 50;
var y=50;
var speed =6;
var sideLength = 70;

//target property
var targetX=270;
var targetY= 50;
var targetLength=30;

var up=false;
var down=false;
var left=false;
var right=false;




function clear(){
    context.fillStyle = "#EAE0DE";
    context.fillRect(0,0,1000,600);
    
}
function isWithin(a, b, c) {
    return (a>b && a<c);
}
function respawn() {
    targetX = Math.round(Math.random() * (canvas.width - targetLength));
    targetY = Math.round(Math.random() * (canvas.height - targetLength));
  }

function drawScoreTime(score,x,y,size,area,color){
    return{
        x:x,
        y:y,
        s:size,
        a:area,
        c:color,
        score:score,
        draw:function(){
            context.beginPath();
            context.font=this.s+'px sans-serif';
            context.fillStyle=this.c;
            context.textAlign=this.a;
            context.fillText(score, this.x, this.y);
            context.closePath();
        }
    }
}
    // context.fillStyle="black";
    // context.font="18px Verdana";
    // context.context.textAlign='center'; 
    // context.fillText("Score: ",+score, canvas.width/2, canvas.height/2); 

function draw(){
    //clear screen
      clear();
    // context.fillStyle='#EAE0DE';
    // context.fillRect(0,0,canvas.width,canvas.height);
    // context.clearRect(0, 0, canvas.width, canvas.height);
    
    //display score and time
    let sc = drawScoreTime("Score: " + score,730,40,30,"right","black");
    sc.draw();
    let t = drawScoreTime("Time: " + time,20,40,30,"left",'black');
    t.draw();
    
    //update location base on keyboard
    if(down){
        y+=speed;
    }
    else if(up){
        y-=speed;
    }
    else if(right){
        x+=speed;
    }
    else if(left){
        x-=speed;
    } 

   //keep big square in game area 
    if(y + sideLength > canvas.height) {
        y = canvas.height - sideLength;
      }
      if(x + sideLength > canvas.width) {
        x = canvas.width - sideLength;
      }
      if (y < 0) {
        y = 0;
      }
      if(x < 0) {
        x = 0;
      }
       // Detect if big square collides with target
  if(isWithin(targetX, x, x+sideLength) || isWithin(targetX + targetLength, x, x+sideLength)) {
    if(isWithin(targetY, y, y + sideLength) || isWithin(targetY + targetLength, y , y+sideLength)) {
      // Respawn target: delete old target, and random new target at other location
      respawn();
    //   sideLength+=10;
      // Increase score
      score++;
      console.log("score", score);
    }
    if(sideLength==canvas.width){
        clear();
        
    }
  }
    
    //draw
    context.fillStyle = "#FF0000";
    context.fillRect(x, y, sideLength, sideLength);





    // draw target
    context.fillStyle ="#0BC420 "
    context.fillRect(targetX, targetY, targetLength, targetLength);

 

    
    if(time<=0){
        alert("Your Score "+ score)
        clearInterval(st);
        //end game
    }
    else{
        window.requestAnimationFrame(draw);
    }
    
}
var st = setInterval(function(){
    time--;
    console.log('time', time);
}, 1000);



canvas.addEventListener('keydown',function(event){
    event.preventDefault();
    console.log(event.key);

    down = false;
    up = false;
    left = false;
    right = false;

    if (event.key == "ArrowDown"){
        down = true;
    }
    else if (event.key == "ArrowUp"){
        up = true;
    }
    else if(event.key == "ArrowRight"){
        right = true;
    }
    else if (event.key == "ArrowLeft"){
        left=true;
    }

    
});
// canvas.addEventListener('key',function(event){
//     event.preventDefault();
//     console.log(event.key);
// });


draw();



