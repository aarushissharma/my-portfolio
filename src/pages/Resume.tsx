import { motion } from 'framer-motion'
import '../styles/Resume.css'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

function Resume() {
  return (
    <div className="resume-page container">

      <motion.div className="resume-header" {...fade(0)}>
        <div className="resume-header-left">
          <h1 className="resume-name">Aarushi <em>Sharma</em></h1>
          <p className="resume-sub">Computer Engineering · UC Santa Cruz · 3.7 GPA</p>
        </div>
        <div className="resume-header-right">
          <a href="mailto:ashar192@ucsc.edu" className="resume-contact-link">ashar192@ucsc.edu</a>
          <a href="https://linkedin.com/in/aarushi-sharmaa" className="resume-contact-link" target="_blank" rel="noreferrer">linkedin ↗</a>
          <a href="/resume.pdf" className="resume-contact-link" target="_blank" rel="noreferrer">download pdf ↗</a>
        </div>
      </motion.div>

      <div className="resume-divider" />

      <div className="resume-body">

        <motion.section className="resume-section" {...fade(0.1)}>
          <p className="resume-section-label">education</p>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3 className="resume-item-title">University of California, Santa Cruz</h3>
              <span className="resume-item-date">Expected 2028</span>
            </div>
            <p className="resume-item-sub">BS Computer Engineering</p>
            <p className="resume-item-detail">
              Machine Learning · Programming Abstractions · Computer Systems · Assembly & C ·
              Database Management · Linear Algebra · Discrete Mathematics · Differential Equations · Multivariable Calculus
            </p>
          </div>
        </motion.section>

        <div className="resume-divider" />

        <motion.section className="resume-section" {...fade(0.15)}>
          <p className="resume-section-label">experience</p>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3 className="resume-item-title">PLAYTOON It</h3>
              <span className="resume-item-date">Sept 2025 — Feb 2026</span>
            </div>
            <p className="resume-item-sub">Software Engineer Intern</p>
            <ul className="resume-bullets">
              <li>Owned end-to-end development of the creator analytics dashboard, collaborating cross-functionally with design and product teams to deliver production-grade features on deadline</li>
              <li>Refactored routing infrastructure for the Creator Panel, standardizing navigation flow using JavaScript and TypeScript</li>
            </ul>
          </div>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3 className="resume-item-title">Breakthrough Silicon Valley</h3>
              <span className="resume-item-date">Ongoing</span>
            </div>
            <p className="resume-item-sub">Robotics Instructor</p>
            <ul className="resume-bullets">
              <li>Mentored 16 first-generation 7th grade students in hands-on Arduino and coding projects, teaching circuits, motion sensors, and block programming</li>
              <li>Developed weekly lesson plans culminating in a final robotic car project</li>
            </ul>
          </div>
        </motion.section>

        <div className="resume-divider" />

        <motion.section className="resume-section" {...fade(0.2)}>
          <p className="resume-section-label">projects</p>

          {[
            {
              name: 'Watchful.',
              stack: 'JavaScript · Next.js · Node.js · Express · Firebase',
              date: 'Nov 2025',
              award: 'Best Health/Bioinformatic Project — ACM Hacks',
              bullets: [
                'Led development of a full-stack assistive platform for Alzheimer\'s patients with real-time location tracking, safe-zone alerts, fall detection, and emergency calling',
                'Built a distributed Node.js/Express backend with async data pipelines ingesting smartwatch sensor data and delivering live notifications via Firebase',
              ],
            },
            {
              name: 'EcoEats.',
              stack: 'Flutter · Android Studio · Python · Flask',
              date: 'Apr — Jun 2025',
              award: 'County-level competition finalist — advancing to nationals',
              bullets: [
                'Shipped a production-grade Flutter Android app end-to-end, owning full mobile UI, state management, navigation flows, and backend API integration',
                'Integrated a multimodal Vision-Language Model with prompt engineering workflows connecting LLM outputs to a CO2 database retrieval pipeline',
              ],
            },
            {
              name: 'GuideMe.',
              stack: 'Python · OpenCV · YOLOv8 · pyttsx3/gTTS',
              date: 'Ongoing',
              award: null,
              bullets: [
                'Building a real-time edge-optimized navigation assistant using YOLOv8 for on-device object detection for visually impaired users',
                'Implementing model inference optimization for low-latency obstacle and traffic signal detection with voice-guided audio feedback',
              ],
            },
            {
              name: 'CRM System.',
              stack: 'Flask · Python · SQL/PostgreSQL · REST APIs',
              date: 'Jun — Jul 2024',
              award: null,
              bullets: [
                'Built backend infrastructure with structured data schemas and SQL transformation pipelines, translating complex data requirements into analytics dashboards',
              ],
            },
          ].map((project, i) => (
            <div className="resume-item" key={i}>
              <div className="resume-item-header">
                <h3 className="resume-item-title">{project.name}</h3>
                <span className="resume-item-date">{project.date}</span>
              </div>
              <p className="resume-item-sub">{project.stack}</p>
              {project.award && (
                <p className="resume-award">✦ {project.award}</p>
              )}
              <ul className="resume-bullets">
                {project.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.section>

        <div className="resume-divider" />

        <motion.section className="resume-section" {...fade(0.25)}>
          <p className="resume-section-label">skills</p>
          <div className="resume-skills-grid">
            {[
              { label: 'languages & web', items: 'Python · Java · JavaScript · TypeScript · C · C++ · HTML/CSS · React · Node.js' },
              { label: 'ml & ai', items: 'CNNs · RNNs · Transformers · LLMs · RAG · Agentic Systems · PyTorch · TensorFlow · Scikit-learn · OpenCV' },
              { label: 'mobile', items: 'Flutter · Android Studio · state management · navigation flows · API integration' },
              { label: 'data & tools', items: 'SQL · PostgreSQL · MongoDB · Supabase · AWS · Docker · Git · Linux · Figma' },
            ].map((group, i) => (
              <div className="resume-skill-group" key={i}>
                <p className="resume-skill-label">{group.label}</p>
                <p className="resume-skill-items">{group.items}</p>
              </div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  )
}

export default Resume