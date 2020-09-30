const helloText = 'Hi! My name is Sergey. You are now in my personal universe, each planet means some part of my life. Explore them! :)';
const ghText = 'Это планета Github. Вся её поверхность состоит из растений, которые по-научному называются "Repositories".  Советую срывать только самые свежие.';

const textElem = document.querySelector('.hello-text');
const closeHelloButton = document.querySelector('.close-hello');
const hello = document.querySelector('.hello');
const planet = document.querySelector('.planet-one');
const planetTwo = document.querySelector('.planet-two');
const ghPlanet = document.querySelector('.planet-three');
const overlay = document.querySelector('.overlay');

function writeText(textElem, text){
  if (text.length > 0) {
    textElem.textContent = textElem.textContent + text[0];
    setTimeout(()=>{
      writeText(textElem, text.slice(1));
    }, 50);
  }
}


closeHelloButton.addEventListener('click', ()=>{
   hello.classList.add('fadeout');
   setTimeout(()=>{
     hello.classList.add('hidden');
     hello.classList.remove('fadeout');
   }, 2000)
});



class Planet {
  constructor(planetText ,alpha, time, planet, overlay, lengthX, lengthY, shiftX, shiftY) {
    this.phi = 0;
    this.isPaused = false;
    this.alpha = alpha;
    this.time = time;
    this.planet = planet;
    this.planetText = planetText;
    this.overlay = overlay;
    this.overlayText = this.overlay.querySelector('.overlay-text');
    this.lengthX = lengthX;
    this.lengthY = lengthY;
    this.shiftX = shiftX;
    this.shiftY = shiftY;
    this.completeTurn = 6.3;
    this.stopped = false;
    this._setEventListeners();
  }

  writeText(text){
    if (text.length > 0) {
      this.overlayText.innerHTML = this.overlayText.innerHTML + text[0];
      let timer = setTimeout(()=>{
        if (this.planet.classList.contains('scaling-planet')) this.writeText(text.slice(1));
        else clearInterval(timer);
      }, 50);
    }
  }

  movePlanet() {
    setInterval(()=>{
      if(!this.stopped) {
        let coefficientX = 12.5 * Math.cos(this.phi) * this.lengthX;
        let coefficientY = 4 * Math.sin(this.phi) * this.lengthY;
        let positionX = coefficientX * Math.cos(this.alpha) + coefficientY * Math.sin(this.alpha) + this.shiftX;
        let positionY = -coefficientX * Math.sin(this.alpha) + coefficientY * Math.cos(this.alpha) + this.shiftY;
        this.planet.style = `transform: scaleY(3) translate(${positionX}px, ${positionY}px)`;
        if (!this.isPaused) this.phi += 0.005;
        if (this.phi > this.completeTurn) this.phi = 0;
      //  if (this.phi < 3) this.planet.style['z-index'] = 3;
        //if (this.phi > 3) this.planet.style['z-index'] = 1;
      }
    }, this.time);
  }
 toggleMove(){
    this.stopped = !this.stopped;
 }
  _setEventListeners = () => {
    this.planet.addEventListener('mouseover', ()=>{
      this.isPaused = true;
    });

    this.planet.addEventListener('mouseout', ()=>{
      this.isPaused = false;
    });

    this.planet.addEventListener('click', ()=>{
      this.toggleMove();
      this.planet.classList.toggle('scaling-planet');
      this.planet.closest('.orbit').classList.toggle('shifted-orbit');
      this.overlay.classList.toggle('hidden');
      const overlayTextElement = this.overlay.querySelector('.overlay-text');
      overlayTextElement.textContent = '';
      if (!this.overlay.classList.contains('hidden')) {
        setTimeout(() => {
          this.writeText(this.planetText);
        }, 1500)
      }
    })

  }

}

const earth = new Planet(helloText, 25.15, 10, planet, overlay, -23.5, 16.5, 270, 30);
const moon = new Planet('Тестовый текст, который не несёт смысла',25.14, 5, planetTwo, overlay, -40.3, 34, 465, 62);
const gh = new Planet(
  ghText,
  25.14,
  20,
  ghPlanet,
  overlay,
  -56,
  51.1,
  675,
  92.9);

earth.movePlanet();
moon.movePlanet();
gh.movePlanet();
