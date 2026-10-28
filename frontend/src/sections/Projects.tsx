import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from '../components/ui/AnimatedSection'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProjectCard } from '../components/cards/ProjectCard'

export function Projects({ notify }: { notify: (message: string) => void }) {
  const projects = portfolio.projects.items
  const [selected, setSelected] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; scroll: number } | null>(null)
  const dragged = useRef(false)

  const slidePosition = (index: number) => {
    const viewport = track.current!
    const slide = viewport.children[index] as HTMLElement
    return slide.offsetLeft - (viewport.clientWidth - slide.clientWidth) / 2
  }

  const nearestSlide = () => {
    const viewport = track.current!
    return projects.reduce((nearest, _, index) =>
      Math.abs(slidePosition(index) - viewport.scrollLeft) < Math.abs(slidePosition(nearest) - viewport.scrollLeft) ? index : nearest, 0)
  }

  const goTo = (index: number) => {
    const next = (index + projects.length) % projects.length
    track.current?.scrollTo({
      left: slidePosition(next),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    event.currentTarget.classList.remove('is-dragging')
    if (dragged.current) goTo(nearestSlide())
  }

  return (
    <section id="projects" className="section-bordered">
      <div className="container section-space">
        <Reveal>
          <div className="projects-heading">
            <SectionHeading {...portfolio.projects}/>
            <span className="project-count">01 — {String(projects.length).padStart(2, '0')} <ArrowDownRight size={20}/></span>
          </div>
        </Reveal>
        <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects">
          <div
            id="project-slides"
            className="project-slider"
            ref={track}
            tabIndex={0}
            aria-label="Project cards. Swipe or use the left and right arrow keys to browse."
            onScroll={() => setSelected(nearestSlide())}
            onKeyDown={event => {
              if (event.target !== event.currentTarget) return
              if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault()
                goTo(selected + (event.key === 'ArrowRight' ? 1 : -1))
              }
            }}
            onPointerDown={event => {
              dragged.current = false
              if (event.pointerType === 'mouse' && event.button === 0) {
                drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft }
              }
            }}
            onPointerMove={event => {
              if (!drag.current) return
              const distance = event.clientX - drag.current.x
              if (!dragged.current && Math.abs(distance) < 6) return
              dragged.current = true
              event.currentTarget.setPointerCapture(event.pointerId)
              event.currentTarget.classList.add('is-dragging')
              event.currentTarget.scrollLeft = drag.current.scroll - distance
            }}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            onPointerLeave={event => { if (!dragged.current) finishDrag(event) }}
            onDragStart={event => event.preventDefault()}
            onClickCapture={event => {
              if (dragged.current) {
                event.preventDefault()
                event.stopPropagation()
                dragged.current = false
              }
            }}
          >
            {projects.map((project, index) => (
              <div className="project-slide" key={project.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.title}`} data-active={selected === index}>
                <ProjectCard project={project} notify={notify}/>
              </div>
            ))}
          </div>
          <div className="project-slider-footer">
            <p className="project-slider-hint">Swipe or drag to explore</p>
            <div className="project-slider-dots" aria-label="Choose a project">
              {projects.map((project, index) => (
                <button key={project.id} type="button" aria-label={`Show ${project.title}`} aria-current={selected === index ? 'true' : undefined} aria-controls="project-slides" onClick={() => goTo(index)}><span/></button>
              ))}
            </div>
            <div className="project-slider-controls">
              <span aria-live="polite" aria-atomic="true">{String(selected + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
              <button type="button" onClick={() => goTo(selected - 1)} aria-label="Previous project" aria-controls="project-slides"><ArrowLeft size={18}/></button>
              <button type="button" onClick={() => goTo(selected + 1)} aria-label="Next project" aria-controls="project-slides"><ArrowRight size={18}/></button>
            </div>
          </div>
        </div>
        <p className="projects-footnote">{portfolio.projects.note}</p>
      </div>
    </section>
  )
}
