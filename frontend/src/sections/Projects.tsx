import { ArrowDownRight } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from '../components/ui/AnimatedSection'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProjectCard } from '../components/cards/ProjectCard'
export function Projects({ notify }: { notify: (message: string) => void }) {
  return <section id="projects" className="section-bordered"><div className="container section-space"><Reveal><div className="projects-heading"><SectionHeading {...portfolio.projects}/><span className="project-count">01 — {String(portfolio.projects.items.length).padStart(2, '0')} <ArrowDownRight size={20}/></span></div></Reveal><div className="project-grid grid gap-5 md:grid-cols-2">{portfolio.projects.items.map((project, i) => <Reveal key={project.id} delay={i * 0.06}><ProjectCard project={project} notify={notify}/></Reveal>)}</div><p className="projects-footnote">{portfolio.projects.note}</p></div></section>
}

