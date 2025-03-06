class MyComponent extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute('src');
    if (src) {
      fetch(src)
        .then(response => {
          if (!response.url.startsWith("http://localhost:") && !response.url.startsWith("https://www.arcanapixel.com/")) {
            throw new Error('Cannot open components from external sources!');
          }

          return response.text();
        })
        .then(html => {
          this.innerHTML = html;
          addEventListenerToPlayButtons();
        })
        .catch(err => console.error('Failed to load arcana-component: ', err));
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  customElements.define('arcana-component', MyComponent);

  // Load Pixel Button Async
  let link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '/assets/css/pixel-button-colors.css'); // Load the remanescent colors. The main file need to be included using <!-- include:builder-components/pixel-button-styles-main.html -->
  document.head.appendChild(link);

  // Scroll to up
  const scrollBtn = document.querySelector(".scroll-to-up");
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 150 ? "block" : "none";
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

function scrollToCTA() {
  const element = document.querySelector('#still-in-development');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function addEventListenerToPlayButtons() {
  const buttons = document.querySelectorAll('.pixel-btn');
  if (buttons && buttons.length > 0) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        scrollToCTA();
      });
    });
  }
}
