import DiceBox from "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/dice-box.es.min.js";

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

  console.log(value, color);

  const Box = new DiceBox(".dice-area", {
    assetPath: "/assets/dice-box/",
    gravity: 1,
    container: document.querySelector(".dice-area"),
    mass: 1,
    friction: 0.8,
    restitution: 0,
    angularDamping: 0.4,
    linearDamping: 0.4,
    spinForce: 4,
    throwForce: 5,
    startingHeight: 8,
    settleTimeout: 5000,
    lightIntensity: 1,
    theme: 'default',
    themeColor: color,
    scale: value == "1d6" ? 5 : 6,
    onRollComplete: (result) => {
      console.log(result);

      if (result[0].value === result[0].sides) {
        success();
      }
    }
  });

  await Box.init();

  Box.roll(value);
}

function success() {
  var duration = 8 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  var confettiInterval = setInterval(() => {
    var timeLeft = animationEnd - Date.now();

    var particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);

  setTimeout(() => {
    clearInterval(confettiInterval);
    document.querySelectorAll("canvas").forEach(canvas => canvas.remove());
  }, duration);
}