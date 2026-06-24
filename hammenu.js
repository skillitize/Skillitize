//hamburger menu
const btn = document.querySelector('.hamburger');
const nav = document.getElementById('main-nav');
console.log("inside ham")
btn.addEventListener('click', () => {
  console.log("invoke it ham")
  const isOpen = btn.classList.toggle('open');
  nav.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', isOpen);
});