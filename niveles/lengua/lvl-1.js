const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameStarted = false;
let startTime;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  if (!gameStarted) {
    gameStarted = true;
    startTime = new Date(); // Registra el tiempo cuando comienza el juego
  }

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();

  // Comprueba si todas las cartas están volteadas
  if (document.querySelectorAll(".flip").length === cards.length) {
    const endTime = new Date(); // Tiempo en el que el juego ha sido completado
    const timeDiff = endTime - startTime; // Calcula la diferencia de tiempo
    const seconds = Math.floor(timeDiff / 1000); // Convierte el tiempo a segundos
    alert(`¡Felicidades! Has completado el juego en ${seconds} segundos.`);
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000); // Cambiado a 1 segundo (1000 milisegundos)
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 16); // Para 4x4
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
