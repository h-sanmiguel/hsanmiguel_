import { portfolio } from '../data/portfolio'
import { Reveal } from '../components/ui/AnimatedSection'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SkillCard } from '../components/cards/SkillCard'
export function TechStack() {
  return <section id="tech-stack" className="section-bordered"><div className="container section-space"><Reveal><SectionHeading {...portfolio.tech}/></Reveal><div className="skill-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{portfolio.tech.categories.map((category, i) => <Reveal key={category.title} delay={i * 0.05}><SkillCard {...category}/></Reveal>)}</div></div></section>
}

