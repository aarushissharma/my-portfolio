import { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/Extras.css'

interface Topping {
  id: string
  drinkName: string
  emoji: string
  borderColor: string
  num: string
  role: string
  org: string
  period: string
  description: string
  highlights: string[]
  category: string
}

const TOPPINGS: Topping[] = [
  {
    id: 'breakthrough',
    drinkName: 'sea salt cheese foam',
    emoji: '🧂',
    borderColor: '#a8e060',
    num: '01',
    role: 'Robotics Instructor',
    org: 'Breakthrough Silicon Valley',
    period: 'Ongoing',
    description: 'Mentoring first-generation middle school students in Arduino, circuits, and coding.',
    highlights: [
      '16 first-generation 7th grade students mentored',
      'Taught circuits, motion sensors, and block programming',
      'Weekly lesson plans culminating in a robotic car project',
    ],
    category: 'teaching',
  },
  {
    id: 'wecode',
    drinkName: 'vanilla cream',
    emoji: '🤍',
    borderColor: '#a0a0f0',
    num: '02',
    role: 'Tech Fellow',
    org: 'Harvard WECode',
    period: 'Nov 2025 — Feb 2026',
    description: 'Selected as a Tech Fellow for Harvard\'s annual Women Engineers Code conference.',
    highlights: [
      'Selected from a competitive national applicant pool',
      'Led outreach to 20+ organizations targeting women in tech',
      'Industry mentorship and technical workshops',
    ],
    category: 'fellowship',
  },
  {
    id: 'medusa',
    drinkName: 'strawberry cream',
    emoji: '🍓',
    borderColor: '#e090b0',
    num: '03',
    role: 'Events Coordinator',
    org: 'MEDUSA — AI × Medicine',
    period: 'UCSC · Current',
    description: 'Organizing events at the intersection of artificial intelligence and medicine at UCSC.',
    highlights: [
      'Coordinating workshops, panels, and networking events',
      'Exploring AI applications in healthcare',
      'Building community around responsible AI in medicine',
    ],
    category: 'leadership',
  },
  {
    id: 'gdg',
    drinkName: 'matcha jelly',
    emoji: '🍵',
    borderColor: '#c0d860',
    num: '04',
    role: 'Instruction Intern',
    org: 'Google Developer Group @ UCSC',
    period: 'UCSC · Current',
    description: 'Teaching students to build real software with the Gemini API and prompt engineering.',
    highlights: [
      'Created and delivered a Gemini API workshop',
      'Taught prompt engineering to UCSC students',
      'Students built a README auto-generator from code input',
    ],
    category: 'instruction',
  },
  {
    id: 'tsa',
    drinkName: 'boba pearls',
    emoji: '🫧',
    borderColor: '#60a8d4',
    num: '05',
    role: 'Founder & Co-President',
    org: 'TSA — Saratoga HS',
    period: 'Aug 2023 — Jun 2025',
    description: 'Founded Saratoga High\'s first TSA chapter from scratch with no admin funding or faculty advisor.',
    highlights: [
      '🏆 Led software team to national top 12 out of 100+ teams',
      'Self-managed logistics for 20 students to nationals in Nashville',
      'Organized Bay Area regional as a student-led event',
    ],
    category: 'founding',
  },
  {
    id: 'mocktrial',
    drinkName: 'red bean',
    emoji: '⚖️',
    borderColor: '#d4a060',
    num: '06',
    role: 'Co-President',
    org: 'Mock Trial — Saratoga HS',
    period: 'Aug 2023 — Jun 2025',
    description: 'Led Mock Trial from VP to Co-President, tripling membership and winning multiple awards.',
    highlights: [
      'Grew membership by 300% over 1 year',
      'Raised $8,000 in club funding',
      'Won 3 MVP attorney awards',
    ],
    category: 'president',
  },
  {
    id: 'acm',
    drinkName: 'raspberry popping boba',
    emoji: '🏆',
    borderColor: '#e8305a',
    num: '07',
    role: 'Hackathon Winner',
    org: 'ACM Hacks',
    period: 'Nov 2025',
    description: 'Won Best Health/Bioinformatic Project for Watchful — assistive platform for Alzheimer\'s patients.',
    highlights: [
      '🏆 Best Health/Bioinformatic Project',
      'Real-time location tracking + fall detection',
      'Led team to ship in under 24 hours',
    ],
    category: 'award',
  },
  {
    id: 'ecoeats',
    drinkName: 'banana cream',
    emoji: '🌿',
    borderColor: '#b0d060',
    num: '08',
    role: 'Competition Finalist',
    org: 'County Software Competition',
    period: 'Apr — Jun 2025',
    description: 'EcoEats advanced to national finals — Flutter app using multimodal AI for eco-friendly food recs.',
    highlights: [
      '🏆 County finalist → advancing to nationals',
      'Built production-grade Flutter Android app',
      'Multimodal Vision-Language Model with CO2 database',
    ],
    category: 'award',
  },
]

function FlipCard({ topping, index }: { topping: Topping; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)

  const isFlipped = flipped || hovered

  return (
    <motion.div
      className="flip-wrap"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        className="flip-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div
          className="flip-face flip-front"
          style={{ borderColor: isFlipped ? topping.borderColor : undefined }}
        >
          <div className="flip-front-top">
            <span className="topping-num">{topping.num}</span>
            <div className="topping-dot" style={{ background: topping.borderColor }} />
          </div>
          <span className="flip-emoji">{topping.emoji}</span>
          <p className="flip-drink-name">{topping.drinkName}</p>
          <p className="flip-org">{topping.org}</p>
          <span
            className="topping-tag"
            style={{ color: topping.borderColor, borderColor: topping.borderColor }}
          >
            {topping.category}
          </span>
          <p className="flip-hint">hover to peek · click to keep</p>
        </div>

        <div
          className="flip-face flip-back"
          style={{ borderColor: topping.borderColor }}
        >
          <p className="flip-back-org" style={{ color: topping.borderColor }}>
            {topping.org}
          </p>
          <h3 className="flip-back-role">{topping.role}</h3>
          <p className="flip-back-period">{topping.period}</p>
          <p className="flip-back-desc">{topping.description}</p>
          <ul className="flip-back-highlights">
            {topping.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
          <p className="flip-hint">click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Extras() {
  return (
    <div className="extras-page container">
      <motion.div
        className="extras-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="extras-eyebrow">— beyond the code</p>
        <h2 className="extras-title">The <em>Toppings</em></h2>
        <p className="extras-sub">
          Flip a card to learn more about what I do outside of projects.
        </p>
      </motion.div>

      <div className="flip-grid">
        {TOPPINGS.map((t, i) => (
          <FlipCard key={t.id} topping={t} index={i} />
        ))}
      </div>
    </div>
  )
}

export default Extras