let cards;

const intervalTabChanger = setInterval(() => {
  if (document.querySelector(".tab-chooser #player")) {
    clearInterval(intervalTabChanger);
    registerTabChangeClick();
  }
}, 200);

function registerTabChangeClick() {
  const playerButton = document.querySelector(".tab-chooser #player");
  const masterButton = document.querySelector(".tab-chooser #master");

  cards = document.querySelectorAll(".cards .card");

  playerButton.addEventListener("change", onTabChecked);
  masterButton.addEventListener("change", onTabChecked);
}

function onTabChecked(event) {
  if (!event.target.checked) return;

  if (event.target.id === "player") {
    toggleCardVisibility("player");
  }
  else if (event.target.id === "master") {
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
