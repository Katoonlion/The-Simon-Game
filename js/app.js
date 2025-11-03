/*-------------- Constants -------------*/

/*---------- Variables (state) ---------*/

// start game
let started = false;
let level = 0;

// random color
let allColors = ['green', 'yellow', 'red', 'blue'];
// array store game pattern
let gameRandomColor = [];
// array store player pattern
let playerPatternColor = [];


/*----- Cached Element References  -----*/

const pressStartElement = document.querySelector('#start-btn');
const changeTitletoScore = document.querySelector('#title');
const buttonColorElement = document.querySelectorAll('.btn');

/*-------------- Functions -------------*/

//if player press 'S' key ---> start game!

function gameStarted() {
    // If player press 'S' ---> game started = true --> title text change to score// button start game --> hide
    // !started --> true
    if(!started){
        // button start --> hide
        pressStartElement.style.display = 'none';
        // title text change to level score
        changeTitletoScore.textContent = `level ${level}`;
        // game start random
        startRandom();
    };
};


// Start random color
function startRandom() {
    // random index of color <= 4
    let randomIndexColor = Math.floor(Math.random()*4);
    // If index = 0 --> randomColor = 'green'
    let randomColor = allColors[randomIndexColor];
    // put it in array gameRandomColor
    gameRandomColor.push(randomColor);

    // sound at color of game random
    playSound(randomColor);  

    // fade color at color of game random
    fadeColor(randomColor);

    // Cleared array before player play new game
    playerPatternColor = [];

    level ++;
    changeTitletoScore.textContent = `level ${level}`;
};

// function play sound
function playSound(name) {
    // let audio = new Audio("sounds/" + color + ".mp3");
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// function animation
function fadeColor(selectedColor) {
    document.querySelector(`#${selectedColor}`).classList.add("pressedColor");
    setTimeout(() => {
         document.querySelector(`#${selectedColor}`).classList.remove("pressedColor");
    }, 300);
};

// Check player answer

function checkPlayerAnswer(currentLevel) {
    // If player click on correct answer --> correct index of random
    if(playerPatternColor[currentLevel] === gameRandomColor[currentLevel]) {
        // If player repeat all of random color respectively
        if(playerPatternColor.length === gameRandomColor.length) {
        // set time for start new sequence
            setTimeout(() => {
               startRandom();   
            }, 800);
                      
        }

    } else { // If wrong  
        // sound wrong color
        playSound('wrong');        
        // text "Game Over! Click for restart "
        changeTitletoScore.textContent = 'Game Over! Click for restart';
        // show button start
        pressStartElement.style.display = '';

        // display show red flash 
        document.querySelector('body').classList.add('game-Over');
        setTimeout(() => {
            document.querySelector('body').classList.remove('game-Over');
        }, 500);
        // call function gameOver for go back to begin
        gameOver();
    }
      
}

function gameOver() {
    // set to begin
    level = 0;
    gameRandomColor = [];
    started = false
}

/*----------- Event Listeners ----------*/

// Player click for start game
pressStartElement.addEventListener('click', gameStarted);

// When Player click a color
// Select all button
buttonColorElement.forEach(function(button) {
    // Add event listener each button color
    button.addEventListener('click', function (event) {
        // If player click on red store red to the platerPattern color array
        let playerClickOnColor = event.target.id;
        playerPatternColor.push(playerClickOnColor);
        playSound(playerClickOnColor);

        fadeColor(playerClickOnColor);

        // Check last index of color of player was click and call to function checkPlayerAnswer()
        checkPlayerAnswer(playerPatternColor.length-1);
    });

})
// START the game

// CREATE an empty list called gamePattern
// CREATE an empty list called userPattern
// SET level to 0

// FUNCTION startGame
    // CALL nextSequence

// FUNCTION nextSequence
    // INCREASE level by 1
    // CLEAR userPattern
    // CHOOSE a random color from [red, blue, green, yellow]
    // ADD that color to gamePattern
    // SHOW the full sequence of colors to the player (flash + sound)

// WHEN the player clicks a color
    // ADD that color to userPattern
    // PLAY the sound for that color
    // CALL checkAnswer

// FUNCTION checkAnswer
    // IF the most recent color in userPattern matches gamePattern
        // IF userPattern is the same length as gamePattern
            // WAIT one second
            // CALL nextSequence
    // ELSE
        // PLAY “wrong” sound
        // SHOW “Game Over” message
        // CALL resetGame

// FUNCTION resetGame
    // SET level to 0
    // CLEAR gamePattern
    // WAIT for player to press a key to start again
