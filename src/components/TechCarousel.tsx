import { useRef, useEffect, useState } from 'react'
import '../styles/TechCarousel.css'


interface Tech {
  name: string
  icon: string
  category: 'languages' | 'ml' | 'web' | 'mobile' | 'data' | 'tools'
}


const TECHS: Tech[] = [
  // languages
  { name: 'Python', icon: '🐍', category: 'languages' },
  { name: 'TypeScript', icon: '𝙏𝙎', category: 'languages' },
  { name: 'JavaScript', icon: '𝙅𝙎', category: 'languages' },
  { name: 'Java', icon: '☕', category: 'languages' },
  { name: 'C', icon: '©', category: 'languages' },
  // web
  { name: 'React', icon: '⚛', category: 'web' },
  { name: 'Node.js', icon: '⬡', category: 'web' },
  { name: 'Flask', icon: '🌶', category: 'web' },
  { name: 'FastAPI', icon: '⚡', category: 'web' },
  { name: 'HTML/CSS', icon: '🎨', category: 'web' },
  // ml
  { name: 'PyTorch', icon: '🔥', category: 'ml' },
  { name: 'TensorFlow', icon: '◈', category: 'ml' },
  { name: 'Scikit-learn', icon: '⚙', category: 'ml' },
  { name: 'CNNs', icon: '👁', category: 'ml' },
  { name: 'Transformers', icon: '🤖', category: 'ml' },
  { name: 'LLMs', icon: '◎', category: 'ml' },
  { name: 'RAG', icon: '📚', category: 'ml' },
  { name: 'OpenCV', icon: '📷', category: 'ml' },
  // data
  { name: 'NumPy', icon: '∑', category: 'data' },
  { name: 'Pandas', icon: '🐼', category: 'data' },
  { name: 'PostgreSQL', icon: '🐘', category: 'data' },
  { name: 'MongoDB', icon: '🍃', category: 'data' },
  { name: 'SQL', icon: '🗄', category: 'data' },
  { name: 'Supabase', icon: '⚡', category: 'data' },
  // tools
  { name: 'Docker', icon: '🐳', category: 'tools' },
  { name: 'AWS', icon: '☁', category: 'tools' },
  { name: 'Git', icon: '⎇', category: 'tools' },
  { name: 'Linux', icon: '🐧', category: 'tools' },
  { name: 'Figma', icon: '✦', category: 'tools' },
  // mobile
  { name: 'Flutter', icon: '💙', category: 'mobile' },
  { name: 'Android', icon: '🤖', category: 'mobile' },
]

const CATEGORY_LABELS: Record<Tech['category'], string> = {
  languages: 'languages',
  ml: 'ml & ai',
  web: 'web & api',
  mobile: 'mobile',
  data: 'data & db',
  tools: 'tools & infra',
}

const CATEGORY_ORDER: Tech['category'][] = [
  'languages', 'web', 'ml', 'data', 'tools', 'mobile'
]

function TechCarousel() {
  const [active, setActive] = useState<Tech['category']>('languages')
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const pausedRef = useRef(false)

  const filtered = TECHS.filter(t => t.category === active)
  const doubled = [...filtered, ...filtered, ...filtered]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // reset
    track.scrollLeft = 0
    pausedRef.current = false

    let animId: number
    let lastTime = 0

    const scroll = (time: number) => {
        if (time - lastTime > 16) {
            if (!pausedRef.current && track) {
                track.scrollLeft += 0.6

                // seamless reset — when we've scrolled half the total width
                const half = track.scrollWidth / 2
                if (track.scrollLeft >= half) {
                track.scrollLeft -= half
                }
            }
            lastTime = time
        }
        animId = requestAnimationFrame(scroll)
    }

    animId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animId)
}, [active])

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    pausedRef.current = true
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0)
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const x = e.pageX - (trackRef.current?.offsetLeft ?? 0)
    const walk = (x - startX.current) * 1.5
    if (trackRef.current) trackRef.current.scrollLeft = scrollLeft.current - walk
  }

  const onMouseUp = () => {
    isDragging.current = false
    setTimeout(() => { pausedRef.current = false }, 1000)
  }

  return (
    <section className="tech-carousel container">
      <div className="tech-categories container">
        {CATEGORY_ORDER.map(cat => (
          <button
            key={cat}
            className={`cat-pill ${active === cat ? 'cat-pill-active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>
      <div
        className="tech-track"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {doubled.map((tech, i) => (
          <div key={i} className="tech-card">
            <span className="tech-icon">{tech.icon}</span>
            <span className="tech-name">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechCarousel