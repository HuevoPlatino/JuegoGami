document.addEventListener("DOMContentLoaded", function () {
  const words = document.querySelectorAll(".word");
  const images = document.querySelectorAll(".image");

  let correctMatches = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i].textContent, array[j].textContent] = [
        array[j].textContent,
        array[i].textContent,
      ];
    }
  }

  shuffle(words);

  let draggedWord = null;

  words.forEach((word) => {
    word.addEventListener("dragstart", function () {
      draggedWord = this;
    });
  });

  images.forEach((image) => {
    image.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    image.addEventListener("drop", function (event) {
      event.preventDefault();
      const word = draggedWord.textContent;
      const correctWord = this.dataset.word;

      this.appendChild(draggedWord);
      draggedWord = null;

      if (word === correctWord) {
        correctMatches++;
      }
    });
  });

  document.getElementById("checkButton").addEventListener("click", function () {
    if (correctMatches === images.length) {
      alert("¡Felicidades! Has ganado.");
    } else {
      alert("Lo siento, has perdido.");
    }
  });
});
