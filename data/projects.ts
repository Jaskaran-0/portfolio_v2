// data/projects.ts
// Single source of truth for all project data.
// Update this file when adding projects — Terminal and sections read from here.

export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  id: string
  title: string
  tag: string
  description: string
  stack: string[]
  status: 'complete' | 'in-progress' | 'concept'
  featured: boolean
  caseStudyPath?: string
  githubUrl?: string
  metrics?: ProjectMetric[]
}

export const projects: Project[] = [
  {
    id: 'rcaf-facial-recognition',
    title: 'RCAF Facial Recognition System',
    tag: 'Featured · AI / Computer Vision',
    description: 'Applied research for the Canadian Air Force Museum. Real-ESRGAN upscaling into ArcFace/InceptionResNet. 1,000+ archival images. The client never expected it to work this well.',
    stack: ['Python', 'Real-ESRGAN', 'ArcFace', 'PostgreSQL', 'PowerShell'],
    status: 'complete',
    featured: true,
    caseStudyPath: '/projects/rcaf',
    githubUrl: 'https://github.com/Jaskaran-0',
    metrics: [
      { label: 'Face match accuracy', value: '94.7%' },
      { label: 'Images processed', value: '1,000+' },
      { label: 'Pipeline', value: 'Real-ESRGAN → ArcFace' },
    ],
  },
  {
    id: 'medichelper',
    title: 'MedicHelper Platform',
    tag: 'Full-Stack · Mobile',
    description: 'ASP.NET Core 8 backend + Android Java frontend. JWT auth, SignalR real-time notifications, Hangfire scheduling, PostgreSQL. Built from ground up.',
    stack: ['ASP.NET Core 8', 'Java', 'PostgreSQL', 'JWT', 'SignalR', 'Hangfire'],
    status: 'complete',
    featured: false,
    caseStudyPath: '/projects/medichelper',
    githubUrl: 'https://github.com/Jaskaran-0',
    metrics: [
      { label: 'API endpoints built', value: '32' },
      { label: 'Auth system', value: 'JWT + ASP.NET Identity' },
      { label: 'Real-time', value: 'SignalR WebSocket' },
      { label: 'Scheduled jobs', value: 'Hangfire reminders' },
      { label: 'Database', value: 'PostgreSQL via Npgsql' },
    ],
  },
  {
    id: 'job-aggregation',
    title: 'Job Aggregation System',
    tag: 'Automation · Backend',
    description: 'Python + Playwright scraper feeding a Flask API with PostgreSQL persistence. Automated application workflows across job boards.',
    stack: ['Python', 'Flask', 'Playwright', 'PostgreSQL'],
    status: 'in-progress',
    featured: false,
    caseStudyPath: '/projects/job-aggregator',
    githubUrl: 'https://github.com/Jaskaran-0',
  },
  {
    id: 'water-tower-iot',
    title: 'Water Tower IoT System',
    tag: 'Hardware · IoT',
    description: 'ESP32 + LittleFS environmental sensor platform served over a real-time mobile web interface. Real hardware, real data.',
    stack: ['Arduino', 'ESP32', 'LittleFS', 'C++'],
    status: 'complete',
    featured: false,
    githubUrl: 'https://github.com/Jaskaran-0',
  },
]

export const featuredProject = projects.find(p => p.featured)!
export const gridProjects = projects.filter(p => !p.featured)
