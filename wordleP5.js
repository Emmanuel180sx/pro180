 // Define the list of words to choose from
 const words = ['APPLE', 'BANANA', 'CHERRY', 'GRAPE', 'ORANGE'];

 // Choose a random word
 let word = words[Math.floor(Math.random() * words.length)];
 
 // Initialize the game state
 let attempts = 6;
 let guessedLetters = [];
 
 // Update the board display with the current state
 function updateBoard() {
     let board = '';
     for (let letter of word) {
         if (guessedLetters.includes(letter)) {
             board += letter;
         } else {
             board += '_';
         }
         board += ' ';
     }
     document.getElementById('board').textContent = board;
 }
 
 // Handle the form submission
 function handleGuess(event) {
     event.preventDefault();
     let guessInput = document.getElementById('guess');
     let guess = guessInput.value.toUpperCase();
     guessInput.value = '';
     if (guessedLetters.includes(guess)) {
         alert('You already guessed that letter!');
         return;
     }
     guessedLetters.push(guess);
     if (word.includes(guess)) {
         if (guessedLetters.length == new Set(word).size) {
             endGame(true);
             return;
         }
         updateBoard();
     } else {
         attempts--;
         if (attempts == 0) {
             endGame(false);
             return;
         }
     }
     updateMessage();
 }
 
 // Update the message display with the current state
 function updateMessage() {
     let message = 'You have ' + attempts + ' attempts left.';
     if (guessedLetters.length > 0) {
         message += ' Guessed letters: ' + guessedLetters.join(', ');
     }
     document.getElementById('message').textContent = message;
 }
 
 // End the game with a win or a loss
 function endGame(win) {
     if (win) {
         alert('Congratulations, you won!');
     } else {
         alert('Sorry, you lost. The word was ' + word + '.');
     }
     document.getElementById('guess').disabled = true;
     document.getElementById('submit').disabled = true;
 }
 
 // Attach the event handler to the form submission
 document.querySelector('form').addEventListener('submit', handleGuess);
 
 // Initialize the board display and the message display
 updateBoard();
 updateMessage();
 