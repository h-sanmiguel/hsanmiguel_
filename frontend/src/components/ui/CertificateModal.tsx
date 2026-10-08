import { useId, useState } from 'react'
import { Button, Link, Modal, buttonVariants } from '@heroui/react'
import { Download, Scan, ZoomIn } from 'lucide-react'

interface CertificateModalProps {
  title: string
  issuer: string
  date: string
  pdf: string
  preview: string
  previewAlt: string
  triggerLabel: string
}

export function CertificateModal({ title, issuer, date, pdf, preview, previewAlt, triggerLabel }: CertificateModalProps) {
  const [zoomed, setZoomed] = useState(false)
  const [previewFailed, setPreviewFailed] = useState(false)
  const descriptionId = useId()

  return (
    <Modal onOpenChange={() => { setZoomed(false); setPreviewFailed(false) }}>
      <Button variant="ghost" className="action-button timeline-link" aria-label={`${triggerLabel}: ${title}`}>
        {triggerLabel}<ZoomIn size={14}/>
      </Button>
      <Modal.Backdrop variant="blur" className="certificate-backdrop">
        <Modal.Container placement="center" size="cover" scroll="inside" className="certificate-container">
          <Modal.Dialog className="certificate-dialog" aria-describedby={descriptionId}>
            <Modal.CloseTrigger aria-label="Close certificate" className="certificate-close"/>
            <Modal.Header className="certificate-header">
              <Modal.Heading>{title} certificate</Modal.Heading>
              <p id={descriptionId}>{issuer} · Completed {date}</p>
            </Modal.Header>
            <Modal.Body className="certificate-body">
              {previewFailed
                ? <p className="certificate-error" role="status">The preview couldn’t load. You can download the original certificate below.</p>
                : <div className="certificate-preview" tabIndex={0} role="region" aria-label="Certificate preview. When zoomed, scroll to read the full certificate.">
                    <img src={preview} alt={previewAlt} width={1488} height={1008} className={zoomed ? 'certificate-image is-zoomed' : 'certificate-image'} onError={() => setPreviewFailed(true)}/>
                  </div>}
            </Modal.Body>
            <Modal.Footer className="certificate-footer">
              {!previewFailed && <Button variant="ghost" className="action-button certificate-zoom" aria-pressed={zoomed} onPress={() => setZoomed(value => !value)}>
                {zoomed ? <Scan size={16}/> : <ZoomIn size={16}/>}{zoomed ? 'Fit to screen' : 'Zoom in'}
              </Button>}
              <Link href={pdf} download className={buttonVariants({ variant: 'outline' }) + ' action-button'}><Download size={16}/>Download PDF</Link>
              <Button variant="primary" className="action-button" slot="close">Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
