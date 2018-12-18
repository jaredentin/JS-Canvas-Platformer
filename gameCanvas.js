var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

canvas.width = document.getElementById("body").offsetWidth;
canvas.height = document.getElementById("body").offsetHeight;

var originalPlayer = new Player(10, 10, 10, "#ff0000", 0);
var gravity = .1;
var terminalVelocity = 3;

var groundArr = document.getElementsByTagName("h1");
var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);

window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

var winZone = document.getElementById("win_zone").getBoundingClientRect();

function draw(){
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    originalPlayer = new Player(originalPlayer.x, originalPlayer.y, originalPlayer.r, originalPlayer.c, originalPlayer.speed);
    
    useGravity(originalPlayer);
    
    if (keyState[39] || keyState[68]) { //'d' or right arrow key
        if (originalPlayer.x < canvas.width){
            originalPlayer.x += 1;
        }
    }
    
    if (keyState[37] || keyState[65]) { //'a' or left arrow key
        if (originalPlayer.x > 0){
            originalPlayer.x -= 1;
        }
    } 
    
    if (keyState[38] || keyState[87]) { //'w' or up arrow key     
        if (onGround(originalPlayer, groundArr)){
            originalPlayer.speed -= 4; 
        }
    } 
   
    originalPlayer.y += originalPlayer.speed;
    
    if (originalPlayer.y+originalPlayer.r > canvas.height){
        originalPlayer.x = 10;
        originalPlayer.y = 10;
    }
    
    if (originalPlayer.x > winZone.left && originalPlayer.x < winZone.right && originalPlayer.y > winZone.top && originalPlayer.y < winZone.bottom){
        clearInterval(drawLoop);
    }
}
var drawLoop = setInterval(draw, 10);

function useGravity(object){
    
    if (!onGround(object, groundArr) && object.y < canvas.height){
        if (object.speed < terminalVelocity){
            object.speed += gravity;
        }
    } else {
        object.speed = 0;   
    }
}

function isInBounds(object){
    if (object.x < canvas.width && object.x > 0){
        return true;
    } else {
        return false;
    }
}

function onGround(object, arr){
    found = false;
    for (var i = 0; i < arr.length; i++){
        var tempIndex = arr[i].getBoundingClientRect();
        if (object.y+object.r > tempIndex.top && object.y+object.r < tempIndex.top+5 && object.x > tempIndex.left && object.x < tempIndex.right || object.y+object.r > canvas.height){
            found = true;
        }
    }
    if (found){
        return true;
    } else {
        return false;   
    }
}

function Player(x, y, r, c, speed){
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.speed = speed;
    
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = c;
    ctx.strokeStyle = c;
    ctx.fill();
    ctx.closePath();
}