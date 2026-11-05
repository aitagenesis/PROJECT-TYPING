// Grab your monster SVG and title elements from the HTML
const monster = document.querySelector('.teaser-monster');
const title = document.getElementById('teaser-title');

let idleTimer;

// Function to trigger the "too slow" laughing-with-tears mode
function triggerSlowMode() {
  monster.classList.add('too-slow');
  title.textContent = "TOO SLOW! HAHAHA!";
}

// Listen for when a key is pressed down on the keyboard
document.addEventListener('keydown', (event) => {
  // Clear the slow timer whenever a key is hit
  clearTimeout(idleTimer);
  monster.classList.remove('too-slow');
  
  // Add the 'pressed' CSS class to squash the monster
  monster.classList.add('pressed');
  
  // Update the title text to show what key they pressed
  title.textContent = `TYPED: ${event.key.toUpperCase()}`;

  // If the user stops typing for 2 seconds, trigger slow/laugh mode
  idleTimer = setTimeout(triggerSlowMode, 2000);
});

// Listen for when the key is released
document.addEventListener('keyup', () => {
  // Remove the 'pressed' class so the monster goes back to bouncing
  monster.classList.remove('pressed');
});

// Random blinking effect every 4 seconds
setInterval(() => {
  monster.classList.add('blinking');
  setTimeout(() => {
    monster.classList.remove('blinking');
  }, 150);
}, 4000);