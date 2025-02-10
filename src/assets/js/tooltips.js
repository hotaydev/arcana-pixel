const intervalTooltipRegister = setInterval(() => {
  if (document.querySelector("footer") && document.querySelector("#universes")) {
    clearInterval(intervalTooltipRegister);
    registerTooltips();
  }
}, 200);

function registerTooltips() {
  const tooltip = document.getElementById("tooltip");

  document.querySelectorAll('[data-tooltip]').forEach(element => {
    const isInverted = element.getAttribute("data-tooltip-inverted") === "true";
    const content = element.getAttribute("data-tooltip");

    element.addEventListener("mouseenter", (event) => {
      tooltip.textContent = element.getAttribute("data-tooltip");
      tooltip.style.display = "block";
      tooltip.style.left = (event.pageX + (isInverted ? -(content.length * 8) : 5)) + "px";
      tooltip.style.top = (event.pageY - 20) + "px";
    });

    element.addEventListener("mousemove", (event) => {
      tooltip.style.left = (event.pageX + (isInverted ? -(content.length * 8) : 5)) + "px";
      tooltip.style.top = (event.pageY - 20) + "px";
    });

    element.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });

  });
}
