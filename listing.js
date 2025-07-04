const API_URL = 'https://rentify-1-v72p.onrender.com/api';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const imageBase = 'https://rentify-backend.onrender.com';
async function loadListing() {
const res = await fetch(`${API_URL}/listings/${id}`);
const listing = await res.json();
const gallery = document.getElementById('imageGallery');
const mainImage = document.getElementById('mainImage');
const map = document.getElementById("googleMap");
const addressForMap = encodeURIComponent(listing.address + ', ' + listing.city);
map.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23396.754154542392!2d74.5539607681249!3d42.86029955361739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec9dbf3d3ab87%3A0x6705f2d4a45cdd99!2z0JrRi9GA0LPRi9C30YHQutC40Lkg0YLQtdGF0L3QuNGH0LXRgdC60LjQuSDRg9C90LjQstC10YDRgdC40YLQtdGC!5e0!3m2!1sru!2skg!4v1744041424029!5m2!1sru!2skg&q=${addressForMap}`;
document.getElementById('listingTitle').textContent = listing.title;
document.getElementById('listingPrice').textContent = listing.price + ' сом/мес';
document.getElementById('listingCity').textContent = listing.city;
document.getElementById('listingDescription').textContent = listing.description;



///
async function loadListing() {
try {
const res = await fetch(`${API_URL}/listings/${id}`);
if (!res.ok) {
throw new Error(`Ошибка загрузки: ${res.status}`);
}
const listing = await res.json();

javascript
Копировать
Редактировать
// Обновление информации
document.getElementById('listingTitle').textContent = listing.title;
document.getElementById('listingPrice').textContent = listing.price + ' сом/мес';
document.getElementById('listingCity').textContent = listing.city;
document.getElementById('listingDescription').textContent = listing.description;

// Обновление карты
const addressForMap = encodeURIComponent(`${listing.address}, ${listing.city}`);

map.src = `https://www.google.com/maps?q=${addressForMap}&output=embed`;

// Загрузка изображений в галерею


gallery.innerHTML = '';

if (listing.images && listing.images.length > 0) {
  mainImage.src = listing.images[0];

  listing.images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.onclick = () => changeImage(img);
    if (index === 0) img.classList.add("active");
    gallery.appendChild(img);
  });

  images = Array.from(gallery.querySelectorAll("img"));
}
} catch (err) {
console.error("Ошибка при загрузке объявления:", err);
alert("Не удалось загрузить объявление.");
}
}



document.getElementById('listingTitle').textContent = listing.title;
document.getElementById('listingPrice').textContent = listing.price + ' сом/мес';
document.getElementById('listingCity').textContent = listing.city;
document.getElementById('listingDescription').textContent = listing.description;



map.src = `https://www.google.com/maps/embed?...&q=${addressForMap}`; // твой полный URL


if (listing.images && listing.images.length > 0) {
  mainImage.src = listing.images[0];
  listing.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.onclick = () => changeImage(img);
    gallery.appendChild(img);
  });
}
} 

///

if (listing.images && listing.images.length > 0) {
mainImage.src = `${listing.images[0]}`;
listing.images.forEach(src => {
const img = document.createElement('img');
img.src =src;
img.onclick = () => changeImage(img);
gallery.appendChild(img);
});
}


let images = [];
let currentIndex = 0;

function changeImage(img) {

mainImage.src = img.src;
updateActiveImage(img);
}

function changeImageByStep(step) {
if (images.length === 0) return;
currentIndex = (currentIndex + step + images.length) % images.length;
const img = images[currentIndex];
document.getElementById("mainImage").src = img.src;
updateActiveImage(img);
}

function updateActiveImage(img) {
images.forEach(i => i.classList.remove("active"));
img.classList.add("active");
currentIndex = images.indexOf(img);
}

function setInitialImage() {
images = Array.from(document.getElementById("imageGallery").querySelectorAll("img"));
if (images.length > 0) {
document.getElementById("mainImage").src = images[0].src;
images[0].classList.add("active");
currentIndex = 0;
}
}

window.onload = async () => {
await loadListing();
setInitialImage();
};