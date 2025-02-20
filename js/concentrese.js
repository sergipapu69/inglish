document.addEventListener("DOMContentLoaded", () => {
  // Arreglo con las imágenes de las cartas
  const cardImages = [
    "../img/Mod_2/Osos_1.png", "../img/Mod_2/Osos_1.png",
    "../img/Mod_2/Osos_2.png", "../img/Mod_2/Osos_2.png",
    "../img/Mod_2/Osos_3.png", "../img/Mod_2/Osos_3.png",
    "../img/Mod_2/Osos_4.png", "../img/Mod_2/Osos_4.png",
    "../img/Mod_2/Osos_5.png", "../img/Mod_2/Osos_5.png",
    "../img/Mod_2/Osos_6.png", "../img/Mod_2/Osos_6.png"
  ];


  let regex = /(\d+)\.png$/; 

  // Randomizar el arreglo de imágenes
  cardImages.sort(() => 0.5 - Math.random());

  const gameBoard = document.getElementById("game-board");
  let selectedCards = [];
  let matchedCards = 0;

  // Crear las cartas y añadirlas al tablero
  cardImages.forEach((image, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.innerText = "?";

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.style.backgroundImage = `url(${image})`;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);  
    card.appendChild(cardInner);
    gameBoard.appendChild(card);

    // Al hacer clic en una carta, se pasa también el índice de la carta en el array
    cardInner.addEventListener("click", () => flipCard(cardInner, image, index));
  });

  function flipCard(cardInner, image, index) {
    if (cardInner.classList.contains("is-flipped") || selectedCards.length === 2) {
      return;
    }

    cardInner.classList.add("is-flipped");
    selectedCards.push({ cardInner, image, index });

    if (selectedCards.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }

  function checkForMatch() {
    const [firstCard, secondCard] = selectedCards;

    if (firstCard.image === secondCard.image) {
      // Cartas coinciden, las dejamos volteadas
      firstCard.cardInner.classList.add("matched");
      secondCard.cardInner.classList.add("matched");
      matchedCards += 2;

      // Mostrar los índices de las cartas que hacen pareja
      //console.log(`¡Pareja encontrada! Índices en el array: ${firstCard.index}, ${secondCard.index}, ${firstCard.image}, ${secondCard.image}`);

      // Ejecutar el regex para extraer el número
      let resultado = firstCard.image.match(regex);
      console.log(resultado[1]);
      mostrarBox(resultado[1]);

      // Si todas las cartas están emparejadas, el jugador gana
      if (matchedCards === cardImages.length) {
        setTimeout(() => alert("¡You win!"), 500);
      }
    } else {
      // Cartas no coinciden, las volteamos de nuevo
      firstCard.cardInner.classList.remove("is-flipped");
      secondCard.cardInner.classList.remove("is-flipped");
    }

    // Limpiar selección
    selectedCards = [];
  }
});
