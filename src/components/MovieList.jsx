import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/movieList.css";

const API_URL = 'https://movies-w4fv.onrender.com';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/movies`);
      setMovies(res.data);
    } catch (error) {
      console.error('Xatolik:', error);
      setError('Ma’lumotlarni olishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const deleteMovie = async (id) => {
    if (window.confirm('Haqiqatan ham filmni o‘chirmoqchimisiz?')) {
      try {
        await axios.delete(`${API_URL}/movies/${id}`);
        fetchMovies();
      } catch (error) {
        console.error('Xatolik:', error);
        alert('Filmni o‘chirishda xatolik yuz berdi');
      }
    }
  };

  return (
    <div className="container">
      <h1>Movies List</h1>
      {loading ? (
        <div className="loading" role="status" aria-live="polite">
          <div className="spinner" aria-label="Loading"></div>
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : movies.length === 0 ? (
        <p>Hech qanday film yo‘q</p>
      ) : (
        <ul>
          {movies.map(movie => (
            <li key={movie.id} className="movie-item">
              <div className="movie-title">
                {movie.title} ({movie.year}) — {movie.genre}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {Navigate('/edit/${movie.id}')}}
                  className="button delete"
                >
                  Tahrirlash
                </button>
                <button
                  type="button"
                  onClick={() => deleteMovie(movie.id)}
                  className="button delete"
                >
                  O‘chirish
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
