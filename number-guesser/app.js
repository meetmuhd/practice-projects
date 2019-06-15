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
    // Game over - won
    gameOver(true, `${guessInput.value} is correct. YOU WON!`);
  } else {
    // Wrong guess
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Game over. Correct number was ${winningNum}. Goodluck next time!`);

    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = "orange";

      // Give guess again feedback
      giveFeedback(`${guess} is incorrect. ${guessesLeft} guesses remaining.`, "orange");

      // Clear guess input
      guessInput.value = "";
    }
  }
});

// Game over function to handle both win & lose cases
function gameOver(won, msg) {
  let color;
  won === true ? color = "green" : color = "red";

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Give feedback
  giveFeedback(msg, color);
  // Set text color
  feedback.style.color = color;

}

// Give Feedback
function giveFeedback(msg, color) {
  feedback.textContent = msg;
  feedback.style.color = color;
}