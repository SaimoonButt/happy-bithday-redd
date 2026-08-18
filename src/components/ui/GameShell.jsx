import { Badge } from './Badge'
import { Button } from './Button'
import { Card } from './Card'
import { cn } from '../../lib/cn'

/**
 * Shared chrome for both games: heading, stat pills, the board slot, and a
 * reset. Each game only has to bring its own board and its own rules.
 */
export function GameShell({
  emoji,
  title,
  blurb,
  tone = 'cherry',
  stats = [],
  onReset,
  resetLabel = 'Start over',
  footer,
  className,
  children,
}) {
  return (
    <Card tone={tone} hover={false} className={cn('flex h-full flex-col gap-5', className)}>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2.5 text-2xl font-extrabold sm:text-3xl">
            <span className="animate-wiggle inline-block text-3xl sm:text-4xl">
              {emoji}
            </span>
            {title}
          </h3>
          <p className="mt-2 max-w-md text-sm text-pretty text-ink-soft sm:text-base">
            {blurb}
          </p>
        </div>

        {stats.length > 0 && (
          // No shrink-0: on narrow cards the pills need to wrap rather than
          // run off the edge.
          <div className="flex flex-wrap gap-2">
            {stats.map((stat) => (
              <Badge key={stat.label} tone={stat.tone ?? 'cherry'}>
                {stat.label} {stat.value}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {children}

      {/* mt-auto keeps both game cards' footers on the same line when they sit
          side by side and their headers differ in height. */}
      <footer className="mt-auto flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-ink-soft italic sm:text-sm">{footer}</p>
        {onReset && (
          <Button variant="soft" size="sm" onClick={onReset}>
            ↺ {resetLabel}
          </Button>
        )}
      </footer>
    </Card>
  )
}
