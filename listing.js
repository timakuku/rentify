const API_URL = 'https://rentify-1-v72p.onrender.com/api';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

let images = [];
let currentIndex = 0;

async function loadListing() {
try {
const res = await fetch(`${API_URL}/listings/${id}`);
if (!res.ok) {
const text = await res.text();
throw new Error(`Ошибка: ${res.status} — ${text}`);
}

javascript
Копировать
Редактировать
const listing = await res.json();

// Заполнение текста
document.getElementById('listingTitle').textContent = listing.title;
document.getElementById('listingPrice').textContent = listing.price + ' сом/мес';
document.getElementById('listingCity').textContent = listing.city;
document.getElementById('listingDescription').textContent = listing.description;

// Карта
const addressForMap = encodeURIComponent(`${listing.address}, ${listing.city}`);
const map = document.getElementById("googleMap");
map.src = `https://www.google.com/maps?q=${addressForMap}&output=embed`;

// Галерея
const gallery = document.getElementById('imageGallery');
const mainImage = document.getElementById('mainImage');
gallery.innerHTML = '';
images = [];

if (listing.images && listing.images.length > 0) {
  mainImage.src = listing.images[0];

  listing.images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add("gallery-thumb");
    img.onclick = () => changeImage(img);
    gallery.appendChild(img);
    images.push(img);
  });

  images[0].classList.add("active");
  currentIndex = 0;
}
} catch (err) {
console.error("Ошибка загрузки объявления:", err);
alert("Ошибка при загрузке объявления");
}
}

function changeImage(img) {
const mainImage = document.getElementById("mainImage");
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

function updateActiveImage(selectedImage) {
images.forEach(img => img.classList.remove("active"));
selectedImage.classList.add("active");
currentIndex = images.indexOf(selectedImage);
}

function setInitialImage() {
const mainImage = document.getElementById("mainImage");
if (images.length > 0) {
mainImage.src = images[0].src;
images[0].classList.add("active");
currentIndex = 0;
}
}

window.onload = async () => {
await loadListing();
};