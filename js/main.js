console.log('main loaded')
 
let playerName;
 

 
// Dit is het speelveld
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;
 
// Dit is de Snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
 
let velocityX = 0;
let velocityY = 0;
 
const snakeBody = [];
 
// Food
let foodX;
let foodY;
 
let gameOver = false;
 
// Score
let score = 0;
 
 
// Dit gebeurt er, als je de pagina inlaadt.
// Ook heb ik een height en een width toegevoegd
// En ook de context erbij gezet
window.onload = function () {
    playerName = prompt("Vul uw naam hier in:")
    board = document.querySelector(".board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    if (!playerName) {
        playerName = "Speler";
    }
 
    // Dit is een functie om de appel te plaatsen in het speelveld
    placeFood();
    document.addEventListener("keyup", changeDirection);
    // Hier ga ik de snelheid van de Snake bepalen
    // 1000/10=100, dus de Snake beweegt nu 100 milliseconden 
    setInterval(update, 1000 / 10);
    // Voeg het scorebord toe bij het laden van de pagina
    updateScore();
}
 
// Hier ga ik beginnen met de functie van de game zelf.
function update() {
    if (gameOver) {
        return;
    }
 
    // Dit is de kleur van de achtergrond van het speelveld
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
 
    // Dit is de kleur van het appel van de Snake
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
 
    // Als de Snake en de appel op hetzelfde vakje komt, dan verplaatst de appel.
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score += 10; // Verhoog de score met 10
        updateScore(); // Werk het scorebord bij
    }
 
    // Deze for-loop zorgt ervoor dat de positie van de lichaamsdelen van de Snake beweegt.
    // Met deze for-loop wordt de positionering van de Snake bepaald.
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
 
    // Dit is de kleur van de Snake
    context.fillStyle = "lime";
    // Hier bepaal ik de grootste en de snelheid van de Snake
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
 
    // Deze if statement heb ik erin gezet, dat de Snake niet de muur gaat raken.
    // Als de Snake de muur wel aanraakt, dan komt er een alert met:
    // "Game Over!"
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert("Game Over!");
        resetGame(); // Voeg deze regel toe om het spel opnieuw in te stellen
    }
 
    // Deze for-loop gaat voor mij checken of de Snake daadwerkelijk de muur heeft geraakt.
    // Of zichzelf, want als de Snake zichzelf aanraakt, dan ben je ook al "Game Over!".
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over!");
            resetGame(); // Voeg deze regel toe om het spel opnieuw in te stellen
        }
    }
}
 
// Dit is de functie voor de richting van de Snake.
// Welke kant je op wil gaan en met welke snelheid een kant op gaat.
function changeDirection(e) {
    // Pijltje omhoog
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    // Pijltje omlaag
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    // Pijltje naar links
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    // Pijltje naar rechts
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
 
// Dit is een functie om voor de plaats van de appel
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
 
// Dit is een functie om het scorebord bij te werken
function updateScore() {
    document.querySelector(".score").innerText = "Score: " + score;
}
 
// Dit is een functie om het spel opnieuw in te stellen
function resetGame() {
    // Reset Snake positie, snelheid en lichaam
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody.length = 0;
 
    // Reset Food positie
    placeFood();
 
    // Reset de score
    score = 0;
 
    // Zet gameOver terug naar false
    gameOver = false;
 
    // Werk het scorebord bij
    updateScore();
}
 
function showEndMessage() {
    // Geef een alert weer met de score en de ingevoerde naam
    alert(playerName + " heeft een score van " + score + ". Goed gedaan, " + playerName + "!");
    location.reload();
}
 
// ... rest van de code blijft hetzelfde ...
 
// Pas de resetGame-functie aan om het eindbericht weer te geven
function resetGame() {
    // ... rest van de code blijft hetzelfde ...
 
    // Voer de functie uit om het eindbericht weer te geven
    showEndMessage();
}