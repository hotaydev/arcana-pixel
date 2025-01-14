
let alreadySending = false;

const interval = setInterval(() => {
  if (document.querySelector(".email-input button")) {
    clearInterval(interval);
    registerButtonClick();
  }
}, 200);

function registerButtonClick() {
  const submitButton = document.querySelector(".email-input button");

  submitButton.addEventListener("click", async () => {
    if (alreadySending) return;

    const email = document.querySelector(".email-input input[type='email']").value.trim();

    if (!validateEmail(email)) {
      setToastMessage("Por favor, insira um e-mail válido.", "error");
      return;
    }

    alreadySending = true;
    submitButton.textContent = "Enviando...";

    try {
      const response = await fetch("https://n8n.hotay.dev/webhook/arcanapixel-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setToastMessage("Algo do nosso lado deu errado. Por favor, tente novamente mais tarde.", "error");
      }

      setToastMessage("Pronto! Assim que tivermos novidades você ficará sabendo :)", "success");
      emailInput.value = "";
    } catch (error) {
      console.error("Erro:", error);
      setToastMessage("Algo do nosso lado deu errado. Por favor, tente novamente mais tarde.", "error");
    }

    alreadySending = false;
    submitButton.textContent = "Receber Atualizacões!";
  });
}

function setToastMessage(message, type) {
  const toast = document.querySelector("#message-toast");
  if (!toast) return;

  toast.innerHTML = `<p>${message}</p>`;
  toast.classList.remove("d-none");
  toast.classList.add(type);

  setTimeout(() => {
    toast.classList.add("d-none");
    toast.classList.remove(type);
  }, 4000);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}