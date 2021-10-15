const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;ctx.fillStyle = 'white';
});

const mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});


function drawCircle() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();

    requestAnimationFrame(animate);
}

animate();

