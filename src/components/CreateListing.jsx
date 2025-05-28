// src/components/CreateListing.jsx
import { useState } from 'react';
import { createListing } from '../services/api';

export default function CreateListing() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = await createListing({ ...form, price: Number(form.price) }, token);
      alert('Объявление создано!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" onChange={handleChange} placeholder="Заголовок" />
      <input name="description" onChange={handleChange} placeholder="Описание" />
      <input name="price" type="number" onChange={handleChange} placeholder="Цена" />
      <input name="location" onChange={handleChange} placeholder="Город" />
      <input name="images" onChange={e => setForm(prev => ({ ...prev, images: e.target.value.split(',') }))} placeholder="Изображения через запятую" />
      <button type="submit">Создать</button>
    </form>
  );
}
