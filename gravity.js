const canvas = document.getElementById("gravityCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticles(x, y) {
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: x,
      y: y,
      size: Math.random() * 10 + 5,
      speedX: (Math.random() - 0.5) * 5,
      speedY: (Math.random() - 0.5) * 5,
      color: `hsl(${Math.random() * 360}, 50%, 50%)`,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.size *= 0.96; // Slowly shrink particles

    if (particle.size < 0.5) {
      particles.splice(index, 1);
    } else {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    }
  });
}

function animate() {
  drawParticles();
  requestAnimationFrame(animate);
}

animate();

// Add interaction for desktop (mouse move)
canvas.addEventListener("mousemove", (e) => {
  createParticles(e.clientX, e.clientY);
});

// Add interaction for mobile (touch)
canvas.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  createParticles(touch.clientX, touch.clientY);
});

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});