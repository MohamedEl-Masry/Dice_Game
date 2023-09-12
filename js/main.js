let btnNewGame = document.getElementById("newGame");
let roll = document.getElementById("roll");
let hold = document.getElementById("hold");
let score0El = document.getElementById("score0");
let score1El = document.getElementById("score1");
let player0 = document.querySelector(".player0");
let player1 = document.querySelector(".player1");
let nCurrent0 = document.querySelector(".nCurrent0");
let nCurrent1 = document.querySelector(".nCurrent1");
let diceClass = document.querySelectorAll(".dice");
let mmyModal = new bootstrap.Modal(document.getElementById("myModal"), {
  keyboard: false,
});

let currentScore, activePlayer, scores;

currentScore = 0;
activePlayer = 0;
scores = [0, 0];

roll.addEventListener("click", function () {
  rollDice();
});

hold.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score${activePlayer}`).textContent =
    scores[activePlayer];
  holdPlayer();
});

let rollDice = function () {
  let nDice = Math.trunc(Math.random() * 6) + 1;

  let dice = document.querySelector(`.dice-${nDice}`);

  diceClass.forEach((d) => d.classList.add("hidden"));

  dice.classList.remove("hidden");

  if (nDice !== 1) {
    currentScore += nDice;
    document.getElementById(`nCurrent${activePlayer}`).textContent =
      currentScore;
  } else {
    holdPlayer();
  }
};
const holdPlayer = function () {
  if (scores[activePlayer] >= 50) {
    winner(activePlayer);
  }

  document.getElementById(`nCurrent${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle("active");
  player1.classList.toggle("active");
};
let winner = function (param) {
  document.querySelector(".winner-player").innerHTML = `Player ${
    param + 1
  } has won`;
  mmyModal.show();
};
let restart = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  nCurrent0 = 0;
  nCurrent1 = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceClass.forEach((d) => d.classList.add("hidden"));
  mmyModal.hide();
};

btnNewGame.addEventListener("click", restart);
