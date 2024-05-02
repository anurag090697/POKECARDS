let cardsDiv = document.getElementById("cardsDiv");
let typeSelect = document.getElementById("typeSelect");
let buttonFilter = document.getElementById("filterPoke");
let buttonReset = document.getElementById("resetPoke");
let searchPoke = document.getElementById("inputPoke");

let limit = 20;
let offset = 0;
let buttonloadMore = document.getElementById("loadMore");
let totalPokemonCount;

let pokeUrl =
  "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset;

window.addEventListener("load", async () => {
  let res = await getApiData(
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset
  );
  res.results.forEach(async (pokemon) => {
    let url = pokemon.url;
    let detailedInfo = await getApiData(url);
    displayPokemons(detailedInfo);
  });
});

async function getApiData(url) {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   return data;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const loader = document.querySelector(".loader-wrapper");
    setTimeout(function () {
      loader.style.display = "none";
    }, 2000);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// creating cards
async function displayPokemons(detailedInfo) {
  // cardsDiv.innerHTML = "";

  //   const response = await fetch(url);
  //   let detailedInfo = await response.json();

  //   console.log(detailedInfo);

  let cardCover = document.createElement("div");
  cardCover.classList.add("flip-card");
  cardCover.classList.add(detailedInfo.types[0].type.name);
  let pokeCard = document.createElement("div");
  pokeCard.classList.add("flip-card-inner", "w-full", "h-full");

  let cardFront = document.createElement("div");
  cardFront.classList.add("flip-card-front");
  let num = document.createElement("h2");
  num.innerText = "#" + detailedInfo.id;

  let pokePic = document.createElement("img");
  pokePic.src = detailedInfo.sprites.other.dream_world.front_default;

  let pokeName = document.createElement("h1");
  pokeName.innerText = detailedInfo.name;

  let pokeType = document.createElement("p");
  let typestr = detailedInfo.types[0].type.name;
  if (detailedInfo.types.length > 1) {
    typestr += " , " + detailedInfo.types[1].type.name;
    // console.log(typestr);
  }

  pokeType.innerText = typestr; //+ " , " + detailedInfo.types[1].type.name;

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
  buttonloadMore.style.display = "inline-Block";

  //   totalPokemonCount = secondStep.results.length;
}

async function filterByType(type) {
  //   let url = `https://pokeapi.co/api/v2/type/${type}`;
  //   offset = 0;
  //   let data = await getApiData(url);
  //   cardsDiv.innerHTML = "";
  //   displayPokemons(data);
  offset = 300;
  limit = 150;
  const url =
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset;
  cardsDiv.innerHTML = "";

  const data = await getApiData(url);

  const pokemons = data.results.forEach(async (poke) => {
    let url = poke.url;
    let pokeInfoo = await getApiData(url);
    let typePoke1 = pokeInfoo.types[0].type.name;
    let typepoke2 = "";
    if (pokeInfoo.types.length > 1) {
      typepoke2 = pokeInfoo.types[1].type.name;
    }
    // console.log(pokeInfoo)
    if (type === typePoke1 || type === typepoke2) {
      displayPokemons(pokeInfoo);
      buttonloadMore.style.display = "none";
    }
  });
}

buttonFilter.addEventListener("click", () => {
  let typeVal = typeSelect.value;
  //   console.log("btnfilter");

  filterByType(typeVal);
});

searchPoke.addEventListener("keyup", (event) => {
  filterByInput(event.target.value);
});

async function filterByInput(searchTerm) {
  //   let url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
  //   offset = 0;
  //   let data = await getApiData(url);
  //   cardsDiv.innerHTML = "";
  //   displayPokemons(data);
  searchTerm = searchTerm.toLowerCase();
  offset = 300;
  limit = 150;
  const url =
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset;
  const data = await getApiData(url);

  cardsDiv.innerHTML = "";
  let pokemon = data.results.forEach(async (poke) => {
    let pokename = poke.name;
    if (pokename.includes(searchTerm)) {
      // displayPokemons(poke);
      //   console.log(pokename);
      let url = poke.url;
      let detailedInfo = await getApiData(url);
      displayPokemons(detailedInfo);
      buttonloadMore.style.display = "none";
    }
  });
}

buttonloadMore.addEventListener("click", async () => {
  //   console.log("loadmore");
  //   if (offset >= totalPokemonCount) {
  //     buttonloadMore.disabled = true;
  //     return;
  //   }

  offset = offset + limit;
  pokeUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  let data = await getApiData(pokeUrl);
  data.results.forEach(async (pokemon) => {
    let url = pokemon.url;
    let detailedInfo = await getApiData(url);
    displayPokemons(detailedInfo);
  });
});

buttonReset.addEventListener("click", async () => {
  //   console.log("reset");
  offset = 0;
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  let res = await getApiData(url);
  res.results.forEach(async (pokemon) => {
    let url = pokemon.url;
    let detailedInfo = await getApiData(url);
    displayPokemons(detailedInfo);
  });
});
