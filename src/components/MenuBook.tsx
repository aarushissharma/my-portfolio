import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../styles/MenuBook.css'


const MENU_ITEMS = [
  {
    section: "today's specials",
    emoji: '❀',
    name: 'drinks',
    desc: 'projects built, shipped, and measured',
    href: '/projects',
    tag: 'my projects',
  },
  {
    section: 'the full menu',
    emoji: '❀',
    name: 'ingredients',
    desc: 'technical experience',
    href: '/resume',
    tag: 'my résumé',
  },
  {
    section: 'about the chef',
    emoji: '❀',
    name: 'about',
    desc: "who's behind the kitchen",
    href: '/about',
    tag: 'the person',
  },
  {
    section: 'the toppings',
    emoji: '❀',
    name: 'toppings',
    desc: 'leadership, teaching & beyond code',
    href: '/extras',
    tag: 'extracurriculars',
  },
  {
    section: 'the story',
    emoji: '❀',
    name: 'story',
    desc: 'why this café exists',
    href: '/story',
    tag: 'origin',
  },
  {
    section: 'place your order',
    emoji: '❀',
    name: 'order',
    desc: "let's collaborate!",
    href: '/contact',
    tag: 'reach out',
  },
]

function MenuBook() {
  const [open, setOpen] = useState(false)

  return (
    <div className="book-wrap">
      {!open && (
        <motion.div
          className="book-closed"
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.02, rotate: -1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="book-spine" />
          <div className="book-cover">
            <p className="book-cover-eyebrow">aarushi's code café</p>
            <h1 className="book-cover-title">The<br /><em>Menu</em></h1>
            <p className="book-cover-sub">est. 2026 · saratoga, ca</p>
            <div className="book-cover-hint">
              <span>open to browse</span>
              <span className="book-arrow">→</span>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="book-open"
            initial={{ opacity: 0, rotateY: -90, transformOrigin: 'left center' }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* LEFT PAGE — cover */}
            <div className="book-page book-page-left">
              <div className="book-page-inner">
                <p className="book-page-eyebrow">aarushi's code café</p>
                <h1 className="book-page-title">The<br /><em>Menu</em></h1>
                <p className="book-page-sub">est. 2006 · saratoga, ca</p>
                <div className="book-divider" />
                <p className="book-page-note">
                    coded with love and intention
                </p>
              </div>
            </div>

            {/* RIGHT PAGE — menu items */}
            <div className="book-page book-page-right">
              <div className="book-page-inner">
                <p className="book-page-eyebrow">— what's on offer</p>
                <div className="book-menu-list">
                  {MENU_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.3 }}
                    >
                      <Link to={item.href} className="book-menu-item">
                        <span className="book-menu-emoji">{item.emoji}</span>
                        <div className="book-menu-content">
                          <div className="book-menu-top">
                            <span className="book-menu-name">{item.name}</span>
                            <span className="book-menu-dots" />
                            <span className="book-menu-tag">{item.tag}</span>
                          </div>
                          <p className="book-menu-desc">{item.desc}</p>
                        </div>
                        <span className="book-menu-arrow">↗</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <button className="book-close-btn" onClick={() => setOpen(false)}>
              close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MenuBook