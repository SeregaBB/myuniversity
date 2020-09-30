const defaultSettings  ={
  'border-radius': '1000px',
background: 'white',
position: 'absolute',
filter: 'drop-shadow(0 0 5px #b3d4fc)'
}

const container = document.querySelector('.space');

const minPosition = 0;
const maxPosition = 100;

const minWH = 0;
const maxWH = 5;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум не включается, минимум включается
}


for (let i = 0; i < 300; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  for (let prop in defaultSettings) {
    star.style[prop] = defaultSettings[prop];
  }

  star.style.top = getRandomInt(minPosition,maxPosition) + '%';
  star.style.left = getRandomInt(minPosition,maxPosition) + '%';

  const wh  = getRandomInt(minWH,maxWH) + 'px'

  star.style.width = wh;
  star.style.height = wh;
  star.style['animation-delay'] = `${getRandomArbitrary(0,2)}s`;
  star.style['animation-duration'] = `${getRandomInt(1,5)}s`;
  container.appendChild(star);
}
