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
/* ===============================
   ADVANCED INTERACTIVE STARFIELD
================================ */

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
const starCount = 350;

/* ===== STAR CLASS ===== */

class Star{

    constructor(layer){

        this.layer = layer;

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.size = Math.random()*layer.size;

        this.baseOpacity = Math.random()*0.3 + 0.05;

        this.twinkleSpeed = Math.random()*0.02 + 0.005;
        this.twinkleOffset = Math.random()*Math.PI*2;
    }

    update(){

        /* PARALLAX */

        const offsetX = (mouse.x - canvas.width/2)*this.layer.parallax;
        const offsetY = (mouse.y - canvas.height/2)*this.layer.parallax;

        const px = this.x + offsetX;
        const py = this.y + offsetY;

        /* TWINKLE */

        const twinkle = Math.sin(performance.now()*this.twinkleSpeed + this.twinkleOffset)*0.15;

        let opacity = this.baseOpacity + twinkle;

        /* CURSOR GLOW */

        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < 140){
            opacity += (140-distance)/260;
        }

        ctx.beginPath();
        ctx.arc(px,py,this.size,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
    }
}

/* ===== STAR LAYERS ===== */

const layers = [

    {count:180, size:1, parallax:0.01}, // far
    {count:120, size:1.5, parallax:0.02}, // mid
    {count:50, size:2.2, parallax:0.035} // near

];

layers.forEach(layer=>{
    for(let i=0;i<layer.count;i++){
        stars.push(new Star(layer));
    }
});

/* ===== ANIMATION LOOP ===== */

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{
        star.update();
    });

    requestAnimationFrame(animate);
}

animate();