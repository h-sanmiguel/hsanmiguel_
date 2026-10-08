import { useState } from 'react'
import { UserRound } from 'lucide-react'
import { portfolio } from '../../data/portfolio'

export function ProfilePhoto() {
  const { photo } = portfolio.about
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const showPhoto = photo.src !== null && photo.src !== failedSource

  return (
    <figure className="profile-photo" aria-label={photo.alt}>
      <div className="profile-photo-frame">
        {showPhoto ? (
          <img
            src={photo.src!}
            alt={photo.alt}
            width="600"
            height="750"
            loading="lazy"
            onError={() => setFailedSource(photo.src)}
          />
        ) : (
          <div className="profile-photo-placeholder" role="img" aria-label="Profile photo placeholder">
            <div className="profile-photo-outline" aria-hidden="true"><UserRound size={72} strokeWidth={1}/></div>
            <span>{portfolio.name}</span>
          </div>
        )}
        <span className="profile-photo-label">{photo.label}</span>
      </div>
      <figcaption>{photo.caption}</figcaption>
    </figure>
  )
}
