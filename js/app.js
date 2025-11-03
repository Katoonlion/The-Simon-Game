/*-------------- Constants -------------*/

/*---------- Variables (state) ---------*/

// Define constants and variables

let started = false;
let level = 0;

// random color
let allColors = ['green', 'yellow', 'red', 'blue'];
// array store game pattern
let gameRandomColor = [];
// array store player pattern
let playerPatternColor = [];


/*----- Cached Element References  -----*/

// Cache DOM element

const pressStartElement = document.querySelector('#start-btn');
const changeTitletoScore = document.querySelector('#title');
const buttonColorElement = document.querySelectorAll('.btn');

/*-------------- Functions -------------*/

// Function game start
function gameStarted() {
    // If game has not start
    // player press start --> game started = true

    // !started --> true
    if(!started){
        started = true;
        // hide start game button
        pressStartElement.style.display = 'none';
        // reset title tex to level score 
        changeTitletoScore.textContent = `level ${level}`;
        // call function start random color
        startRandom();
    };
};

// Function start random color
function startRandom() {
    // random color from option → store to game pattern array
    // random index of color <= 4
    let randomIndexColor = Math.floor(Math.random()*4);
    // If index = 0 --> randomColor = 'green'
    let randomColor = allColors[randomIndexColor];
    // put it in array gameRandomColor
    gameRandomColor.push(randomColor);

    // 	increase level
    level ++;

    // 	update title and and current level
    changeTitletoScore.textContent = `level ${level}`;
    // clear player pattern for next round
    playerPatternColor = [];

    // play sound and flash on color chosen
    // sound at color of game random
    playSound(randomColor);  

    // fade color at color of game random
    flashColor(randomColor);

};

// Function player click
function handlePlayerClick(event) {
    // add color from player chosen to player patter array
    // If player click on red store red to the platerPattern color array
    let playerClickOnColor = event.target.id;
    playerPatternColor.push(playerClickOnColor);

    // 	play sound and flash on color chosen
    playSound(playerClickOnColor);

    flashColor(playerClickOnColor);

    // call to function check player answer for check last index of player was click
    checkPlayerAnswer(playerPatternColor.length-1);
}

// Function play sound when player click on each color
function playSound(name) {
    // let audio = new Audio("sounds/" + color + ".mp3");
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// Function flash color when player click on each color
function flashColor(selectedColor) {
    document.querySelector(`#${selectedColor}`).classList.add("pressedColor");
    setTimeout(() => {
         document.querySelector(`#${selectedColor}`).classList.remove("pressedColor");
    }, 100);
};

// Function check player answer
function checkPlayerAnswer(currentLevel) {
    // If player click on correct answer --> correct index of game random
    if(playerPatternColor[currentLevel] === gameRandomColor[currentLevel]) {
        // If player pattern = game pattern length
        if(playerPatternColor.length === gameRandomColor.length) {
        // wait and call function start random color for start random new round
            setTimeout(() => {
               startRandom();   
            }, 1000);
                      
        }

    } else {
        // play wrong sound and flash red color on display screen
        playSound('wrong');               
        // display show red flash 
        document.querySelector('body').classList.add('game-Over');
        setTimeout(() => {
            document.querySelector('body').classList.remove('game-Over');
        }, 200);

        // update title to ‘Game Over! Press for Restart’
        changeTitletoScore.textContent = 'Game Over! Press for restart';
        // show button start game
        pressStartElement.style.display = '';        
        // call to function game over for set to begin
        gameOver();  
    }
      
}

// Function game over
function gameOver() {
    // set to begin
    level = 0;
    gameRandomColor = [];
    started = false
}

/*----------- Event Listeners ----------*/
// Add event listeners

// Player click for start game
pressStartElement.addEventListener('click', gameStarted);

// When Player click a color
// Select all button
buttonColorElement.forEach(function(button) {
    // Add event listener each button color
    button.addEventListener('click', handlePlayerClick) ;

});
