import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// layout
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import MatchaBackground from './components/MatchaBackground'

// pages
import Home from './pages/Home'
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import About from './pages/About'
import Extras from './pages/Extras'
import Story from './pages/Story'
import Contact from './pages/Contact'

function getInitialTheme(): 'light' | 'dark' {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return 'dark'
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <MatchaBackground />
      <Cursor />
      <BrowserRouter>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about"   element={<About />} />
            <Route path="/extras"  element={<Extras />} />
            <Route path="/story"   element={<Story />} />
            <Route path="/resume"  element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App