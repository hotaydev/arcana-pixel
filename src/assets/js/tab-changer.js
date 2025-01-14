let cards;

const intervalTabChanger = setInterval(() => {
  if (document.querySelector(".tab-chooser #jogador")) {
    clearInterval(intervalTabChanger);
    registerButtonClick();
  }
}, 200);

function registerButtonClick() {
  const playerButton = document.querySelector(".tab-chooser #jogador");
  const masterButton = document.querySelector(".tab-chooser #mestre");

  cards = document.querySelectorAll(".cards .card");

  playerButton.addEventListener("change", onTabChecked);
  masterButton.addEventListener("change", onTabChecked);
}

function onTabChecked(event) {
  if (!event.target.checked) return;

  if (event.target.id === "jogador") {
    toggleCardVisibility("player");
  }
  else if (event.target.id === "mestre") {
    toggleCardVisibility("master");
  }
}

function toggleCardVisibility(contains) {
  cards.forEach(card => {
    if (card.classList.contains(contains)) {
      card.classList.remove("d-none");
    }
    else {
      card.classList.add("d-none");
    }
  });
}
