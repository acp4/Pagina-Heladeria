
const jsConfetti = new JSConfetti();

// Define la función confetti
const confetti = async () => {
  try {
    await jsConfetti.addConfetti({
      emojis: ['🍧', '🍦', '🍨'],
      emojiSize: 50,
      confettiNumber: 50,
    });
  } catch (error) {
    console.error(error);
  }
};

function envioForma() {
  confetti();
  setTimeout(() => { window.location.href = "../../index.html" }, 2000);
}

const botonEnviar = document.getElementById('boton-enviar-contacto');
botonEnviar.onclick = envioForma;