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