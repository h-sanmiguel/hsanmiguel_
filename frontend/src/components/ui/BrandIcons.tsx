import type { SVGProps } from 'react'
type IconProps = SVGProps<SVGSVGElement> & { size?: number }
// Lucide 1.x no longer includes brands. Keep these small brand marks local.
export function Github({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.14c-3.21.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.97.11-.75.4-1.26.74-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.16 1.18a11.05 11.05 0 0 1 5.75 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.2c0 .31.21.66.8.55A11.5 11.5 0 0 0 12 .7Z"/></svg>
}
export function Linkedin({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M5.37 7.7H1.7V22h3.67V7.7ZM3.54 1.5a2.15 2.15 0 1 0 0 4.3 2.15 2.15 0 0 0 0-4.3ZM22.3 13.62c0-3.82-2.04-5.59-4.76-5.59-2.19 0-3.17 1.2-3.72 2.04V7.7h-3.66V22h3.66v-7.1c0-1.87.35-3.69 2.67-3.69 2.3 0 2.33 2.15 2.33 3.81V22h3.48v-8.38Z"/></svg>
}
export function Figma({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" {...props}><path d="M12 2H8a4 4 0 1 0 0 8h4V2Zm0 0h4a4 4 0 1 1-4 4V2ZM12 10H8a4 4 0 0 0 0 8h4v-8Zm0 8H8a4 4 0 1 0 4 4v-4Z"/><circle cx="16" cy="14" r="4"/></svg>
}

