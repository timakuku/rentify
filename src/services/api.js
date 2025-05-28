// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;

// Регистрация пользователя
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ошибка регистрации');
  }

  return response.json(); // Вернёт токен и пользователя
}

// Логин
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ошибка входа');
  }

  return response.json(); // Тоже токен и пользователь
}

// Создание объявления (нужен токен!)
export async function createListing(listingData, token) {
  const response = await fetch(`${API_URL}/listings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(listingData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ошибка создания объявления');
  }

  return response.json();
}
