import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../styles/movieList.css" // Assuming you have a CSS file for styles

const API_URL = 'https://movies2-mir5.onrender.com'

export default function MovieList() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMovies = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/movies`)
      setMovies(res.data)
    } catch (error) {
      console.error('Xatolik:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const deleteMovie = async (id) => {
    if (window.confirm('Haqiqatan ham filmni o‘chirmoqchimisiz?')) {
      try {
        await axios.delete(`${API_URL}/movies/${id}`)
        fetchMovies()
      } catch (error) {
        console.error('Xatolik:', error)
      }
    }
  }

  return (
    <div className="container">
      <h1>Movies List</h1>
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
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
                <Link to={`/edit/${movie.id}`} className="button edit">Tahrirlash</Link>
                <button onClick={() => deleteMovie(movie.id)} className="button delete">O‘chirish</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}