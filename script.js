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

class Focus {
    constructor() {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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

        for (let j = i; j < particleArray.length; j++) {
            // use the pythagorean theorem to calc distance between two particles
            // a^2 + b^2 = c^2 (width squared + height squared = hypotenuse squared)
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const hypotenuse = Math.sqrt(dx * dx + dy * dy);
            if (hypotenuse < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }

        if (particleArray[i].size <= 0.3) {
            particleArray.splice(i, 1);
            console.log(particleArray.length);
            i--;
        }
    }
}
const focus = new Focus();
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    focus.update();
    focus.draw();

    // ctx.fillStyle = 'rgba(0,0,0,0.02';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    //handleParticles();
    hue += 2;
    requestAnimationFrame(animate);
}

animate();

