import { cn } from '../../lib/cn'

const VARIANTS = {
  // Brighter than the page behind it, with a warm rim so it never sinks in.
  primary:
    'bg-linear-to-b from-cherry-400 to-cherry-600 text-white ring-2 ring-cream-50/30 shadow-lg shadow-cherry-975/50 hover:shadow-xl hover:shadow-cherry-500/40 hover:brightness-110',
  gold: 'bg-linear-to-b from-gold-400 to-gold-600 text-cherry-900 shadow-lg shadow-gold-600/30 hover:shadow-xl hover:shadow-gold-600/40 hover:brightness-105',
  soft: 'bg-cream-50/95 text-cherry-700 ring-2 ring-gold-400/50 shadow-md shadow-cherry-975/40 hover:bg-cream-50 hover:ring-gold-400',
  ghost: 'bg-transparent text-cherry-200 hover:bg-cherry-500/25',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

/**
 * The one button in the app. Everything clickable routes through here so
 * hover, press, focus and disabled states stay identical everywhere.
 */
export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-display font-bold tracking-wide',
        'transition-all duration-300 ease-out will-change-transform',
        'hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
