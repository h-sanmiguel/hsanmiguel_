import { useState } from 'react'
import { ArrowDown, ArrowRight, Download, Terminal } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from '../components/ui/AnimatedSection'
import { ActionButton } from '../components/ui/ActionButton'
export function AmbientOrb({ small = false }: { small?: boolean }) {
  return <div className={'ambient-orb ' + (small ? 'orb-small' : '')} aria-hidden="true"><div className="orb-grid"/><i className="orb-star star-one"/><i className="orb-star star-two"/><i className="orb-star star-three"/><i className="orb-star star-four"/></div>
}
export function Hero({ notify }: { notify: (message: string) => void }) {
  const [pending, setPending] = useState(false)
  async function downloadCV() {
    if (pending) return
    setPending(true)
    try {
      const response = await fetch(portfolio.cvUrl)
      if (!response.ok || !response.headers.get('content-type')?.includes('application/pdf')) { notify(portfolio.messages.cv); return }
      const url = URL.createObjectURL(await response.blob())
      const link = document.createElement('a'); link.href = url; link.download = portfolio.name + '-CV.pdf'; link.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch { notify(portfolio.messages.cvError) } finally { setPending(false) }
  }
  return <section id="home" className="hero-section"><div className="container hero-inner"><AmbientOrb/><div className="hero-content"><Reveal><div className="intro-badge"><Terminal size={13}/><span>{portfolio.badge}</span></div></Reveal><Reveal delay={0.08}><h1>{portfolio.hero.heading}<br/><span className="hero-second">{portfolio.hero.secondLineLead}<span className="violet-text">{portfolio.hero.secondLineAccent}</span></span></h1></Reveal><Reveal delay={0.16}><p className="hero-description">{portfolio.hero.intro}</p></Reveal><Reveal delay={0.24}><div className="hero-actions flex flex-wrap gap-3"><ActionButton variant="primary" href="#projects">{portfolio.hero.projectsButton}<ArrowRight size={17}/></ActionButton><ActionButton onPress={downloadCV}><Download size={17}/>{pending ? 'Preparing CV…' : portfolio.hero.cvButton}</ActionButton></div></Reveal><Reveal delay={0.32}><a href="#about" className="scroll-indicator"><span className="scroll-arrow"><ArrowDown size={20}/></span>{portfolio.hero.scrollLabel}</a></Reveal></div><span className="hero-side-note">{portfolio.hero.note}</span></div></section>
}

