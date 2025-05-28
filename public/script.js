const API_URL = 'http://localhost:3000/api';

// Загрузка объявлений с фильтрацией
const listingsContainer = document.querySelector('.listings');
const cityFilter = document.getElementById('cityFilter');

const loadListings = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_URL}/listings?${params}`);
    const listings = await res.json();

    listingsContainer.innerHTML = ''; // очищаем контейнер

    listings.forEach(listing => {
      console.log(listing.images);
      console.log(listing); 
      const card = document.createElement('div');
      card.className = 'listing-card';
      card.innerHTML = `
      <a href="listing.html?id=${listing._id}" class="listing-link"> 
      <img src="http://localhost:3000${listing.images?.[0] || '/uploads/placeholder.jpg'}" alt="${listing.title}"> 
      <h3>${listing.title}</h3> <p><strong>${listing.price} сом/мес</strong></p> 
      <p>${listing.city}</p> 
      <p>${listing.address || 'Адрес не указан'}</p> 
      <button class="details-btn">Детали</button> </a>`
      listingsContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Ошибка загрузки объявлений:', err);
    listingsContainer.innerHTML = '<p>Не удалось загрузить объявления</p>';
  }
};


// Обработчик фильтра по городу
if (cityFilter) {
  cityFilter.addEventListener('change', () => {
    const selectedCity = cityFilter.value;
    loadListings({ city: selectedCity });
  });
}

// Форма регистрации
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

// Форма входа
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

// Создание объявления (если есть форма)
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

    const files = document.getElementById('listingImages').files;
    for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i]);
    }
    
try {
  const res = await fetch(`${API_URL}/listings`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
      // Не указывай Content-Type вручную — браузер установит его сам для FormData
    },
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

// Загружаем все объявления при старте
document.addEventListener('DOMContentLoaded', () => {
  loadListings();
});



// Получаем элементы
const openModal = document.getElementById("openModal");
const openRegistrModal = document.getElementById("openRegistrModal");
const closeModal = document.getElementById("closeModal");
const closeRegistrModal = document.getElementById("closeRegistrModal");
const modal = document.getElementById("loginModal");
const modal2 = document.getElementById("registrModal");


// Открываем модальное окно при клике на кнопку "Войти"
openModal.addEventListener("click", () => {
    modal.style.display = "flex";
});
// Открываем модальное окно при клике на кнопку "registr"
openRegistrModal.addEventListener("click", () => {
  modal2.style.display = "flex";
});
// Закрываем модальное окно при клике на "×"
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});
// Закрываем модальное окно при клике на "Registr ×"
closeRegistrModal.addEventListener("click", () => {
  modal2.style.display = "none";
});
// Закрываем модальное окно при клике за его пределами
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
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
const openModal = document.getElementById("openModal");
if (openModal) {
openModal.addEventListener("click", () => {
modal.style.display = "flex";
});
}
});


