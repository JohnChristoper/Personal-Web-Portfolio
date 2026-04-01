window.addEventListener( 'resize', function() {
    if(this.window.innerWidth > 768) {
        this.document.getElement('menu-toggle').checked = false;
    }
});

const toggle = document.getElementById('menu-toggle');
const menuBlur = document.querySelector('.menu-blur');

toggle.addEventListener('change', () => {
    menuBlur.style.display = toggle.checked ? 'block' : 'none';
});

menuBlur.addEventListener('click', () => {
    toggle.checked = false;
    menuBlur.style.display = 'none';
});

const filter = document.querySelectorAll('.filter');
const card = document.querySelectorAll('.project-card');

filter.forEach( btn => {
    btn.addEventListener('click', () => {
        filter.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        
        card.forEach( c => {
            const isVisible = category === 'all' || c.getAttribute('data-category') === category;

            if(isVisible) {
                c.classList.remove('hidden');
            } else {
                c.classList.add('hidden');
            }
        });
    });
});

document.querySelectorAll('.typewriter').forEach(el => {
    const text = el.textContent;
    const speed = el.dataset.speed || 40; // ms per character, override with data-speed="30"
    el.textContent = '';

    let i = 0;
    const type = () => {
        if (i < text.length) {
            el.textContent += text[i++];
            setTimeout(type, speed);
        }
    };
    type();
});

/* ============================
    INTERACTIVE STAR BACKGROUND
============================ */

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let mouse = {
    x: canvas.width/2,
    y: canvas.height/2
};

document.addEventListener("mousemove", e=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const stars = [];
const starCount = 220;

class Star{
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*1.5;
        this.opacity = Math.random()*0.25 + 0.05;
        this.depth = Math.random()*0.6;
    }

    draw(px,py){

        let dx = mouse.x - px;
        let dy = mouse.y - py;

        let distance = Math.sqrt(dx*dx + dy*dy);

        let brightness = this.opacity;

        if(distance < 120){
            brightness += (120-distance)/240;
        }

        ctx.beginPath();
        ctx.arc(px,py,this.size,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${brightness})`;
        ctx.fill();
    }

    update(){

        const offsetX = (mouse.x - canvas.width/2)*this.depth*0.02;
        const offsetY = (mouse.y - canvas.height/2)*this.depth*0.02;

        const px = this.x + offsetX;
        const py = this.y + offsetY;

        this.draw(px,py);
    }
}

for(let i=0;i<starCount;i++){
    stars.push(new Star());
}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{
        star.update();
    });

    requestAnimationFrame(animate);
}

animate();