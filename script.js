////////////////////////
//pregame and globals//
//////////////////////
// alert(`Welcome to SpaceMan.

// Press the start button to begin.
// Upon starting the game you'll be given a hidden word.
// Guess the letters to reveal the hidden word.

// CAREFUL...
// too many guesses can lead your astronaut astray..
// `);

//globals
let word = "";
let health = 3;
let answerCount = null;
let checkIfCorrect = 0;
let damageFlag = false;

////////////////////////////
//start and reset buttons//
//////////////////////////

//start game
function startGame() {
  event.preventDefault();
  getWord();
  startButton.style.display = "none";
  answerHeader.innerText = "Guess a Letter at a time!";
}
//reset game
function resetGame() {
  window.location.reload();
}

///////////////////////
//Word Generator API//
/////////////////////

function getWord(event) {
  fetch("https://random-word-api.herokuapp.com/word?swear=0")
    .then((res) => {
      return res.json();
    })

    .then((res) => {
      word = res.pop().toUpperCase();
      //leave console.log for permanent reference//
      console.log(`The Answer Is ${word}`);

      for (let i = 0; i < word.length; i++) {
        const div = document.createElement("div");
        div.setAttribute("name", word[i]);
        div.classList.add("divLetter");
        // console.log(div.getAttribute("name"));
        document.querySelector("#letterBoard").append(div);
      }
    });
}
/////////////////
//answer check//
///////////////

function checkAnswer() {
  let answer = document.getElementById("answer").value.toUpperCase();
  let blocks2Array = document.querySelectorAll(".divLetter");
  newBlocks = Array.from(blocks2Array).map((x) => x.getAttribute("name"));
  answerCount = newBlocks.length;

  for (i = 0; i < newBlocks.length; i++) {
    if (answer === newBlocks[i]) {
      blocks2Array[i].innerText = answer;
      blocks2Array[i].style.border = `5px solid green`;
      checkIfCorrect += 1;
      checkForWin();
    } //else {
    //   damageFlag = true;
    // }
  }
} //end of function

///////////////////////
//winning conditions//
/////////////////////

function checkForWin() {
  if (checkIfCorrect === answerCount) {
    victoryBanner = document.getElementById("subTitle");
    victoryBanner.style.fontSize = "75px";
    victoryBanner.style.color = "green";
    victoryBanner.innerText = "!! VICTORY !!";
  }
}

//////////////////////
//losing conditions//
////////////////////

//damage flag operation
// if(damageFlag = true){
//   return health -= 1
// }

if (health === 2) {
  //change to slightly damaged astronaut IMG
}
if (health === 1) {
  //change to increasingly damages astronaut IMG
}
if (health === 0) {
  loserBanner = document.getElementById("subTitle");
  loserBanner.style.fontSize = "75px";
  loserBanner.style.color = "red";
  loserBanner.innerText = `Your Astronaut Has Vanished..
  
  GAME OVER`;
}
