//hamburger menu
const btn = document.querySelector('.hamburger');
const nav = document.getElementById('main-nav');

// Open / close helpers so every trigger shares the same logic
function openMenu() {
  btn.classList.add('open');
  nav.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  btn.classList.remove('open');
  nav.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}

// Toggle when the hamburger button is clicked
btn.addEventListener('click', () => {
  if (btn.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close the menu after a nav link is tapped
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// Close when clicking/tapping outside the menu (while it's open)
document.addEventListener('click', (e) => {
  if (
    nav.classList.contains('open') &&
    !nav.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    closeMenu();
  }
});

// Close on the Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});