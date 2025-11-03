



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
        pressStartElement.style.display = "none";
        // title text change to level score
        changeTitletoScore.textContent = `level ${level}`;
        // game start random
        startRandom();
        // change start = true --> can not click again when start
        started = true;
    };
};

// When Player click a color
// Select all button
buttonColorElement.forEach(function(button) {
    // Add event listener each button color
    button.addEventListener('click', function () {
        // If player click on red store red to the platerPattern color array
        let playerClickOnColor = document.getElementById('btn');
        playerPatternColor.push(playerClickOnColor);
        playColorSound(playerClickOnColor);
    })
})


// Start random color
function startRandom() {
    // random index of color <= 4
    let randomIndexColor = Math.floor(Math.random()*4);
    // If index = 0 --> randomColor = 'green'
    let randomColor = allColors(randomIndexColor);
    // put it in array gameRandomColor
    gameRandomColor.push(randomColor);
    // fade at color of game random
    // document.querySelector("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // sound at color of game random
    playColorSound(randomColor);  
}



// Check player answer

// function checkPlayerAnswer() {
//     // If player click on correct answer
//     // start new sequence
// }

// function play sound
function playColorSound(color) {
    // let sound = new Audio("sounds/" + color + ".mp3");
    let sound = new Audio(`sounds/${color}.mp3`);
    sound.play();
}




/*----------- Event Listeners ----------*/

// Player click for start game
pressStartElement.addEventListener('click', gameStarted);


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
