const buttons = document.querySelectorAll('[data-element]');
const orb = document.querySelector('.element-orb');
const particles = orb.querySelector('.orb-particles');
for (let index = 0; index < 18; index++) {
  const particle = document.createElement('span');
  particle.className = 'orb-particle';
  particle.style.setProperty('--angle', `${index * 20}deg`);
  particle.style.setProperty('--radius', `${155 + (index % 4) * 9}px`);
  particle.style.setProperty('--duration', `${12 + (index % 5) * 3}s`);
  particle.style.setProperty('--delay', `${-index * 1.7}s`);
  particles.appendChild(particle);
}
orb.addEventListener('animationend', event => {
  if (event.animationName === 'illustrated-change') orb.classList.remove('transforming');
});
buttons.forEach(button => button.addEventListener('click', () => {
  const element = button.dataset.element;
  orb.classList.remove('transforming');
  void orb.offsetWidth;
  orb.classList.add('transforming');
  buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  orb.dataset.form = element;
  orb.setAttribute('aria-label', `Orbe de ${button.getAttribute('aria-label').toLowerCase()}`);
  document.getElementById('orb-status').textContent = `Orbe transformado em ${button.getAttribute('aria-label').toLowerCase()}.`;
}));

