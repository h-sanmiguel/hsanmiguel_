import { portfolio } from '../data/portfolio'
import { Reveal } from '../components/ui/AnimatedSection'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ActionButton } from '../components/ui/ActionButton'
import { CertificateModal } from '../components/ui/CertificateModal'
import { ArrowUpRight } from 'lucide-react'
export function Experience() {
  return (
    <section id="experience" className="section-bordered">
      <div className="container experience-grid grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <SectionHeading {...portfolio.experience}/>
          <div className="experience-note"><span className="note-mark" aria-hidden="true">↗</span><p>{portfolio.experience.note}</p></div>
        </Reveal>
        <ol className="timeline">
          {portfolio.experience.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.05}>
                <div className="timeline-marker"/>
                <div className="timeline-meta"><span>{item.date}</span><span>{item.type}</span></div>
                <h3>{item.title}</h3>
                {item.subtitle && <p className="timeline-subtitle">{item.subtitle}</p>}
                <p className="timeline-description">{item.description}</p>
                {item.href && (item.certificatePreview && item.certificateAlt
                  ? <CertificateModal title={item.title} issuer={item.subtitle} date={item.date} pdf={item.href} preview={item.certificatePreview} previewAlt={item.certificateAlt} triggerLabel={item.linkLabel}/>
                  : <ActionButton variant="ghost" href={item.href} className="timeline-link">{item.linkLabel}<ArrowUpRight size={14}/></ActionButton>)}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

