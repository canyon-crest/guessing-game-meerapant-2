// add javascript here
let guess = 0;
let answer = 0;
let guessCount = 0;
let totalWins = 0;
const scores = [];

document.getElementById("playBtn").addEventListener
("click", play);

function play(){
    let range = 0;
    let levels = document.getElementsByName("level");
    for(let i = 0; i < levels.length; i++){
        if(levels[i].checked){ //if a certain level is checked, then the range will fill in accordingly.
            range = parseInt(levels[i].value); 
        }
        levels[i].disabled = true; //disable so you cant change level in the middle
    }

    document.getElementById("msg").textContent = "Guess a number 1-" + range;
    answer = Math.floor(Math.random()*range) +1; //create the number for the person to guess
    guessCount = 0;

    guessBtn.disabled = false; //gray out the buttons once you click play
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
}