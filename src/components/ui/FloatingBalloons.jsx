import { useMemo } from 'react'
import { randomInt, pickOne } from '../../lib/cn'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const BALLOONS = ['🎈', '🎈', '🎈', '🎀', '💗', '🍓', '⭐']

/**
 * Decorative balloons drifting up behind the whole page.
 * Fixed + pointer-events-none, so it never interferes with the games.
 */
export function FloatingBalloons({ count = 12 }) {
  const reduced = useReducedMotion()

  const balloons = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        emoji: pickOne(BALLOONS),
        left: randomInt(2, 96),
        delay: randomInt(0, 14000),
        duration: randomInt(14000, 26000),
        size: randomInt(22, 46),
        opacity: randomInt(25, 55) / 100,
      })),
    [count],
  )

  if (reduced) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {balloons.map((balloon) => (
        <span
          key={balloon.id}
          className="absolute bottom-0 animate-rise"
          style={{
            left: `${balloon.left}%`,
            fontSize: `${balloon.size}px`,
            opacity: balloon.opacity,
            animationDelay: `${balloon.delay}ms`,
            animationDuration: `${balloon.duration}ms`,
          }}
        >
          {balloon.emoji}
        </span>
      ))}
    </div>
  )
}
