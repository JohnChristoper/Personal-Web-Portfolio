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