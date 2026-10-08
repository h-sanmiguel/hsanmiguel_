import { Card } from '@heroui/react'
import { Atom, Braces, Code2, Database, Flame, GitBranch, Layers, Leaf, Monitor, Server, Terminal, Wind, Zap } from 'lucide-react'
import type { ComponentType } from 'react'
import { Figma, Github } from '../ui/BrandIcons'
type LucideIcon = ComponentType<{ size?: number; strokeWidth?: number }>
const categoryIcons: Record<string, LucideIcon> = { code: Code2, server: Server, database: Database, design: Layers }
const icons: Record<string, LucideIcon> = { HTML: Code2, CSS: Braces, React: Atom, Vite: Zap, 'Tailwind CSS': Wind, 'Node.js': Server, 'Express.js': Terminal, MongoDB: Leaf, Firebase: Flame, Git: GitBranch, GitHub: Github, Figma, 'VS Code': Monitor }
export function SkillCard({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  const CategoryIcon = categoryIcons[icon]
  return <Card className="skill-card"><Card.Header className="skill-header"><CategoryIcon size={17}/><Card.Title>{title}</Card.Title></Card.Header><Card.Content><ul className="skill-list">{items.map(item => { const Icon = icons[item]; return <li key={item}><span className={'tech-icon tech-' + item.toLowerCase().replace(/[^a-z]/g, '')}>{Icon ? <Icon size={19} strokeWidth={1.7}/> : <span className="tech-letters">{item === 'JavaScript' ? 'JS' : 'TS'}</span>}</span>{item}</li> })}</ul></Card.Content></Card>
}

