const scene = document.querySelector('#scene');
const controls = document.querySelector('.controls');
const buttons = document.querySelectorAll('.controls button');
const particles = document.querySelector('#particles');
const absorbedArt = document.querySelector('.absorbed-art');
const colors = { water:'#52ddff', fire:'#ff9b35', earth:'#c8df63', air:'#e5fbff' };
const elementImages = {
  water:'images/agua.png',
  fire:'images/fogo.png',
  earth:'images/terra.png',
  air:'images/ar.png'
};

function activate(element) {
  scene.className = `scene ${element || ''}`;
  document.documentElement.style.setProperty('--glow', colors[element] || '#dffaff');
  buttons.forEach(button => button.classList.toggle('active', button.dataset.element === element));
  absorbedArt.src = elementImages[element] || '';
  absorbedArt.alt = element ? `Energia de ${element} absorvida` : '';
}

buttons.forEach(button => {
  button.addEventListener('pointerenter', () => activate(button.dataset.element));
  button.addEventListener('focus', () => activate(button.dataset.element));
  button.addEventListener('click', () => activate(button.dataset.element));
});
controls.addEventListener('pointerleave', () => activate(''));

for (let index = 0; index < 48; index++) {
  const particle = document.createElement('i');
  particle.className = 'particle';
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${58 + Math.random() * 45}%`;
  particle.style.setProperty('--drift', `${(Math.random() - .5) * 240}px`);
  particle.style.setProperty('--time', `${3 + Math.random() * 5}s`);
  particle.style.setProperty('--delay', `${-Math.random() * 6}s`);
  particles.append(particle);
}
