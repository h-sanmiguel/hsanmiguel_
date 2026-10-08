import { Button, Link, buttonVariants } from '@heroui/react'
import type { ReactNode } from 'react'
export function ActionButton({ children, href, onPress, className = '', variant = 'outline', label }: {
  children: ReactNode; href?: string | null; onPress?: () => void; className?: string; variant?: 'primary' | 'outline' | 'ghost'; label?: string;
}) {
  const external = href?.startsWith('https://')
  return href
    ? <Link className={buttonVariants({ variant }) + ' action-button ' + className} aria-label={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{children}</Link>
    : <Button variant={variant} className={'action-button ' + className} aria-label={label} onPress={onPress}>{children}</Button>
}

