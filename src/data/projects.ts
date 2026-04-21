export interface Project {
  name: string
  description: string
  longDescription: string
  repo: string
  repoUrl: string
  live: string | null
  stack: string[]
  stat: string
  statLabel: string
  category: 'ml' | 'fullstack' | 'infra' | 'data'
  featured: boolean
  color: string
  image?: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Music Mood Analyzer',
    description: 'Spotify playlist analysis with a custom ML classifier',
    longDescription:
      'Analyzes audio features from Spotify tracks to classify mood and energy. Visualizes the emotional arc of an album track by track.',
    repo: 'music-mood-analyzer',
    repoUrl: 'https://github.com/YOUR_USERNAME/repo-name',
    live: null,
    stack: ['FastAPI', 'React', 'PostgreSQL', 'Docker'],
    stat: '95%',
    statLabel: 'classifier accuracy',
    category: 'ml',
    featured: true,
    color: '#1e3d2a', image: undefined

  },
  {
    name: 'Finance Dashboard',
    description: 'Personal spending tracker with ML-based forecasting',
    longDescription:
      'Full-stack finance app with JWT auth, categorized spending, interactive charts, and a linear regression forecast model.',
    repo: 'finance-dashboard',
    repoUrl: 'https://github.com/YOUR_USERNAME/repo-name',
    live: null,
    stack: ['React', 'FastAPI', 'PostgreSQL', 'AWS EC2'],
    stat: '$0.12',
    statLabel: 'per month to run',
    category: 'fullstack',
    featured: true,
    color: '#213d1e', image: undefined
  },
  {
    name: 'Social Good Pipeline',
    description: 'Automated data pipeline visualizing local housing data',
    longDescription:
      'ETL pipeline that pulls, cleans, and serves public housing affordability data through a map-based visualization.',
    repo: 'social-good-pipeline',
    repoUrl: 'https://github.com/YOUR_USERNAME/repo-name',
    live: null,
    stack: ['Python', 'PostgreSQL', 'FastAPI', 'AWS Lambda'],
    stat: '10k+',
    statLabel: 'data points processed',
    category: 'data',
    featured: true,
    color: '#1e3d34', image: undefined
  },
  {
    name: 'ML Model API',
    description: 'Production ML deployment with full MLOps setup',
    longDescription:
      'End-to-end ML pipeline with experiment tracking, containerized serving, CI/CD, and a live API endpoint.',
    repo: 'ml-model-api',
    repoUrl: 'https://github.com/YOUR_USERNAME/repo-name',
    live: null,
    stack: ['PyTorch', 'FastAPI', 'Docker', 'MLflow', 'AWS'],
    stat: '<200ms',
    statLabel: 'average inference time',
    category: 'ml',
    featured: true,
    color: '#293d1e', image: undefined
  },
  {
    name: 'Portfolio',
    description: 'This site — built from scratch with React + TypeScript',
    longDescription:
      'Personal portfolio with fluid canvas animation, dark mode, tech carousel, and GitHub API integration.',
    repo: 'my-portfolio',
    repoUrl: 'https://github.com/YOUR_USERNAME/repo-name',
    live: 'https://aarushi.dev',
    stack: ['React', 'TypeScript', 'Framer Motion', 'AWS'],
    stat: '100',
    statLabel: 'lighthouse score',
    category: 'fullstack',
    featured: false,
    color: '#253d1e', image: undefined
  },
]