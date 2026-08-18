import { useCallback, useRef, useState } from 'react'
import { GameShell } from '../ui/GameShell'
import { Button } from '../ui/Button'
import { cn, randomInt } from '../../lib/cn'

/** How many dodges before the gift gives up and lets itself be caught. */
const DODGES_TO_WIN = 12

const TAUNTS = [
  'Nope.',
  'Too slow!',
  'Not today.',
  'Missed me!',
  'Try harder 😌',
  'Was that your best?',
  'Getting warmer... no.',
  'Skill issue, honestly.',
  'You clicked AIR.',
  'Almost! (not really)',
  'Okay this is embarrassing.',
  'Fine, one more...',
]

/** Keeps the gift inside the board, away from the edges. */
function randomSpot() {
  return { x: randomInt(14, 86), y: randomInt(18, 82) }
}

/**
 * Annoying Game #1 — a gift button that refuses to be clicked.
 * Mouse: it flees when the cursor gets close. Touch: it teleports on tap.
 * It surrenders after DODGES_TO_WIN evasions so nobody rage-quits forever.
 */
export function RunawayGift({ onWin }) {
  const boardRef = useRef(null)
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const [dodges, setDodges] = useState(0)
  const [taunt, setTaunt] = useState(null)
  const [won, setWon] = useState(false)

  const surrendered = dodges >= DODGES_TO_WIN

  const dodge = useCallback(() => {
    setDodges((count) => {
      const next = count + 1
      setTaunt(TAUNTS[Math.min(next - 1, TAUNTS.length - 1)])
      return next
    })
    setSpot((current) => {
      // Force a genuinely different corner instead of a 2px twitch.
      let next = randomSpot()
      let guard = 0
      while (Math.hypot(next.x - current.x, next.y - current.y) < 34 && guard++ < 12) {
        next = randomSpot()
      }
      return next
    })
  }, [])

  /** Mouse only — flee when the pointer enters the gift's personal space. */
  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse' || surrendered || won) return

    const board = boardRef.current
    if (!board) return

    const rect = board.getBoundingClientRect()
    const cursorX = event.clientX - rect.left
    const cursorY = event.clientY - rect.top
    const giftX = (spot.x / 100) * rect.width
    const giftY = (spot.y / 100) * rect.height

    // Nervier every time it escapes.
    const panicRadius = 70 + dodges * 4
    if (Math.hypot(cursorX - giftX, cursorY - giftY) < panicRadius) dodge()
  }

  const handleGiftClick = () => {
    if (surrendered) {
      setWon(true)
      setTaunt(null)
      onWin?.()
      return
    }
    dodge() // covers touch taps, keyboard Enter, and lucky mouse clicks
  }

  const reset = () => {
    setSpot({ x: 50, y: 50 })
    setDodges(0)
    setTaunt(null)
    setWon(false)
  }

  return (
    <GameShell
      emoji="🎁"
      title="Catch the Gift"
      tone="cherry"
      blurb="Your present is in there. It does not want to be your present. Click it anyway."
      stats={[
        { label: 'Dodges', value: `${Math.min(dodges, DODGES_TO_WIN)}/${DODGES_TO_WIN}`, tone: 'cherry' },
        { label: 'Status', value: won ? 'Caught 🏆' : surrendered ? 'Tired 😮‍💨' : 'Smug 😏', tone: 'gold' },
      ]}
      onReset={reset}
      resetLabel="Release the gift"
      footer="Tip: on a phone, just keep tapping it. It hates that."
    >
      <div
        ref={boardRef}
        onPointerMove={handlePointerMove}
        className={cn(
          'relative h-72 w-full overflow-hidden rounded-2xl sm:h-80',
          'bg-linear-to-br from-cherry-700 via-cherry-900 to-cherry-975',
          'ring-2 ring-cherry-400/35 ring-inset',
          won && 'animate-glow',
        )}
      >
        {/* soft blobs so the board isn't a flat rectangle */}
        <span
          aria-hidden="true"
          className="animate-float-slow absolute -top-10 -left-8 h-40 w-40 rounded-full bg-cherry-400/35 blur-2xl"
        />
        <span
          aria-hidden="true"
          className="animate-float absolute -right-6 -bottom-10 h-44 w-44 rounded-full bg-cherry-500/30 blur-2xl"
        />

        {taunt && !won && (
          <p
            key={dodges}
            className="animate-pop-in absolute inset-x-0 top-4 text-center font-display text-lg font-bold text-cherry-200 sm:text-xl"
          >
            {taunt}
          </p>
        )}

        {won ? (
          <div className="animate-pop-in absolute inset-0 grid place-content-center gap-3 px-6 text-center">
            <p className="text-6xl sm:text-7xl">🎉</p>
            <p className="font-display text-2xl font-extrabold text-gold-300 sm:text-3xl">
              You caught it!
            </p>
            <p className="text-sm text-ink-soft sm:text-base">
              Inside the box: another year of putting up with me. No refunds.
            </p>
            <Button variant="soft" size="sm" className="mx-auto" onClick={reset}>
              Let it escape again
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleGiftClick}
            onFocus={(event) => {
              // Keyboard users get to chase it too — but a mouse click already
              // calls dodge(), so don't let the focus that follows it count twice.
              if (!surrendered && event.target.matches(':focus-visible')) dodge()
            }}
            aria-label={surrendered ? 'Claim the gift' : 'Try to catch the gift'}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-none',
              'rounded-full px-5 py-3 font-display text-base font-bold whitespace-nowrap sm:text-lg',
              'shadow-lg transition-all duration-200 ease-out will-change-transform',
              surrendered
                ? 'animate-glow bg-linear-to-b from-gold-400 to-gold-600 text-cherry-900 shadow-gold-600/40 hover:scale-110'
                : 'bg-linear-to-b from-cherry-300 to-cherry-500 text-cherry-975 ring-2 ring-cream-50/40 shadow-cherry-975/60',
            )}
          >
            {surrendered ? '🎁 Fine. Take it.' : '🎁 Click me'}
          </button>
        )}
      </div>
    </GameShell>
  )
}
