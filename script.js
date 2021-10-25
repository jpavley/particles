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

class Game {
    constructor() {
        this.canvas = document.getElementById('canvas1');
        this.ctx = canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.particleArray = [];
        this.focusArray = [
            new Focus(this.ctx, this.canvas.width, this.canvas.height, -0.25, 0.25),
            new Focus(this.ctx, this.canvas.width, this.canvas.height, 0.25, -0.25),
            new Focus(this.ctx, this.canvas.width, this.canvas.height, -0.25, -0.25),
            new Focus(this.ctx, this.canvas.width, this.canvas.height, 0.20, 0.25)
        ];

        //console.log(this.focusArray);

        this.hue = 0;
        this.lastTime = 1;
    }

    update(deltaTime) {
        this.focusArray.forEach(object => object.update(deltaTime));
    }

    draw() {
        //this.focusArray.forEach(object => object.draw(this.ctx));
    }
}

class Focus {
    constructor(ctx, width, height, speedX, speedY) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.x = width/2;
        this.y = height/2;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update(deltaTime) {
        this.x += this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;

        let hit = false;

        if (this.x < 0 || this.x > this.width) {
            this.speedX *= -1; // bounce off horizontal walls
            hit = true;
        }

        if (this.y < 0 || this.y > this.height) {
            this.speedY *= -1; // bounce off vertical walls
            hit = true;
        }

        
        if (hit) {
            hue += 40;
        }
        particleArray.push(new Particle(this.x, this.y));
        //console.log(particleArray);
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, 10, 10);
        //console.log(this.x);
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

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles(deltaTime, ctx) {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update(deltaTime);
        particleArray[i].draw(ctx);

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

function animate(timeStamp) {
    game.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // deltaTime: elapsed time between frames
    // faster computer, small value for deltaTime
    // slower computer, larger value for deltaTime
    const deltaTime = timeStamp - game.lastTime;
    game.lastTime = timeStamp;

    game.update(deltaTime);
    game.draw();

    handleParticles(deltaTime, game.ctx);

    requestAnimationFrame(animate);
}

// Startup
const game = new Game();
animate(0);

