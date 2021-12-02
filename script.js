// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
    "dependent",
    "dog",
    "superficial",
    "admit",
    "juice",
    "javascript",
    "developer",
    "airplane",
    "great",
    "fun",
    "manipulate",
    "cat",
    "transition",
    "school",
    "computer",
    "programming",
    "drag",
    "loving",
    "north",
];

//get a random word from the words array
//add the word to the DOM
//we need an event listener for the text element
//check if its the correct input
//update score
//we need to have a timer that is going to count down
//update timer
//we need handle if its game over
//we need to able change difficulty
//we need to create function for each difficulty
//set time depending pn difficulty

//initialize word
let randomeWord

//initialize score
let score = 0

//let difficulty = "medium"

//initialize time
let time = 10

//set difficulty in localstorage
let difficulty =
    localStorage.getItem("difficulty") !== null ?
    localStorage.getItem("difficulty") :
    "medium"

difficultySelect.value =
    localStorage.getItem("difficulty") !== null ?
    localStorage.getItem("difficulty") :
    "medium"

text.focus()
    //choose element that should be focused at start

const timeInterval = setInterval(updateTime, 1000)

//get random word from our array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
        //floor will just round down
        //function to get a random word from our array
}

// console.log(getRandomWord())
//check if the function is working

//add the word to the DOM
function addWordToDOM() {
    randomeWord = getRandomWord()
        //we assign whatever random word the getRandomeWord fuction will return
        //to the variable randomWord
    word.innerHTML = randomeWord
        //using the word DOM element
        //so now the word html will become the random word
}

//update our score

function updateScore() {
    score++
    scoreEl.innerHTML = score
}

//updateTime
function updateTime() {
    // console.log(1)
    time--
    //update time element
    timeEl.innerHTML = time + "s"
        //setting the html element equal our time

    //clear interval so timer does not go below 0
    if (time === 0) {
        clearInterval(timeInterval)
            //clear the time interval
            //and we want to call for game over
        gameOver()
    }
}

//game over show end screen

function gameOver() {
    endgameEl.innerHTML = `<h1>Time ran out!</h1><p>Your final score is ${score}</p><button onClick="location.reload()">Reload</button></button>`

    endgameEl.style.display = "flex"
}

addWordToDOM()

//evetListener

text.addEventListener("input", (event) => {
    const insertedTex = event.target.value
        // console.log(insertedTex)

    //check if the inserted word is the same as the random word from our array
    if (insertedTex === randomeWord) {
        addWordToDOM()

        //update the score
        updateScore()

        //clear input field
        event.target.value = ""

        //incrment the time to give the user more time when the input is correct
        time += 5
            //for easy
        if (difficulty === "hard") {
            time += 2
        } else if (difficulty === "medium") {
            time += 3
        } else {
            time += 5
        }
        updateTime()
    }
})

//settings button click

settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"))

//sittings select
settingsForm.addEventListener("change", (event) => {
    difficulty = event.target.value
        //set the difficulty to whatever is selected in the list

    // console.log(difficulty)

    //we need to set the value that was chosen in localstorage
    localStorage.setItem("difficulty", difficulty)
})