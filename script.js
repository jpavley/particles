const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleArray = [];
let hue = 0;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 10; i++) {
        particleArray.push(new Particle());
    }
});

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 5; i++) {
        particleArray.push(new Particle());
    }
});

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 16 + 1; // random number between 1 and 16
        this.speedX = Math.random() * 3 - 1.5; // random number between -1.5 and +1.5
        this.speedY = Math.random() * 3 - 1.5; // random number between -1.5 and +1.5
        this.color = 'hsl(' + hue + ', 100%, 50%)';

    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// function init() {
//     for (let i = 0; i < 100; i++) {
//         particleArray.push(new Particle());
//     }
// }

function handleParticles() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        if (particleArray[i].size <= 0.3) {
            particleArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0,0,0,0.02';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    handleParticles();
    hue += 0.5;
    requestAnimationFrame(animate);
}

// init();
animate();

