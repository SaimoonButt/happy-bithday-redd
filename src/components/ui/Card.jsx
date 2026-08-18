import { cn } from '../../lib/cn'

/**
 * Frosted card with a coloured top edge. `tone` picks the accent so cards
 * can vary without every caller rewriting the same gradient classes.
 */
const TONES = {
  cherry: 'from-cherry-400 to-cherry-600',
  gold: 'from-gold-400 to-gold-600',
  mint: 'from-mint-400 to-cherry-400',
  plum: 'from-plum-500 to-cherry-500',
}

export function Card({ tone = 'cherry', hover = true, className, children, ...props }) {
  return (
    <div
      className={cn(
        'card-glass relative overflow-hidden rounded-3xl p-6 sm:p-7',
        'ring-1 ring-cherry-300/25 shadow-xl shadow-cherry-975/40',
        'transition-all duration-500 ease-out',
        hover &&
          'hover:-translate-y-2 hover:shadow-2xl hover:shadow-cherry-975/60 hover:ring-gold-400/60',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 top-0 h-1.5 bg-linear-to-r',
          TONES[tone] ?? TONES.cherry,
        )}
      />
      {children}
    </div>
  )
}
