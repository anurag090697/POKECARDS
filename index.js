let cardsDiv = document.getElementById("cardsDiv");
let detailedInfo;
let typeSelect = document.getElementById("typeSelect");
let buttonFilter = document.getElementById("filterPoke");
let buttonReset = document.getElementById("resetPoke");
let searchPoke = document.getElementById("inputPoke");
let pokeList = [];

let limit = 20;
let offset = 0;
let buttonloadMore = document.getElementById("loadMore");
let pokeUrl =
  "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset;
async function getData(pokeUrl) {
  try {
    let firstStep = await fetch(pokeUrl);
    let secondStep = await firstStep.json();
    // console.log(secondStep);

    secondStep.results.forEach(async (pokemon) => {
      cardsDiv.innerHTML = "";

      const loader = document.querySelector(".loader-wrapper");
      setTimeout(function () {
        loader.style.display = "none";
      }, 2000);

      let url = pokemon.url;
      const response = await fetch(url);
      let detailedInfo = await response.json();
      console.log(detailedInfo);
      let cardCover = document.createElement("div");
      cardCover.classList.add("flip-card");

      let pokeCard = document.createElement("div");
      pokeCard.classList.add("flip-card-inner", "w-full", "h-full");

      let cardFront = document.createElement("div");
      cardFront.classList.add("flip-card-front");
      let num = document.createElement("h2");
      num.innerText = "#" + detailedInfo.id;

      let pokePic = document.createElement("img");
      pokePic.src = detailedInfo.sprites.other.dream_world.front_default;

      let pokeName = document.createElement("h1");
      pokeName.innerText = pokemon.name;

      let pokeType = document.createElement("p");
      pokeType.innerText = detailedInfo.types[0].type.name; //+ " , " + detailedInfo.types[1].type.name;

      cardFront.append(num);
      cardFront.append(pokePic);
      cardFront.append(pokeName);
      cardFront.append(pokeType);
      pokeCard.append(cardFront);

      let cardBack = document.createElement("div");
      cardBack.classList.add("flip-card-back");

      let pokeWeight = document.createElement("p");
      pokeWeight.innerText = "WEIGHT: " + detailedInfo.weight + "kg";

      let pokeHEight = document.createElement("p");
      pokeHEight.innerHTML =
        "HEIGHT: " + parseInt(detailedInfo.height) / 10 + "meters";

      let pokeStats = document.createElement("p");
      let str = "";
      detailedInfo.stats.forEach((stat) => {
        str += stat.stat.name + ": " + stat.base_stat + "\n";
      });

      pokeStats.innerText = str;

      cardBack.append(pokeHEight);
      cardBack.append(pokeWeight);
      cardBack.append(pokeStats);

      pokeCard.append(cardFront);
      pokeCard.append(cardBack);

      cardCover.classList.add("m-6", "w-80");
      cardFront.classList.add(
        "flex",
        "items-center",
        "flex-col",
        "rounded-xl",
        "p-5",
        "gap-y-5"
      );
      cardBack.classList.add(
        "flex",
        "items-center",
        "flex-col",
        "rounded-xl",
        "p-5",
        "gap-y-5"
      );

      cardCover.append(pokeCard);
      cardsDiv.append(cardCover);
      // displayPokemons(detailedInfo);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// function displayPokemons(detailedInfo) {

// }
buttonloadMore.addEventListener("click", async () => {
  offset += limit;
  await getData(pokeUrl);
});

buttonReset.addEventListener("click", async () => {
  pokeUrl = "https://pokeapi.co/api/v2/pokemon";
  await getData(pokeUrl);
});

getData(pokeUrl);
