let retry = 0;
const interval = setInterval(() => {
  if (window.location.hash) {
    const element = document.querySelector(window.location.hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      clearInterval(interval);
    } else {
      retry++;
      if (retry > 12) clearInterval(interval);
    }
  } else {
    clearInterval(interval);
  }
}, 100);