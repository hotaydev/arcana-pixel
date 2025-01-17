(() => {
  const buttons = document.querySelectorAll('main.pricing .plans .plan .final button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      scrollToCTA();
    });
  });
})()