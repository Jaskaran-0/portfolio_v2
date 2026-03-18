// data/skills.ts

export interface SkillGroup {
  label: string
  skills: { name: string; primary: boolean }[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Backend & APIs',
    skills: [
      { name: 'ASP.NET Core 8', primary: true },
      { name: 'Flask', primary: true },
      { name: 'Python', primary: false },
      { name: 'PHP', primary: false },
      { name: 'JWT Auth', primary: false },
      { name: 'SignalR', primary: false },
      { name: 'Hangfire', primary: false },
    ],
  },
  {
    label: 'Data & Storage',
    skills: [
      { name: 'PostgreSQL', primary: true },
      { name: 'Entity Framework', primary: true },
      { name: 'Npgsql', primary: false },
      { name: 'SQL', primary: false },
    ],
  },
  {
    label: 'Mobile & Frontend',
    skills: [
      { name: 'Java (Android)', primary: true },
      { name: 'React Native', primary: false },
      { name: 'MVC', primary: false },
      { name: 'Vite', primary: false },
    ],
  },
  {
    label: 'Hardware & AI',
    skills: [
      { name: 'Arduino / ESP32', primary: true },
      { name: 'Real-ESRGAN', primary: false },
      { name: 'ArcFace', primary: false },
      { name: 'Neural Networks', primary: false },
    ],
  },
]
