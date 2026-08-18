import { cn } from '../../lib/cn'
import { Badge } from './Badge'
import { Reveal } from './Reveal'

/**
 * Page section with a consistent heading block and max-width.
 * Every band of the page uses this so rhythm and gutters stay uniform.
 */
export function Section({ id, eyebrow, title, subtitle, className, children }) {
  return (
    <section
      id={id}
      className={cn('mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24', className)}
    >
      {(eyebrow || title) && (
        <Reveal className="mb-10 text-center sm:mb-14">
          {eyebrow && <Badge tone="gold">{eyebrow}</Badge>}
          {title && (
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mx-auto mt-3 max-w-xl text-base text-pretty text-ink-soft sm:text-lg">
              {subtitle}
            </p>
          )}
        </Reveal>
      )}
      {children}
    </section>
  )
}
