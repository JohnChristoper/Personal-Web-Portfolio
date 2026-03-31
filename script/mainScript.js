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

