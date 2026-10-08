import { Card, Chip } from '@heroui/react'
import { ArrowUpRight } from 'lucide-react'
import { Github } from '../ui/BrandIcons'
import { portfolio } from '../../data/portfolio'
import type { Project } from '../../data/portfolio'
import { ActionButton } from '../ui/ActionButton'
export function ProjectCard({ project, notify }: { project: Project; notify: (message: string) => void }) {
  return (
    <Card className="project-card" role="article" aria-labelledby={'project-' + project.id}>
      <a className="project-preview" href={project.image} target="_blank" rel="noopener noreferrer" aria-label={'View full screenshot of ' + project.title}>
        <img src={project.image} alt={project.imageAlt} loading="lazy" width={project.imageWidth} height={project.imageHeight}/>
      </a>
      <Card.Header className="project-header">
        <p className="project-category">{project.category}</p>
        <Card.Title id={'project-' + project.id}>{project.title}</Card.Title>
      </Card.Header>
      <Card.Content className="project-body">
        <p>{project.description}</p>
        <div className="project-tags flex flex-wrap gap-2">
          {project.tags.map(tag => <Chip key={tag} size="sm" variant="soft" className="project-chip"><Chip.Label>{tag}</Chip.Label></Chip>)}
        </div>
      </Card.Content>
      <Card.Footer className="project-footer">
        <span className="project-status"><i/>{project.status}</span>
        <div className="flex gap-1">
          <ActionButton variant="ghost" label={'GitHub repository for ' + project.title} href={project.github} onPress={() => notify(portfolio.messages.project)}><Github size={17}/></ActionButton>
          <ActionButton variant="ghost" label={'Live demo for ' + project.title} href={project.demo} onPress={() => notify(portfolio.messages.project)}><ArrowUpRight size={20}/></ActionButton>
        </div>
      </Card.Footer>
    </Card>
  )
}

