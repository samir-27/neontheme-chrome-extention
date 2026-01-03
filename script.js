
document.getElementById('searchForm').addEventListener('submit', function(e){
  if(!document.querySelector('.search-box').value) e.preventDefault();
});


const particlesContainer = document.querySelector('.particles');

for (let i = 0; i < 50; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = Math.random() * 100 + 'vw'; // random horizontal
  const size = 5 + Math.random() * 10;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  
  const duration = 5 + Math.random() * 10;
  particle.style.animationDuration = duration + 's';
  
  // stagger start
  const delay = Math.random() * 10;
  particle.style.animationDelay = delay + 's';
  
  // random start Y position slightly below the screen
  particle.style.transform = `translateY(${100 + Math.random() * 20}vh)`;
  
  particlesContainer.appendChild(particle);
}
