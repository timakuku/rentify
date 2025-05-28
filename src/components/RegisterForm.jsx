// src/components/RegisterForm.jsx
import { useState } from 'react';
import { registerUser } from '../services/api';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ email, password });
      console.log('Успешная регистрация', data);
      localStorage.setItem('token', data.token); // Сохраняем токен
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
