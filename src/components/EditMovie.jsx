import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/editMovie.css' // Assuming you have a CSS file for styles
const API_URL = 'http://localhost:4000'

export default function EditMovie() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${API_URL}/movies/${id}`)
        setTitle(res.data.title)
        setYear(res.data.year || '')
        setGenre(res.data.genre || '')
        setDescription(res.data.description || '')
      } catch (error) {
        console.error('Xatolik:', error)
        alert('Film ma’lumotini olishda xatolik yuz berdi')
      }
    }
    fetchMovie()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('Film nomi kiritilishi shart')
      return
    }
    try {
      await axios.put(`${API_URL}/movies/${id}`, {
        title,
        year: year ? Number(year) : null,
        genre,
        description,
      })
      navigate('/')
    } catch (error) {
      console.error('Xatolik:', error)
      alert('Filmni yangilashda xatolik yuz berdi')
    }
  }

  return (
    <div className="container">
      <h1>Filmni Tahrirlash</h1>
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
        <button type="submit">Saqlash</button>
      </form>
    </div>
  )
}
