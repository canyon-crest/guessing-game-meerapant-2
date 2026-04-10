// add javascript here
let answer = 0;
let guessCount = 0;
const scores = [];
const times = [];
let start = 0;

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp)

let input = prompt("What is your name?");
let casedName = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

function displayDate() {
    let d = new Date();
    let day = d.getDay();
    let month = d.getMonth();
    let year = d.getFullYear();
    let currentTime = d.toLocaleTimeString();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if ((day % 10 == 1) && (day != 11)) {
            day += "st";
        }
        else if (day % 10 == 2 && day != 12) {
            day += "nd";
        }
        else if (day % 10 == 3 && day != 13) {
            day += "rd";
        }
        else {
            day += "th";
        }
    document.getElementById("date").textContent = months[month] + " " + day + ", " + year + ". Current time: " + currentTime;
}
displayDate();
setInterval(displayDate, 1000);

function play(){
    start = new Date().getTime();
    let range = 0;
    let levels = document.getElementsByName("level");
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    document.getElementById("msg").textContent = "Hi, " + casedName + ", guess a number 1-" + range;
    answer = Math.floor(Math.random()*range) +1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;

}

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    let diff = Math.abs(guess-answer);
    if(isNaN(guess)){
        msg.textContent = casedName + ", please enter a valid number";
        return;
    }
    guessCount++;
    if(guess == answer){
        msg.textContent = "Correct! It took " + guessCount + " tries, " + casedName + "!";
        updateScore(guessCount);
        resetGame();
    }
    else if(guess < answer){
        if (diff <= 2){
            msg.textContent = "Too low, but getting hot, " + casedName + "!"
        }
            else if (diff <= 5){
            msg.textContent = "Too low, but getting warm, " + casedName + "!"
        }
        else {
            msg.textContent = "Too low, and cold, " + casedName + "!"
        }
    }
    else{
        if (diff <= 2){
            msg.textContent = "Too high, but getting hot, " + casedName + "!"
        }
            else if (diff <= 5){
            msg.textContent = "Too high, but getting warm, " + casedName + "!"
        }
        else {
            msg.textContent = "Too high, and cold, " + casedName + "!"
        }
    }

    
//   After each wrong guess, also tell the player how close they are based on Math.abs(guess - answer):

// Difference ≤ 2 → message must contain "hot" (case-insensitive)
// Difference ≤ 5 → message must contain "warm" (case-insensitive)
// Difference > 5 → message must contain "cold" (case-insensitive)
    
}

function updateScore(score){
    scores.push(score);
    wins.textContent = "Total wins: " + scores.length;
    let sum = 0;
    for(let i = 0; i < scores.length; i++){
        sum += scores[i]; //sum = sum + scores[i]
    }
    avgScore.textContent = "Average Score: " + (sum/scores.length).toFixed(1);

    scores.sort(function(a,b){return a-b;}); //sort score increasing

    let lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < lb.length; i++){
        if(i < scores.length){
            lb[i].textContent = scores[i];
        }
    }
    let timeNow =  new Date().getTime();
    let totalTime = (timeNow - start)/1000; //convert ms into sec
    times.push(totalTime);
    let fastTime = Math.min(...times);
    document.getElementById("fastest").textContent = "Fastest Game: " + fastTime.toFixed(2);

    sum = 0;
    for(let j = 0; j < times.length; j++){
        sum += times[j];
    }
    avgTime.textContent = "Average Time: " + (sum/times.length).toFixed(2);

}
function resetGame(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
}

function giveUp() {
    let range = 0;
    let levels = document.getElementsByName("level");
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
    }
    updateScore(range);

    msg.textContent = "";
    resetGame();
}

