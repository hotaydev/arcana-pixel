const mobileNavMenuIcon = document.querySelector(".nav-menu .nav-spacer");

const availableLanguages = ["en", "fr", "es", "it"];

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

  sendLanguageChangeToSamePage();
});

function sendLanguageChangeToSamePage() {
  const buttons = document.querySelectorAll("#mobile-menu .language-change a");
  if (!buttons) return;

  const currentPath = window.location.pathname;

  buttons.forEach(button => {
    const langBase = button.getAttribute("href"); // e.g., "/en", "/fr", "/"
    if (langBase === null) return;

    const pathSegments = currentPath.split("/").filter(Boolean);
    let newPath;

    if (!availableLanguages.includes(pathSegments[0])) {
      newPath = currentPath;
    } else {
      newPath = `/${pathSegments.slice(1).join("/")}`;
    }

    const updatedHref = langBase === "/" ? newPath : `${langBase}${newPath}`;
    button.setAttribute("href", updatedHref.replace("//", "/"));
  });
}
