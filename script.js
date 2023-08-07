const container = document.getElementById('canvas-Container');
let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

let particleArray;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 100) * (canvas.width / 100)
};

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  mouse.x = offsetX * scaleX;
  mouse.y = offsetY * scaleY;
});

class Particle {    
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);


    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

function init() {
  particleArray = [];
  let numberOfParticles = (canvas.width * canvas.height) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 5) + 1;
    let x = (Math.random() * ((container.clientWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((container.clientHeight - size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random()*5) - 2.5;
    let directionY = (Math.random()*5) - 2.5;
    let color = '#fff';
    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}


function connect(){
    let opacityValue = 1;
    for(let a = 0;a< particleArray.length;a++){
        for(let b = a;b < particleArray.length; b++){
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x)) + ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
            if (distance < (canvas.width/7)*(canvas.height/7)){
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = `rgba(65, 105, 225,${opacityValue})`;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
        let dx = mouse.x - particleArray[a].x;
        let dy = mouse.y - particleArray[a].y;
        let distanceToMouse = Math.sqrt(dx ** 2 + dy ** 2);
        if (distanceToMouse < (canvas.width / 7) * (canvas.height / 7) && distanceToMouse < mouse.radius*2) {
            opacityValue = 1 - (distanceToMouse / 200);
            ctx.strokeStyle = `rgba(255,255,255,${opacityValue})`;
            ctx.beginPath();
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
}   


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i=0;i < particleArray.length; i++){
            particleArray[i].update();
    }
    connect();
}

window.addEventListener('resize', ()=> {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        mouse.radius = ((canvas.height / 100) * (canvas.width / 100));
        init();
})

window.addEventListener('mouseout', ()=>{
    mouse.x = undefined;
    mouse.y = undefined;
})

init();
animate();
