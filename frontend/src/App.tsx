import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@heroui/react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { Info, X } from 'lucide-react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { TechStack } from './sections/TechStack'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Contact } from './sections/Contact'
import { Analytics } from "@vercel/analytics/next"

export default function App() {
  const [message, setMessage] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const notify = useCallback((text: string) => { if (timer.current) clearTimeout(timer.current); setMessage(text); timer.current = setTimeout(() => setMessage(''), 7000) }, [])
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  return <MotionConfig reducedMotion="user"><a href="#main" className="skip-link">Skip to content</a><Navbar notify={notify}/><main id="main"><Hero notify={notify}/><About/><TechStack/><Projects notify={notify}/><Experience/><Contact notify={notify}/></main><Footer notify={notify}/><div className="notification-container" role="status" aria-live="polite" aria-atomic="true"><AnimatePresence>{message && <motion.div className="notification" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}><Info size={20}/><p>{message}</p><Button variant="ghost" isIconOnly aria-label="Dismiss notification" onPress={() => setMessage('')}><X size={17}/></Button></motion.div>}</AnimatePresence></div><Analytics/></MotionConfig>
}
