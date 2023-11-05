const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetButton = document.querySelector("#resetButton");
const gameW = gameBoard.width;
const gameH = gameBoard.height;


const boardColor = 'black';

const p1Color = 'white';
const p2Color = 'red';
const pBorder = 'gold';
const pSpeed = 50;

const ballColor = 'white';
const ballBorderColor = 'gold';
const ballRad = 10;

let intervalID;
let ballSpeed = 1;
let ballX = gameW / 2;
let ballY = gameH / 2;
let ballDirectionX = 0;
let ballDirectionY = 0;

let player1Score = 0;
let player2Score = 0;

let p1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
}
let p2 = {
    width: 25,
    height: 100,
    x: gameW -25,
    y: gameH -100
}

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    createBall();
    nextTick();
};

function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        drawBall(ballX, ballY);
        moveBall();
        checkCollision();
        nextTick();
    }, 10)
};

function drawPaddles(){
    ctx.strokeStyle = pBorder;

    // Paddle 1
    ctx.fillStyle = p1Color;
    ctx.fillRect(p1.x, p1.y, p1.width, p1.height)
    ctx.strokeRect(p1.x, p1.y, p1.width, p1.height)

    // Paddle 2
    ctx.fillStyle = p2Color;
    ctx.fillRect(p2.x, p2.y, p2.width, p2.height)
    ctx.strokeRect(p2.x, p2.y, p2.width, p2.height)
};

function clearBoard(){
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, gameW, gameH);
};

function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1) {
        ballDirectionX = 1;
    }else{
        ballDirectionX = -1;
    }
    if(Math.round(Math.random()) == 1) {
        ballDirectionY = 1;
    }else{
        ballDirectionY = -1;
    }

    ballX = gameW / 2;
    ballY = gameW / 2;
    drawBall(ballX, ballY);
};

function drawBall(ballX, ballY){
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRad, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
};

function moveBall(){
    ballX += (ballDirectionX * ballSpeed);
    ballY += (ballDirectionY * ballSpeed);    

};

function checkCollision(){
    if(ballY <= 0 + ballRad){ // top
        ballDirectionY *= -1; // bounce back
    }
    if(ballY >= gameH - ballRad){ // bottom
        ballDirectionY *= -1; // bounce back
    }
    if(ballX <= 0 + ballRad){ // left
        player2Score += 1; // playerscore update
        updateScore();
        createBall();
        return;
    } 
    if(ballX >= gameW - ballRad){ // right
        player1Score += 1; // playerscore update
        updateScore();
        createBall();
        return;
    }

    if(ballX <= (p1.x + p1.width + ballRad)){
        if(ballY > p1.y && ballY < p1.y + p1.height){
            ballDirectionX *=-1;
            ballSpeed += 0.5;
        }
    }
    if(ballX >= (p2.x - ballRad)){
        if(ballY > p2.y && ballY < p2.y + p2.height){
            ballDirectionX *=-1;
            ballSpeed += 0.5;
        }
    }
};

function changeDirection(event){
    // w:       87
    // s:       83
    // up:      38
    // down:    40
    const keyPressed = event.keyCode;

    const p1Up = 87;
    const p1Down = 83;
    const p2Up = 38;
    const p2Down = 40;

    switch(keyPressed){
        case(p1Up):
            if(p1.y>0)
                p1.y -= pSpeed;
            break;
        case(p1Down):
            if(p1.y + p1.height < gameH)
                p1.y += pSpeed;
            break;
        case(p2Up):
            if(p2.y>0)
                p2.y -= pSpeed;
            break;
        case(p2Down):
            if(p2.y + p2.height < gameH)
                p2.y += pSpeed;
            break;
    }

};
function resetGame(){
    location.reload();
};
function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`;
};


