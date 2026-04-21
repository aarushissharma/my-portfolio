import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS, type Project } from '../data/projects'
import '../styles/Projects.css'

interface GitHubData {
  stars: number
  language: string
  updated: string
  description: string
}

function GitHubBar({ repo }: { repo: string }) {
  const [data, setData] = useState<GitHubData | null>(null)

  useEffect(() => {
    fetch(`https://api.github.com/repos/YOUR_GITHUB_USERNAME/${repo}`)
      .then(res => res.json())
      .then(json => {
        if (json.name) {
          setData({
            stars: json.stargazers_count,
            language: json.language,
            updated: new Date(json.pushed_at).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            }),
            description: json.description,
          })
        }
      })
      .catch(() => null)
  }, [repo])

  return (
    <div className="github-bar">
      <div className="github-bar-left">
        {data?.language && (
          <span className="github-lang">
            <span className="lang-dot" />
            {data.language}
          </span>
        )}
        {data?.updated && (
          <span className="github-updated">updated {data.updated}</span>
        )}
      </div>
      <div className="github-bar-right">
        {data?.stars !== undefined && (
          <span className="github-stars">★ {data.stars}</span>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <GitHubBar repo={project.repo} />
      <div className="project-body">
        <div
          className="project-visual"
          style={{ background: project.color }}
        >
          <span className="project-num">{num}</span>
          {project.image
            ? <img src={project.image} alt={project.name} />
            : <span className="project-visual-label">{project.category}</span>
          }
        </div>
        <div className="project-content">
          <div className="project-left">
            <p className="project-category">{project.category}</p>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-desc">{project.longDescription}</p>
            <div className="project-stack">
              {project.stack.map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="project-right">
            <div className="project-stat">
              <span className="stat-big">{project.stat}</span>
              <span className="stat-small">{project.statLabel}</span>
            </div>
            <div className="project-links">
                <a
                href={project.repoUrl}
                className="project-repo"
                target="_blank"
                rel="noreferrer"
              >
                repo ↗
              </a>
              {project.live && (
                <a
                  href={project.live}
                  className="project-live"
                  target="_blank"
                  rel="noreferrer"
                >
                  live ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const FILTERS = ['all', 'ml', 'fullstack', 'infra', 'data'] as const

function Projects() {
  const [filter, setFilter] = useState<'all' | Project['category']>('all')

  const filtered = PROJECTS.filter(p =>
    filter === 'all' ? true : p.category === filter
  )

  return (
    <div className="projects-page container">
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="projects-eyebrow">— today's specials</p>
        <h2 className="projects-title">The <em>Drinks</em></h2>
        <p className="projects-sub">01 — 05 &nbsp;·&nbsp; kitchen open</p>
      </motion.div>

      <div className="projects-filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`cat-pill ${filter === f ? 'cat-pill-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="projects-list">
        {filtered.map((project, i) => (
          <ProjectCard key={project.repo} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}

export default Projects