class MyComponent extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute('src');
    if (src) {
      fetch(src)
        .then(response => response.text())
        .then(html => {
          this.innerHTML = html;
          addEventListenerToPlayButtons();
        })
        .catch(err => console.error(`Failed to load ${src}:`, err));
    }
  }
}

customElements.define('arcana-component', MyComponent);

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