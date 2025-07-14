window.addEventListener('load', () => {
  document.body.style.opacity = '1';

  const splashEffect = document.getElementById('splashEffect');

  // Trigger expansion shortly after load
  setTimeout(() => {
    splashEffect.classList.add('active');
  }, 50);

  // Remove active class after animation ends so it shrinks back
  setTimeout(() => {
    splashEffect.classList.remove('active');
  }, 700);

  // After 3 seconds, open another HTML file
  setTimeout(() => {
    window.location.href = 'start_paying.html';  // Change to your target page
  }, 3000);
});