const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const box = 32; 

// Put images

const canPng = new Image ();
canPng.src = "img/canPng.png";

const apple = new Image();
apple.src = "img/apple.png";

// Make the Snake

let snake = [];

snake[0] = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
};

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15 +3) * box
};

// Score Var
let score = 0;


//Controls
let t;

document.addEventListener("keydown", direction);

function direction(event){
    let arrow = event.keyCode;

    if( arrow == 37 && t != "RIGHT"){
        t = "LEFT";
    }
    else if( arrow == 38 && t != "DOWN"){
        t = "UP";
    }
     else if( arrow == 39 && t != "LEFT"){
        t = "RIGHT";
    }
    else if( arrow == 40 && t != "UP"){
        t = "DOWN";
    }
}

// Check if it has any Collision

function Collision (head,array){
    for(let i= 0; i<array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
        return false;
    }
}

// Draw

function drawGame(){

    context.drawImage(canPng,0,0);
    
    context.drawImage(apple, food.x, food.y);
    
       for( let i = 0; i < snake.length; i++){
        context.fillStyle = ( i == 0 )? "green" : "white";
        context.fillRect(snake[i].x,snake[i].y,box,box);

        context.strokeStyle = 'blue';
        context.strokeRect( snake[i].x,snake[i].y,box,box);
     }
     let snakeX = snake[0].x;
     let snakeY = snake[0].y;

    //Drawning i which direction

    if( t == "LEFT") { snakeX -= box;}
    if( t == "RIGHT") { snakeX += box;}
    if( t == "UP") { snakeY -= box;}
    if( t == "DOWN") { snakeY += box;}


// When Snake eat Apple

if(snakeX == food.x && snakeY == food.y){
    score++;

    food = {
        x : Math.floor(Math.random()*17+1) * box,
        y : Math.floor(Math.random()*15+3) * box
    };

}
else{
    snake.pop();
}


// Make New Head 
 let Head = {
     x : snakeX,
     y : snakeY
 }


if(snakeX < box || snakeX > 17*box || snakeY < 3* box || snakeY > 17 * box || Collision(Head, snake))
{
    clearInterval(game);

}

    context.fillText(score,2 * box, 1.6*box);
    context.font = "35px Arial"
snake.unshift(Head);
// Set Interval for Game
}
let game = setInterval(drawGame, 200);

