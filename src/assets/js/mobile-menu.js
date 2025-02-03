const mobileNavMenuIcon = document.querySelector(".nav-menu .nav-spacer");

mobileNavMenuIcon.addEventListener("click", () => {
  const overlay = document.querySelector(".overlay");
  const menu = document.querySelector("#mobile-menu");
  const menuItems = document.querySelectorAll("#mobile-menu .item");
  const closeIcon = document.querySelector("#mobile-menu .content .close");

  overlay.style.display = "flex";
  menu.style.display = "flex";

  const closeMenu = () => {
    overlay.style.display = "none";
    menu.style.display = "none";
  };

  overlay.addEventListener("click", closeMenu);
  closeIcon.addEventListener("click", closeMenu);
  menuItems.forEach(item => item.addEventListener("click", closeMenu));
});