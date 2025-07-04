const API_URL = 'https://rentify-1-v72p.onrender.com/api';

const listingsContainer = document.querySelector('.listings');
const cityFilter = document.getElementById('cityFilter');





if (cityFilter) {
  cityFilter.addEventListener('change', () => {
    const selectedCity = cityFilter.value;
    loadListings({ city: selectedCity });
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('token', data.token);
      alert('Регистрация прошла успешно!');
    } catch (err) {
      alert('Ошибка регистрации: ' + err.message);
    }
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('token', data.token);
      alert('Вы вошли в систему!');
    } catch (err) {
      alert('Ошибка входа: ' + err.message);
    }
  });
}

const listingForm = document.getElementById('listingForm');
if (listingForm) {
  listingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
if (!token) {
  alert('Вы должны войти, чтобы добавить объявление.');
  return;
}


    const formData = new FormData(listingForm);

    // ✅ Добавляем явно поле type (если нужно)
    formData.append('type', document.getElementById('listingType').value);

    const files = document.getElementById('listingImages').files;
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
    try {
      const res = await fetch(`${API_URL}/listings`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert('Объявление успешно добавлено!');
      listingForm.reset();
      loadListings();
    } catch (err) {
      alert('Ошибка создания объявления: ' + err.message);
    }
  });
}



const applyFiltersBtn = document.getElementById('applyFilters');
if (applyFiltersBtn) {
  applyFiltersBtn.addEventListener('click', () => {
    const city = document.getElementById('cityFilter').value;
    const priceMin = document.getElementById('priceMin').value;
    const priceMax = document.getElementById('priceMax').value;

    const types = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);

    const filters = {};
    if (city) filters.city = city;
    if (priceMin) filters.minPrice = priceMin;
    if (priceMax) filters.maxPrice = priceMax;
    if (types.length > 0) filters.types = types.join(',');

    console.log('Фильтры:', filters);
    loadListings(filters);
  });
} else {
  console.error('Кнопка "Применить фильтр" не найдена');
}




// Функция загрузки объявлений (используется и при старте)
const loadListings = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_URL}/listings?${params}`);

    // Проверяем успешность ответа
    if (!res.ok) {
      throw new Error(`Ошибка при загрузке: ${res.status} ${res.statusText}`);
    }

    const listings = await res.json();

    if (!listingsContainer) {
      console.warn('Элемент listingsContainer не найден');
      return;
    }

    listingsContainer.innerHTML = '';

    listings.forEach(listing => {
      const card = document.createElement('div');
      card.className = 'listing-card';
      const imageSrc = listing.images?.[0] || 'placeholder.jpg';
      card.innerHTML = `
      <a href="listing.html?id=${listing._id}" 
      class="card-link"> 
      <img src="${imageSrc}" 
      alt="${listing.title}"> 
      <h3>${listing.title}</h3> 
      <p>${listing.price} сом/мес</p> 
      <p>${listing.city}</p> </a>`;
      listingsContainer.appendChild(card);
    });
  if (listings.length === 0) {
    listingsContainer.innerHTML = '<p>Ничего не найдено по вашему запросу.</p>';
    return;
  }

  } catch (err) {
    console.error('Ошибка загрузки:', err);
  }
};



const openModal = document.getElementById("openModal");
const openRegistrModal = document.getElementById("openRegistrModal");
const closeModal = document.getElementById("closeModal");
const closeRegistrModal = document.getElementById("closeRegistrModal");
const modal = document.getElementById("loginModal");
const modal2 = document.getElementById("registrModal");

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

if (searchBtn && searchInput) {
searchBtn.addEventListener('click', () => {
const searchQuery = searchInput.value.trim();
const filters = {};
if (searchQuery) {
filters.title = searchQuery; // название ключа — по API
}
loadListings(filters);
});
}


searchInput.addEventListener('keydown', (e) => {
if (e.key === 'Enter') {
searchBtn.click();
}
});

if (openModal) openModal.addEventListener("click", () => modal.style.display = "flex");
if (openRegistrModal) openRegistrModal.addEventListener("click", () => modal2.style.display = "flex");
if (closeModal) closeModal.addEventListener("click", () => modal.style.display = "none");
if (closeRegistrModal) closeRegistrModal.addEventListener("click", () => modal2.style.display = "none");
window.addEventListener("click", (event) => {
  if (event.target === modal) modal.style.display = "none";
});
const gallery = document.getElementById("imageGallery");
const mainImage = document.getElementById("mainImage");
let currentIndex = 0;
let images = [];

function setInitialImage() {
const gallery = document.getElementById("imageGallery");
const mainImage = document.getElementById("mainImage");

if (!gallery || !mainImage) return; // ← проверка

images = Array.from(gallery.querySelectorAll("img"));
if (images.length > 0) {
mainImage.src = images[0].src;
images[0].classList.add("active");
}
}


function changeImage(img) {
    mainImage.src = img.src;
    updateActiveImage(img);
}

function changeImageByStep(step) {
    currentIndex += step;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0; 
    }
    mainImage.src = images[currentIndex].src;
    updateActiveImage(images[currentIndex]);
}

function updateActiveImage(selectedImage) {
    images.forEach(img => img.classList.remove("active"));
    selectedImage.classList.add("active");
    currentIndex = images.indexOf(selectedImage);
}

document.addEventListener('DOMContentLoaded', () => {
  loadListings();
  setInitialImage();
  
  if (openModal) {
    openModal.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }
});



