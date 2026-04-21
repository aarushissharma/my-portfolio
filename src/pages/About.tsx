import { motion } from 'framer-motion'
import '../styles/About.css'
import aarushi from '../assets/aarushi.jpeg'
import TechCarousel from '../components/TechCarousel'

const HOBBIES = [
  { label: 'matcha', size: 'lg' },
  { label: 'music production', size: 'md' },
  { label: 'coffee shops', size: 'lg' },
  { label: 'reading', size: 'sm' },
  { label: 'hiking', size: 'sm' },
  { label: 'film photography', size: 'md' },
  { label: 'cooking', size: 'sm' },
  { label: 'hackathons', size: 'md' },
  { label: 'traveling', size: 'sm' },
  { label: 'design', size: 'md' },
  { label: 'open source', size: 'sm' },
  { label: 'live music', size: 'md' },
]

function About() {
  return (
    <div className="about-page container">

      {/* HEADER */}
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="about-eyebrow">— about the chef</p>
        <h1 className="about-title">Hi, I'm <em>Aarushi</em></h1>
      </motion.div>

      <motion.div
        className="about-tech"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <TechCarousel />
      </motion.div>

      {/* TOP ROW — photo + facts + bio */}
      <div className="about-body">
        <motion.div
          className="about-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="about-photo-wrap">
            <img src={aarushi} alt="Aarushi Sharma" className="about-photo" />
            <div className="about-photo-caption">
              <span className="about-photo-caption-text">
                probably at cerē tea right now
              </span>
            </div>
          </div>

          <div className="about-facts">
            <div className="about-fact">
              <span className="about-fact-label">from</span>
              <span className="about-fact-value">Saratoga, CA · Bay Area</span>
            </div>
            <div className="about-fact">
              <span className="about-fact-label">studying</span>
              <span className="about-fact-value">Computer Engineering · UCSC</span>
            </div>
            <div className="about-fact">
              <span className="about-fact-label">concentration</span>
              <span className="about-fact-value">Systems Programming</span>
            </div>
            <div className="about-fact">
              <span className="about-fact-label">current obsession</span>
              <span className="about-fact-value">core of AI/ML + human-centered tech</span>
            </div>
            <div className="about-fact">
              <span className="about-fact-label">go-to order</span>
              <span className="about-fact-value">strawberry Einspänner @ cerē tea</span>
            </div>
            <div className="about-fact">
                <span className="about-fact-label">coursework</span>
                <span className="about-fact-value">
                    Machine Learning · Computer Systems · Assembly & C · Database Management · 
                    Linear Algebra · Discrete Mathematics · Differential Equations · 
                    Multivariable Calculus
                </span>
                </div>
          </div>
        </motion.div>

        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="about-bio">
            <p className="about-bio-text">
              I'm a Computer Engineering student at UC Santa Cruz with a concentration
              in Systems Programming, from Saratoga, California in the Bay Area.
            </p>
            <p className="about-bio-text">
              Right now I'm incredibly interested in the core of AI and ML and
              human-centered technology — building things that are not just technically
              interesting but actually meaningful to the people using them.
            </p>
            <p className="about-bio-text">
              When I'm not building things, you'll find me at a café working on music,
              experimenting with film photography, or trying every matcha variation
              on the menu. My favorite spot is cerē tea in Saratoga — their strawberry
              Einspänner is something special.
            </p>
            <p className="about-bio-text">
              I believe the best software is built slowly, thoughtfully, and with good
              taste — like a well-made matcha.
            </p>
          </div>

          <div className="about-links">
            <a href="https://github.com/aarushissharma" className="about-link" target="_blank" rel="noreferrer">
              github ↗
            </a>
            <a href="https://linkedin.com/in/aarushi-sharmaa" className="about-link" target="_blank" rel="noreferrer">
              linkedin ↗
            </a>
            <a href="mailto:ashar192@ucsc.edu" className="about-link">
              ashar192@ucsc.edu ↗
            </a>
          </div>
        </motion.div>
      </div>

      {/* HOBBIES ROW */}
      <motion.div
        className="about-hobbies-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="about-hobbies-label">— off the clock</p>
        <div className="hobbies-wrap">
          {HOBBIES.map((h, i) => (
            <motion.span
              key={i}
              className={`hobby-bubble hobby-bubble-${h.size}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              viewport={{ once: true }}
            >
              {h.label}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* TECH CAROUSEL */}

    </div>
  )
}

export default About