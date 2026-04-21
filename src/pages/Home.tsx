import { motion } from 'framer-motion'
import '../styles/Home.css'
import MenuBook from '../components/MenuBook'



function Home() {
  return (
    <div className="home">

      <section className="hero container">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          — uc santa cruz · bs computer engineering · expected 2028
        </motion.p>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Aarushi Sharma's<br /><em>Code Café</em>
        </motion.h1>
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
            _____
        </motion.p>
        <motion.div
            className="hero-scroll"
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <button
                className="hero-scroll-btn"
                onClick={() => document.querySelector('.book-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span className="hero-scroll-label">open the menu</span>
                <motion.span
                    className="hero-scroll-arrow"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    ↓
                </motion.span>
            </button>
        </motion.div>

      <motion.section
        className="welcome container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="welcome-inner">
          <p className="welcome-eyebrow">— welcome to the café</p>
          <p className="welcome-text">

            A portfolio inspired by the coffee shops and matcha cafés
            where I do my best thinking. Consider this your menu.
          </p>
        </div>
        <div className="welcome-stamp">
          <span className="stamp-text">est.<br />2007</span>
        </div>
      </motion.section>


      <motion.section
        className="book-section container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <MenuBook />
      </motion.section>
      </section>
    </div>
  )
}

export default Home