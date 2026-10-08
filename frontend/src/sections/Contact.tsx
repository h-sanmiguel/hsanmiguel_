import { ArrowUpRight, Mail } from 'lucide-react'
import { Github, Linkedin } from '../components/ui/BrandIcons'
import { portfolio } from '../data/portfolio'
import { Reveal } from '../components/ui/AnimatedSection'
import { ActionButton } from '../components/ui/ActionButton'
import { AmbientOrb } from './Hero'
import { ContactForm } from '../components/ui/ContactForm'
export function Contact({ notify }: { notify: (message: string) => void }) {
  return <section id="contact" className="contact-section section-bordered"><div className="container contact-inner"><AmbientOrb small/><div className="contact-grid"><Reveal><p className="eyebrow">{portfolio.contact.label}</p><h2>{portfolio.contact.title}<br/><span>{portfolio.contact.secondLine}</span></h2><p className="contact-description">{portfolio.contact.description}</p><div className="contact-actions flex flex-wrap gap-3"><ActionButton variant="primary" href={portfolio.email ? 'mailto:' + portfolio.email : null} onPress={() => notify(portfolio.messages.email)}><Mail size={17}/>{portfolio.contact.emailButton}<ArrowUpRight size={16}/></ActionButton><ActionButton href={portfolio.github} onPress={() => notify(portfolio.messages.github)}><Github size={18}/>GitHub</ActionButton><ActionButton href={portfolio.linkedin} onPress={() => notify(portfolio.messages.linkedin)}><Linkedin size={17}/>LinkedIn</ActionButton></div>{portfolio.email && <a className="contact-email" href={'mailto:' + portfolio.email}>{portfolio.email}</a>}<p className="contact-note">{portfolio.contact.note}</p></Reveal><Reveal delay={0.1}><ContactForm/></Reveal></div></div></section>
}

