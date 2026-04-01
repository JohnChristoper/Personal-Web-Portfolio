const images = document.querySelectorAll(".fade-gallery img");

let current = 0;

function showNextImage(){

    images[current].classList.remove("active");

    current = (current + 1) % images.length;

    images[current].classList.add("active");
}

setInterval(showNextImage, 3000);

const p = document.getElementById("link");
const div = p.parentElement;

if(p.textContent.trim() === ""){
    div.style.display = "none";
} else {
    div.style.display = "block";
}

document.querySelectorAll('.typewriter').forEach(el => {
    const text = el.textContent;
    const speed = el.dataset.speed || 50;
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