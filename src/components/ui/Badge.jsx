import { cn } from '../../lib/cn'

const TONES = {
  cherry: 'bg-cherry-500/25 text-cherry-200 ring-cherry-400/50',
  // Dark base rather than translucent gold — gold over red turns brown.
  gold: 'bg-cherry-975/55 text-gold-300 ring-gold-400/60',
  mint: 'bg-mint-400/18 text-mint-400 ring-mint-400/45',
  white: 'bg-cream-50/95 text-cherry-700 ring-cream-50',
}

/** Small pill label — used for the kicker, the date, and game scores. */
export function Badge({ tone = 'cherry', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5',
        'font-display text-xs font-bold tracking-widest uppercase ring-1',
        'sm:text-sm',
        TONES[tone] ?? TONES.cherry,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
