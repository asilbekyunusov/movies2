import "../styles/addMovie.css" // Assuming you have a CSS file for styles
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://movies-w4fv.onrender.com'

export default function AddMovie() {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('Film nomi kiritilishi shart')
      return
    }
    try {
      await axios.post(`${API_URL}/movies`, {
        title,
        year: year ? Number(year) : null,
        genre,
        description,
      })
      navigate('/')
    } catch (error) {
      console.error('Xatolik:', error)
      alert('Film qo‘shishda xatolik yuz berdi')
    }
  }

  return (
    <div className="container">
      <h1>Yangi Film Qo‘shish</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Film nomi:</label><br />
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Yili:</label><br />
          <input type="number" value={year} onChange={e => setYear(e.target.value)} />
        </div>
        <div>
          <label>Janri:</label><br />
          <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
        </div>
        <div>
          <label>Tavsif:</label><br />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <button type="submit">Qo‘shish</button>
      </form>
    </div>
  )
}
