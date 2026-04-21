import { motion } from 'framer-motion'
import '../styles/Contact.css'

const LINKS = [
  {
    label: 'email',
    value: 'ashar192@ucsc.edu',
    href: 'mailto:ashar192@ucsc.edu',
    description: 'best way to reach me',
  },
  {
    label: 'github',
    value: 'github.com/aarushissharma',
    href: 'https://github.com/aarushissharma',
    description: 'code, projects, contributions',
  },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/aarushi-sharmaa',
    href: 'https://linkedin.com/in/aarushi-sharmaa',
    description: 'professional background',
  },
]

function Contact() {
  return (
    <div className="contact-page container">

      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="contact-eyebrow">— place your order</p>
        <h1 className="contact-title">Let's <em>Talk</em></h1>
        <p className="contact-sub">
          Whether you want to collaborate, hire, or just say hi —
          pull up a chair.
        </p>
      </motion.div>

      <div className="contact-links">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            className="contact-link-item"
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="contact-link-left">
              <span className="contact-link-label">{link.label}</span>
              <span className="contact-link-value">{link.value}</span>
            </div>
            <div className="contact-link-right">
              <span className="contact-link-desc">{link.description}</span>
              <span className="contact-link-arrow">↗</span>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.p
        className="contact-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Currently open to summer 2026 internships.
      </motion.p>

    </div>
  )
}

export default Contact