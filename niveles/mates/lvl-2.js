document.addEventListener("DOMContentLoaded", function () {
  const castanas = document.querySelectorAll(".castana");
  const cestas = document.querySelectorAll(".cesta");

  // Función para establecer el fondo y el tamaño de las castañas
  function setCastanaAttributes(castana, size) {
    castana.classList.add(size);
    castana.dataset.type = size;
    castana.style.backgroundImage = "url('../../img/castaña.png')";
  }

  // Iterar sobre cada castaña para establecer su fondo y tamaño
  castanas.forEach(function (castana) {
    const sizes = ["small", "medium", "large"];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    setCastanaAttributes(castana, randomSize);

    castana.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", this.dataset.type);
    });
  });

  // Establecer la funcionalidad de arrastrar y soltar para las cestas
  cestas.forEach(function (cesta) {
    cesta.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    cesta.addEventListener("drop", function (e) {
      e.preventDefault();
      const dataType = e.dataTransfer.getData("text/plain");
      const cestasize = this.dataset.type;
      const castana = document.querySelector(
        `.castana.${dataType}:not(.in-cesta)`
      );
      if (dataType === cestasize && castana) {
        castana.classList.add("in-cesta");
        const castanasEnCesta = this.querySelectorAll(".castana");
        if (castanasEnCesta.length > 0) {
          const lastCastana = castanasEnCesta[castanasEnCesta.length - 1];
          lastCastana.parentNode.insertBefore(castana, lastCastana.nextSibling);
        } else {
          this.appendChild(castana);
        }
        // Verificar si se deben mostrar el acertijo
        verificarMostrarAcertijo();
      }
    });
  });

  // Ocultar el contenedor del acertijo al cargar la página
  document.getElementById("acertijo").style.display = "none";

  // Función para verificar si se debe mostrar el acertijo
  function verificarMostrarAcertijo() {
    const castanasContainer = document.querySelector(".castanas-container");
    const acertijoContainer = document.getElementById("acertijo");
    const castanas = castanasContainer.querySelectorAll(".castana");

    if (castanas.length === 0) {
      acertijoContainer.style.display = "block";
      generarAcertijo(); // Llamar a generarAcertijo cuando se muestre el acertijo
    } else {
      acertijoContainer.style.display = "none";
    }
  }

  // Función para generar el acertijo
  function generarAcertijo() {
    // Generar números aleatorios
    var castañasRecogidas = Math.floor(Math.random() * 10) + 1;
    var castañasPerdidas = Math.floor(Math.random() * 8) + 1;
    var castañasRecibidas = Math.floor(Math.random() * 5) + 1;

    // Construir el acertijo
    var acertijo =
      "La castañera recogió " +
      castañasRecogidas +
      " castañas. De camino, perdió " +
      castañasPerdidas +
      " castañas, pero volviendo a casa la vecina le dio " +
      castañasRecibidas +
      " castañas.";

    // Insertar el acertijo en el elemento HTML
    document.getElementById("acertijo-text").textContent = acertijo;

    // Guardar el resultado esperado en un atributo data del elemento acertijo
    var resultadoEsperado =
      castañasRecogidas - castañasPerdidas + castañasRecibidas;
    document
      .getElementById("acertijo")
      .setAttribute("data-resultado-esperado", resultadoEsperado);
  }
  // Llamar a la función para generar el acertijo cuando se cargue la página
  window.onload = function () {
    generarAcertijo();
  };

  // Obtener referencias a los elementos relevantes
  const respuestaInput = document.getElementById("respuesta-input");
  const verificarBtn = document.getElementById("verificar-btn");
  const resultadoText = document.getElementById("resultado");

  // Función para comparar el resultado del acertijo con el valor introducido
  function verificarResultado() {
    const resultadoEsperado = parseInt(
      document
        .getElementById("acertijo")
        .getAttribute("data-resultado-esperado")
    );
    const respuestaUsuario = parseInt(respuestaInput.value);

    if (respuestaUsuario === resultadoEsperado) {
      // Si el resultado coincide, felicitar al jugador
      resultadoText.textContent =
        "¡Felicidades! Has resuelto el acertijo correctamente.";
    } else {
      // Si el resultado no coincide, pedir que lo vuelva a intentar
      resultadoText.textContent =
        "Lo siento, el resultado es incorrecto. Por favor, inténtalo de nuevo.";
    }
  }

  // Agregar evento click al botón de verificar
  verificarBtn.addEventListener("click", function () {
    verificarResultado();
  });
});
