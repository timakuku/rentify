import { useState } from 'react';
import { createListing } from '../services/api';

export default function CreateListingPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    images: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const listing = { ...form, price: Number(form.price), images: form.images.split(',') };
      await createListing(listing);
      alert('Объявление создано!');
    } catch (err) {
      alert('Ошибка: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Заголовок" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Описание" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Цена" />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Город" />
      <input name="images" value={form.images} onChange={handleChange} placeholder="Изображения (через запятую)" />
      <button type="submit">Создать</button>
    </form>
  );
}
