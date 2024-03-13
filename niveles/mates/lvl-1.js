document.addEventListener("DOMContentLoaded", function () {
  const fallButton = document.getElementById("fallButton");
  const checkButton = document.getElementById("checkButton");

  fallButton.addEventListener("click", function () {
    const chestnuts = document.querySelectorAll(".chestnut");
    const numChestnuts = chestnuts.length;

    // Seleccionar un número aleatorio de castañas para caer
    const numChestnutsToFall = getRandomInt(1, numChestnuts);
    const chestnutsIndexes = getRandomIndexes(numChestnuts, numChestnutsToFall);

    // Reiniciar la posición de las castañas que han caído previamente
    chestnuts.forEach((chestnut) => {
      if (chestnut.classList.contains("fallen")) {
        resetPosition(chestnut);
      }
    });

    // Hacer caer las castañas seleccionadas
    chestnuts.forEach((chestnut, index) => {
      if (chestnutsIndexes.includes(index)) {
        animateFall(chestnut);
      }
    });
  });

  checkButton.addEventListener("click", function () {
    const guessedNumber = parseInt(document.getElementById("guess").value);

    if (!isNaN(guessedNumber)) {
      const numChestnutsToFall = document.querySelectorAll(".fallen").length;
      if (guessedNumber === numChestnutsToFall) {
        showMessage(
          "¡Felicidades! Has acertado el número de castañas que han caído."
        );
      } else {
        showMessage(
          "Más suerte la próxima vez. El número correcto de castañas era: " +
            numChestnutsToFall
        );
      }
    } else {
      showMessage("Por favor, introduce un número válido.");
    }
  });

  function animateFall(chestnut) {
    // Obtener la posición inicial de la castaña
    const initialY = chestnut.offsetTop;

    // Obtener la altura del árbol
    const treeHeight = document.getElementById("tree").offsetHeight;

    // Calcular la distancia a la que debe caer la castaña (hasta el suelo)
    const fallDistance = treeHeight - initialY - 20; // Ajustar la posición final

    // Aplicar la animación
    chestnut.style.transition = "transform 2s linear";
    chestnut.style.transform = `translateY(${fallDistance}px)`;

    // Marcar la castaña como caída
    chestnut.classList.add("fallen");

    // Cuando la animación termine, detenerla y dejar la castaña en la posición final
    chestnut.addEventListener("transitionend", function () {
      chestnut.style.transition = ""; // Eliminar la transición
      chestnut.style.transform = `translateY(${fallDistance}px)`; // Mantener la castañas en la posición final
    });

    // Mostrar el botón de comprobación después de hacer caer las castañas
    checkButton.style.display = "block";
  }

  function resetPosition(chestnut) {
    chestnut.style.transition = "transform 0s"; // Eliminar la transición
    chestnut.style.transform = "translateY(0)"; // Volver a la posición original
    chestnut.classList.remove("fallen"); // Quitar la clase de caída
  }

  function showMessage(message) {
    clearMessages(); // Limpiar mensajes anteriores
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    document.getElementById("messageContainer").appendChild(messageElement);
  }

  function clearMessages() {
    const messageContainer = document.getElementById("messageContainer");
    while (messageContainer.firstChild) {
      messageContainer.removeChild(messageContainer.firstChild);
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomIndexes(length, count) {
    const indexes = Array.from({ length: length }, (_, i) => i);
    indexes.sort(() => Math.random() - 0.5);
    return indexes.slice(0, count);
  }
});
