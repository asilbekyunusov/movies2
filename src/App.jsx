import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import MovieList from './components/MovieList'
import AddMovie from './components/AddMovie'
import EditMovie from './components/EditMovie'


function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Movies</Link>
        <Link to="/add">Add Movie</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/edit/:id" element={<EditMovie />} />
      </Routes>
    </Router>
  )
}

export default App  