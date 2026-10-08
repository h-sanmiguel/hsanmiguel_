import { useEffect, useState } from 'react'
import { Disclosure } from '@heroui/react'
import { Menu, X } from 'lucide-react'
import { Github, Linkedin } from '../ui/BrandIcons'
import { portfolio } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ActionButton } from '../ui/ActionButton'
const ids = portfolio.navigation.map(item => item.id)
export function Brand() {
  return <a href="#home" className="brand" aria-label={portfolio.name + ', back to home'}>{portfolio.brand.name}<span>{portfolio.brand.suffix}</span></a>
}
export function Navbar({ notify }: { notify: (message: string) => void }) {
  const [expanded, setExpanded] = useState(false)
  const active = useActiveSection(ids)
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpanded(false) }
    const resize = () => { if (window.innerWidth >= 768) setExpanded(false) }
    window.addEventListener('keydown', close); window.addEventListener('resize', resize)
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('resize', resize) }
  }, [])
  const links = portfolio.navigation.map(item => <a key={item.id} href={'#' + item.id} aria-current={active === item.id ? 'location' : undefined} onClick={() => setExpanded(false)}>{item.label}<span className="nav-dot"/></a>)
  const socials = <><ActionButton variant="ghost" label="GitHub profile" href={portfolio.github} onPress={() => notify(portfolio.messages.github)}><Github size={18}/></ActionButton><ActionButton variant="ghost" label="LinkedIn profile" href={portfolio.linkedin} onPress={() => notify(portfolio.messages.linkedin)}><Linkedin size={18}/></ActionButton></>
  return <header className="site-header"><div className="container nav-inner"><Brand/><nav className="desktop-nav" aria-label="Main navigation">{links}</nav><div className="nav-socials">{socials}<span className="nav-divider"/><span className="nav-code" aria-hidden="true">&lt;/&gt;</span></div>
    <Disclosure className="mobile-menu" isExpanded={expanded} onExpandedChange={setExpanded}><Disclosure.Heading><Disclosure.Trigger aria-label={expanded ? 'Close navigation' : 'Open navigation'} className="menu-toggle">{expanded ? <X size={22}/> : <Menu size={22}/>}</Disclosure.Trigger></Disclosure.Heading><Disclosure.Content className="mobile-menu-content"><nav aria-label="Mobile navigation">{links}</nav><div className="mobile-socials">{socials}</div></Disclosure.Content></Disclosure>
  </div></header>
}

