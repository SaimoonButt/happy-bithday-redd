import { useEffect, useState } from 'react'
import { randomInt, pickOne } from '../../lib/cn'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const COLORS = [
  'bg-cherry-500',
  'bg-cherry-600',
  'bg-cherry-300',
  'bg-gold-400',
  'bg-gold-500',
  'bg-mint-400',
  'bg-plum-500',
  'bg-white',
]

const SHAPES = ['rounded-none', 'rounded-full', 'rounded-sm']

let pieceId = 0

function makePieces(count) {
  return Array.from({ length: count }, () => ({
    id: pieceId++,
    left: randomInt(0, 100),
    delay: randomInt(0, 900),
    duration: randomInt(2400, 4200),
    width: randomInt(6, 12),
    height: randomInt(8, 18),
    drift: randomInt(-90, 90),
    color: pickOne(COLORS),
    shape: pickOne(SHAPES),
  }))
}

/**
 * Full-screen confetti burst. Bump `trigger` (any changing number) to fire.
 * Pieces clean themselves up, so it can be fired as often as you like.
 */
export function Confetti({ trigger = 0, count = 60 }) {
  const [pieces, setPieces] = useState([])
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!trigger || reduced) return

    const batch = makePieces(count)
    setPieces((current) => [...current, ...batch])

    const ids = new Set(batch.map((piece) => piece.id))
    const timer = setTimeout(
      () => setPieces((current) => current.filter((piece) => !ids.has(piece.id))),
      5200,
    )
    return () => clearTimeout(timer)
  }, [trigger, count, reduced])

  if (!pieces.length) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={`absolute top-0 animate-fall ${piece.color} ${piece.shape}`}
          style={{
            left: `${piece.left}%`,
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            animationDelay: `${piece.delay}ms`,
            animationDuration: `${piece.duration}ms`,
            marginLeft: `${piece.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
