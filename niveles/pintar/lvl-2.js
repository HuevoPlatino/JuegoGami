js: document.addEventListener("DOMContentLoaded", function () {
  const puzzleContainer = document.getElementById("puzzleContainer");
  const pieces = document.querySelectorAll(".piece");

  function shufflePieces() {
    const indices = Array.from({ length: 9 }, (_, i) => i + 1);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    pieces.forEach((piece, index) => {
      piece.style.order = indices[index];
    });
  }

  function swapPieces(piece1, piece2) {
    const tempOrder = piece1.style.order;
    piece1.style.order = piece2.style.order;
    piece2.style.order = tempOrder;
  }

  pieces.forEach((piece) => {
    piece.addEventListener("dragstart", dragStart);
    piece.addEventListener("dragover", dragOver);
    piece.addEventListener("drop", drop);
  });

  let draggedPiece = null;

  function dragStart(event) {
    draggedPiece = event.target;
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();
    const droppedPiece = event.target;

    swapPieces(draggedPiece, droppedPiece);

    draggedPiece = null;
  }

  shufflePieces();
});
