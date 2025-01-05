// Register the plugin
gsap.registerPlugin(ScrambleTextPlugin);

// Animate the scramble effect
gsap.to("#scramble-text", {
  scrambleText: "Welcome to my portfolio! Let's explore design, creativity, and technology.",
  duration: 3,
  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  revealDelay: 0.3,
  ease: "power2.inOut"
});
