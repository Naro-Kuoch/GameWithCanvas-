var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//score and time 
var score = 0, time =60;

//propertiy of the big square 
var x = 50;
var y=50;
var speed =3;
var sideLength = 20;

//target property
var targetX=270;
var targetY= 50;
var targetLength=10;

var up=false;
var down=false;
var left=false;
var right=false;


function clear(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,1000,600);
    
}
function isWithin(a, b, c) {
    return (a>b && a<c);
}
function respawn() {
    targetX = Math.round(Math.random() * canvas.width - targetLength);
    targetY = Math.round(Math.random() * canvas.height - targetLength);
  }
function draw(){
    //clear screen
    clear();
    
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
      // Increase score
      score++;
      console.log("get score", score);
    }
  }
    
    //draw
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x, y, sideLength, sideLength);





    // draw target
    ctx.fillStyle ="#0BC420 "
    ctx.fillRect(targetX, targetY, targetLength, targetLength);

 

    
    if(time<=0){
        //end game
    }
    else{
        window.requestAnimationFrame(draw);
    }
    
}
setInterval(function(){
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


