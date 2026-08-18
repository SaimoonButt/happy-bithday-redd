import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'

/**
 * Fades + lifts its children the first time they scroll into view.
 * `delay` staggers siblings (pass the map index * 80 or so).
 */
export function Reveal({ delay = 0, className, children, ...props }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect() // reveal once, never re-hide
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-out motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-[2px]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
