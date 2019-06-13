/*************************************************************************
GAME RULES/FUNCTIONALITY

A. Player must guess a number between a min and a max.

B. Player is given only a certan number of guessing attempts.

C. Game is won when player guesses the number correctly within given attempts and gets a winning notification and option to play again.

D. Game is lost if player fails to guess the correct number on their last guessing attempt and gets losing notification including correct answer and option to play again.

E. Notify player of number of attempts remaining upon failed attempts before last one.
*************************************************************************/

// Game values
let min = 1,
  max = 10,
  winningNum = 2,
  guessesLeft = 3;

// UI Elements
const gameDiv = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessInput = document.querySelector("#guess-input"),
  submitBtn = document.querySelector("#submit"),
  feedback = document.querySelector(".feedback");

// Assign UI min and max numbers
minNum.textContent = min;
maxNum.textContent = max;

// Listen for user guess submission
submitBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate guessInput
  if (isNaN(guess) || guess < min || guess > max) {
    giveFeedback(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    // Disable guessInput
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = "green";
    // Give winning feedback
    giveFeedback(`${guessInput.value} is correct. YOU WON!`, "green");
  } else {

  }
});

// Give Feedback
function giveFeedback(msg, color) {
  feedback.textContent = msg;
  feedback.style.color = color;
}