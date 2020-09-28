const text = 'Hi! My name is Sergey. You are now in my personal universe, each planet means some part of my life. Explore them! :)';
const textElem = document.querySelector('.hello-text');
const closeHelloButton = document.querySelector('.close-hello');
const hello = document.querySelector('.hello');
const planet = document.querySelector('.planet-one');
const planetTwo = document.querySelector('.planet-two');
const ghPlanet = document.querySelector('.planet-three');

function writeText(text){
  if (text.length > 0) {
    textElem.textContent = textElem.textContent + text[0];
    setTimeout(()=>{
      writeText(text.slice(1));
    }, 50);

  }

}

writeText(text)

closeHelloButton.addEventListener('click', ()=>{
   hello.classList.add('fadeout');
   setTimeout(()=>{
     hello.classList.add('hidden');
     hello.classList.remove('fadeout');
   }, 2000)
});


/*
let isPaused = false;
function movePlanet(alpha, time) {
  let phi = 0;
  setInterval(()=>{
    let x = 14*Math.cos(phi)*-20;
    let y = 5*Math.sin(phi)*15;
    let x2 = x*Math.cos(alpha) + y*Math.sin(alpha) + 280;
    let y2 = -x*Math.sin(alpha) + y*Math.cos(alpha) + 40;
    planet.style = `transform: scaleY(3) translate(${x2}px, ${y2}px)`;
    if (!isPaused) phi += 0.005;


  }, time);
}

movePlanet(25.1, 100);
planet.addEventListener('mouseover', ()=>{
  isPaused = true;
});

planet.addEventListener('mouseout', ()=>{
  isPaused = false;
})
*/

const divs = document.querySelectorAll('div');
class Planet {
  constructor(alpha, time, planet, lengthX, lengthY, shiftX, shiftY) {
    this.phi = 0;
    this.isPaused = false;
    this.alpha = alpha;
    this.time = time;
    this.planet = planet;
    this.lengthX = lengthX;
    this.lengthY = lengthY;
    this.shiftX = shiftX;
    this.shiftY = shiftY;
    this.completeTurn = 6.3;
    this.stopped = false;
    this._setEventListeners();
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

      /*divs.forEach((item)=>{
        if (item !== currentOrbit && item !== currentPlanet) {
          item.style.display = 'none';
        }
      })*/
      //window.open(this.planet.getAttribute('data-click-target'))
    })

  }

}

const earth = new Planet(25.15, 10, planet, -23.5, 16.5, 270, 30);
const moon = new Planet(25.14, 5, planetTwo, -40.3, 34, 465, 62);
const gh = new Planet(25.14, 20, ghPlanet, -56, 51.1, 675, 92.9);

earth.movePlanet();
moon.movePlanet();
gh.movePlanet();
