document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensaje enviado. ¡Gracias por contactarme!');
    this.reset();
});

// Mouse proximity detection for section glow
const sections = document.querySelectorAll('section');
document.addEventListener('mousemove', (e) => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
            Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
        );
        if (distance < 200) {
            section.classList.add('glow');
        } else {
            section.classList.remove('glow');
        }
    });
});

// Canvas background animation with butterflies only
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
const numParticles = 30;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 10;
        this.speedX = Math.random() * 0.7 - 0.35;
        this.speedY = Math.random() * 0.7 - 0.35;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.color = '#FF99CC';
        this.flapAngle = 0;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        this.flapAngle += 0.1;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        const wingFlap = Math.sin(this.flapAngle) * 5;
        // Left wing
        ctx.moveTo(this.x, this.y);
        ctx.quadraticCurveTo(this.x - this.size, this.y - wingFlap, this.x - this.size * 1.5, this.y + this.size);
        ctx.quadraticCurveTo(this.x - this.size, this.y + wingFlap, this.x, this.y);
        // Right wing
        ctx.moveTo(this.x, this.y);
        ctx.quadraticCurveTo(this.x + this.size, this.y - wingFlap, this.x + this.size * 1.5, this.y + this.size);
        ctx.quadraticCurveTo(this.x + this.size, this.y + wingFlap, this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

animate();

// Parallax effect on mouse move
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 15;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 15;
    particles.forEach(particle => {
        particle.x += mouseX * 0.01;
        particle.y += mouseY * 0.01;
    });
});