import { ArrowUp } from 'lucide-react'
import { Github, Linkedin } from '../ui/BrandIcons'
import { portfolio } from '../../data/portfolio'
import { Brand } from './Navbar'
import { ActionButton } from '../ui/ActionButton'
export function Footer({ notify }: { notify: (message: string) => void }) {
  return <footer className="site-footer"><div className="container footer-inner"><div><Brand/><p>{portfolio.footer.tagline}</p></div><div className="footer-credit"><p>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p><p>{portfolio.footer.credit}</p></div><div className="footer-socials"><ActionButton variant="ghost" label="GitHub profile" href={portfolio.github} onPress={() => notify(portfolio.messages.github)}><Github size={18}/></ActionButton><ActionButton variant="ghost" label="LinkedIn profile" href={portfolio.linkedin} onPress={() => notify(portfolio.messages.linkedin)}><Linkedin size={18}/></ActionButton><ActionButton href="#home" className="back-top" label="Back to top"><ArrowUp size={18}/></ActionButton></div></div></footer>
}

