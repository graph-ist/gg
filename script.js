const canvas = document.getElementById("rippleCanvas");
const ctx = canvas.getContext("2d");

// Imposta le dimensioni del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ripples = [];

// Funzione per creare un'onda
function createRipple(x, y) {
  ripples.push({
    x: x,
    y: y,
    radius: 0,
    opacity: 1,
  });
}

// Disegna e aggiorna le onde
function drawRipples() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`; // Bianco con opacità decrescente
    ctx.lineWidth = 2;
    ctx.stroke();

    // Aggiorna proprietà dell'onda
    ripple.radius += 2; // L'onda si espande
    ripple.opacity -= 0.02; // L'onda si dissolve

    // Rimuovi l'onda quando diventa invisibile
    if (ripple.opacity <= 0) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(drawRipples);
}

// Aggiungi interazione per touch e click
canvas.addEventListener("click", (e) => {
  createRipple(e.clientX, e.clientY);
});

canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  createRipple(touch.clientX, touch.clientY);
});

// Gestisci il ridimensionamento della finestra
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Avvia l'animazione
drawRipples();