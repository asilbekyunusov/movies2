import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/editMovie.css';

const API_URL = 'https://movies-w4fv.onrender.com';

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${API_URL}/movies/${id}`);
        setTitle(res.data.title);
        setYear(res.data.year || '');
        setGenre(res.data.genre || '');
        setDescription(res.data.description || '');
      } catch (error) {
        console.error('Xatolik:', error);
        alert('Film ma’lumotini olishda xatolik yuz berdi');
      }
    };
    fetchMovie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Film nomi kiritilishi shart');
      return;
    }
    try {
      await axios.put(`${API_URL}/movies/${id}`, {
        title,
        year: year ? Number(year) : null,
        genre,
        description,
      });
      navigate('/');
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Filmni yangilashda xatolik yuz berdi');
    }
  };

  return (
    <div className="container">
      <h1>Filmni Tahrirlash</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Film nomi:</label><br />
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Film nomini kiriting"
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Yili:</label><br />
          <input
            id="year"
            type="number"
            value={year}
            onChange={e => setYear(e.target.value)}
            placeholder="Film yilini kiriting"
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Janri:</label><br />
          <input
            id="genre"
            type="text"
            value={genre}
            onChange={e => setGenre(e.target.value)}
            placeholder="Film janrini kiriting"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Tavsif:</label><br />
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Film tavsifini kiriting"
          />
        </div>
        <button type="submit" className="submit-btn">Saqlash</button>
      </form>
    </div>
  );
}
