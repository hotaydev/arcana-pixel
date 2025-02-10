import DiceBox from "/assets/js/dice-box/dice-box.es.min.js";

document.querySelector(".d4").addEventListener("click", async () => {
  await rollDice("1d4");
});
document.querySelector(".d6").addEventListener("click", async () => {
  await rollDice("1d6");
});
document.querySelector(".d8").addEventListener("click", async () => {
  await rollDice("1d8");
});
document.querySelector(".d10").addEventListener("click", async () => {
  await rollDice("1d10");
});
document.querySelector(".d12").addEventListener("click", async () => {
  await rollDice("1d12");
});
document.querySelector(".d20").addEventListener("click", async () => {
  await rollDice("1d20");
});

async function rollDice(value) {
  document.querySelectorAll("canvas").forEach(canvas => canvas.remove());

  let color;
  switch (value) {
    case "1d4":
      color = "#fc885b";
      break;
    case "1d6":
      color = "#ca279e";
      break;
    case "1d8":
      color = "#fb6e5c";
      break;
    case "1d10":
      color = "#fe8a54";
      break;
    case "1d12":
      color = "#22c587";
      break;
    case "1d20":
      color = "#5e129d";
      break;
  }

  const sizeScaleFactorForMobile = window.screen.width <= 1050 ? 0.75 : 1;

  const Box = new DiceBox(".dice-area", {
    assetPath: "/assets/dice-box/",
    gravity: 1,
    container: document.querySelector(".dice-area"),
    mass: 1,
    friction: 0.8,
    restitution: 0.3,
    angularDamping: 0.1,
    linearDamping: 0.4,
    spinForce: 7,
    throwForce: 6,
    startingHeight: 12,
    settleTimeout: 5000,
    lightIntensity: 2,
    theme: 'default',
    themeColor: color,
    scale: (value == "1d6" ? 5 : 6) * sizeScaleFactorForMobile,
    onRollComplete: (result) => {
      if (result[0].value === result[0].sides) {
        success();
      } else {
        setTimeout(() => {
          Box.remove({ groupId: 0, rollId: 0 });
        }, 2 * 1000);
      }
    }
  });

  await Box.init();

  Box.roll(value);
}

function success() {
  var duration = 8 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, disableForReducedMotion: true };
  const currentCanvas = document.querySelectorAll("canvas");

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  var confettiInterval = setInterval(() => {
    var timeLeft = animationEnd - Date.now();

    var particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);

  setTimeout(() => {
    clearInterval(confettiInterval);
    currentCanvas.forEach(canvas => canvas.remove());
  }, duration);
}