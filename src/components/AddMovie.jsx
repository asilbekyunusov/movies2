import "../styles/addMovie.css";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://movies-w4fv.onrender.com';

export default function AddMovie() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Film nomi kiritilishi shart');
      return;
    }
    try {
      await axios.post(`${API_URL}/movies`, {
        title,
        year: year ? Number(year) : null,
        genre,
        description,
      });
      // Formani tozalash
      setTitle('');
      setYear('');
      setGenre('');
      setDescription('');
      navigate('/');
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Film qo‘shishda xatolik yuz berdi');
    }
  };

  return (
    <div className="container">
      <h1>Yangi Film Qo‘shish</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Film nomi:</label><br />
          <input
            id="title"
            type="text"
            placeholder="Film nomini kiriting"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Yili:</label><br />
          <input
            id="year"
            type="number"
            placeholder="Film yilini kiriting"
            value={year}
            onChange={e => setYear(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Janri:</label><br />
          <input
            id="genre"
            type="text"
            placeholder="Film janrini kiriting"
            value={genre}
            onChange={e => setGenre(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Tavsif:</label><br />
          <textarea
            id="description"
            placeholder="Film tavsifini kiriting"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">Qo‘shish</button>
      </form>
    </div>
  );
}
