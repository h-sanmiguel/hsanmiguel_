import { useEffect, useState } from 'react'
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const update = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12) { setActive(ids.at(-1) ?? ''); return }
      const current = ids.filter(id => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 180)
      setActive(current.at(-1) ?? '')
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [ids])
  return active
}

