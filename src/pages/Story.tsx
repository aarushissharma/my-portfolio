import { motion } from 'framer-motion'
import '../styles/Story.css'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

function Story() {
  return (
    <div className="story-page container">

      <motion.div
        className="story-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="story-eyebrow">— the origin story</p>
        <h1 className="story-title">Why a <em>Café?</em></h1>
      </motion.div>

      <div className="story-body">

        <motion.div className="story-section" {...fade(0.1)}>
                <p className="story-section-label">the craving</p>
                <div className="story-content">
                    <p className="story-text">
                    The Bay Area knows how to do matcha. Even though I'm not too far from 
                    home in UC Santa Cruz, I constantly find myself craving the perfection that
                    is proper Bay Area matcha. I have tried almost every spot in Santa Cruz and 
                    they all fall flat, so I find myself on Pinterest viewing beautifully curated 
                    matcha orders. My obsession translated to this theme!
                    </p>
                </div>
            </motion.div>

            <div className="story-divider" />

            <motion.div className="story-section" {...fade(0.15)}>
                <p className="story-section-label">how i build</p>
                <div className="story-content">
                    <p className="story-text">
                    I care a lot about what I put my name on. I don't love working on
                    things I don't believe in — I'd rather build something smaller that
                    actually matters than something big that doesn't.
                    </p>
                    <p className="story-text">
                    I'm drawn to hard problems at the intersection of ML and systems,
                    and I like understanding how things work at a low level before
                    reaching for abstractions.
                    </p>
                </div>
            </motion.div>

            <div className="story-divider" />

            <motion.div className="story-section" {...fade(0.2)}>
                <p className="story-section-label">what's next</p>
                <div className="story-content">
                    <p className="story-text">
                    I'm currently a student at UCSC, open to 2026 internships.
                    I want to work on something real, with people who care about
                    what they're shipping.
                    </p>
                    <p className="story-text story-closing-line">
                    <a href="/contact" className="story-link">Let's talk →</a>
                    </p>
                </div>
            </motion.div>

      </div>

    </div>
  )
}

export default Story