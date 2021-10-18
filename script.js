const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleArray = [];
let hue = 0;
let lastTime = 1;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined
};

class Focus {
    constructor(speedX, speedY) {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update(deltaTime) {
        this.x += this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;

        let hit = false;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1; // bounce off horizontal walls
            hit = true;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1; // bounce off vertical walls
            hit = true;
        }

        
        if (hit) {
            hue += 40;
        }
        particleArray.push(new Particle(this.x, this.y));
    }

    draw(deltaTime) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 16 + 1; // random number between 1 and 16
        this.speedX = Math.random() * 0.25 - 0.125;
        this.speedY = Math.random() * 0.25 - 0.125;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update(deltaTime) {
        this.x += this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw(deltaTime) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles(deltaTime) {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update(deltaTime);
        particleArray[i].draw(deltaTime);

        // draw lines between particles that are near each other.
        for (let j = i; j < particleArray.length; j++) {
            // use the pythagorean theorem to calc distance between two particles
            // a^2 + b^2 = c^2 (width squared + height squared = hypotenuse squared)
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const hypotenuse = Math.sqrt(dx * dx + dy * dy);
            if (hypotenuse < 75) {
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
            //console.log(particleArray.length);
            i--;
        }
    }
}

const focus = new Focus(-0.25, 0.25);
const focus2 = new Focus(0.25, -0.25);
const focus3 = new Focus(-0.25, -0.25);
const focus4 = new Focus(0.20, 0.25);


function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // deltaTime: elapsed time between frames
    // faster computer, small value for deltaTime
    // slower computer, larger value for deltaTime
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    focus.update(deltaTime);
    focus2.update(deltaTime);
    focus3.update(deltaTime);
    focus4.update(deltaTime);
    //focus.draw(deltaTime);

    handleParticles(deltaTime);
    requestAnimationFrame(animate);
}

// Startup
animate(0);

