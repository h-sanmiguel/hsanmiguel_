import { Card } from '@heroui/react'
import { GraduationCap, Heart, MapPin, UserRound } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from '../components/ui/AnimatedSection'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProfilePhoto } from '../components/cards/ProfilePhoto'
const icons = { user: UserRound, education: GraduationCap, location: MapPin, heart: Heart }
export function About() {
  return (
    <section id="about" className="section-bordered">
      <div className="container about-grid grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal><ProfilePhoto/></Reveal>
        <div>
          <Reveal>
            <SectionHeading label={portfolio.about.label} title={portfolio.about.title}/>
            <div className="about-copy">{portfolio.about.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
            <div className="about-signature"><span className="signature-line"/>{portfolio.about.signature}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="about-card">
              {portfolio.about.facts.map(fact => {
                const Icon = icons[fact.icon as keyof typeof icons]
                return (
                  <div className="fact-row" key={fact.label}>
                    <div className="fact-icon"><Icon size={22} strokeWidth={1.5}/></div>
                    <div><h3>{fact.label}</h3><p>{fact.value}</p>{fact.detail && <p>{fact.detail}</p>}</div>
                  </div>
                )
              })}
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

