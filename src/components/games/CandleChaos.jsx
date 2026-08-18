import { useCallback, useEffect, useRef, useState } from 'react'
import { GameShell } from '../ui/GameShell'
import { Button } from '../ui/Button'
import { cn, randomInt } from '../../lib/cn'

const BASE_CANDLES = 7
const MAX_CANDLES = 11

/**
 * How long a candle stays out before relighting itself. Deliberately brutal:
 * at level 1 you have well under a second to clear the whole cake, and the
 * floor at 320ms keeps the top levels merely absurd rather than literally
 * impossible.
 */
function relightWindow(level) {
  const min = Math.max(320, 900 - level * 110)
  return [min, min + 420]
}

/** A gust relights one already-out candle, just to ruin your run. */
function gustDelay(level) {
  const min = Math.max(500, 1500 - level * 160)
  return randomInt(min, min + 700)
}

function makeCandles(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${count}-${index}`,
    lit: true,
    height: randomInt(52, 78), // px — uneven candles look hand-placed
  }))
}

/**
 * Annoying Game #2 — blow out every candle at once. They relight on their own
 * timers, so you have to get the last one out before the first one wakes up.
 */
export function CandleChaos({ onWin }) {
  const [level, setLevel] = useState(1)
  const [candles, setCandles] = useState(() => makeCandles(BASE_CANDLES))
  const [puffs, setPuffs] = useState(0)
  const [won, setWon] = useState(false)
  const [best, setBest] = useState(null) // fewest candles ever left burning
  const timersRef = useRef(new Map())
  const gustRef = useRef(null)

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current.clear()
    clearTimeout(gustRef.current)
  }, [])

  // Never leave a stray relight running after unmount.
  useEffect(() => clearTimers, [clearTimers])

  const litCount = candles.filter((candle) => candle.lit).length

  // Victory is "all dark at the same instant", so watch the whole set.
  useEffect(() => {
    if (won) return
    // Only record a best once they've actually put something out.
    if (litCount < candles.length) {
      setBest((current) => (current == null ? litCount : Math.min(current, litCount)))
    }
    if (litCount > 0) return
    clearTimers()
    setWon(true)
    onWin?.()
  }, [litCount, candles.length, won, clearTimers, onWin])

  // The gust: while any candle is out, keep randomly relighting one of them.
  // This is what turns "hard" into "you must be joking".
  useEffect(() => {
    if (won || litCount === candles.length) return

    gustRef.current = setTimeout(() => {
      setCandles((current) => {
        const dark = current.filter((candle) => !candle.lit)
        if (!dark.length) return current
        const victim = dark[Math.floor(Math.random() * dark.length)]
        clearTimeout(timersRef.current.get(victim.id))
        timersRef.current.delete(victim.id)
        return current.map((candle) =>
          candle.id === victim.id ? { ...candle, lit: true } : candle,
        )
      })
    }, gustDelay(level))

    return () => clearTimeout(gustRef.current)
  }, [candles, litCount, level, won])

  const blowOut = (id) => {
    if (won) return
    const target = candles.find((candle) => candle.id === id)
    if (!target?.lit) return

    setPuffs((count) => count + 1)
    setCandles((current) =>
      current.map((candle) => (candle.id === id ? { ...candle, lit: false } : candle)),
    )

    const [min, max] = relightWindow(level)
    const timer = setTimeout(() => {
      timersRef.current.delete(id)
      setCandles((current) =>
        current.map((candle) => (candle.id === id ? { ...candle, lit: true } : candle)),
      )
    }, randomInt(min, max))

    timersRef.current.set(id, timer)
  }

  const startLevel = (nextLevel) => {
    clearTimers()
    setLevel(nextLevel)
    setCandles(makeCandles(Math.min(BASE_CANDLES + nextLevel - 1, MAX_CANDLES)))
    setWon(false)
  }

  const reset = () => {
    setPuffs(0)
    setBest(null)
    startLevel(1)
  }

  return (
    <GameShell
      emoji="🕯️"
      title="Candle Chaos"
      tone="gold"
      blurb="Blow out every candle at the same time. They relight in under a second, and a draft keeps re-lighting the ones you already got. Good luck."
      stats={[
        { label: 'Level', value: level, tone: 'gold' },
        { label: 'Still lit', value: `${litCount}/${candles.length}`, tone: 'cherry' },
        { label: 'Best', value: best == null ? '—' : `${best} left`, tone: 'gold' },
        { label: 'Puffs', value: puffs, tone: 'mint' },
      ]}
      onReset={reset}
      resetLabel="Relight everything"
      footer="Nearly impossible. Not actually impossible. Probably."
    >
      <div
        className={cn(
          'relative flex h-72 w-full flex-col justify-end overflow-hidden rounded-2xl sm:h-80',
          'bg-linear-to-b from-cherry-800 via-cherry-950 to-cherry-975',
          'ring-2 ring-gold-400/35 ring-inset',
          won && 'animate-glow',
        )}
      >
        {won ? (
          <div className="animate-pop-in absolute inset-0 grid place-content-center gap-3 px-6 text-center">
            <p className="text-6xl sm:text-7xl">✨</p>
            <p className="font-display text-2xl font-extrabold text-gold-300 sm:text-3xl">
              All out! Make a wish 🤞
            </p>
            <p className="text-sm text-ink-soft sm:text-base">
              Level {level} cleared in {puffs} puffs.
              {candles.length < MAX_CANDLES
                ? ' Ready for a harder cake?'
                : ' You have beaten the final cake. Legend.'}
            </p>
            {candles.length < MAX_CANDLES && (
              <Button
                variant="gold"
                size="sm"
                className="mx-auto"
                onClick={() => startLevel(level + 1)}
              >
                Level {level + 1} →
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* candles */}
            <div className="touch-none-safe flex flex-1 items-end justify-center gap-2 px-4 pb-1 sm:gap-4">
              {candles.map((candle) => (
                <Candle key={candle.id} candle={candle} onBlow={() => blowOut(candle.id)} />
              ))}
            </div>

            {/* cake */}
            <div aria-hidden="true" className="relative h-24 w-full sm:h-28">
              <div className="absolute inset-x-3 top-0 h-7 rounded-t-2xl bg-linear-to-b from-cream-50 to-cherry-100 shadow-inner sm:inset-x-8" />
              <div className="absolute inset-x-3 top-5 h-6 rounded-full bg-cherry-400/80 blur-[1px] sm:inset-x-8" />
              <div className="absolute inset-x-3 top-6 bottom-0 rounded-b-3xl bg-linear-to-b from-cherry-500 to-cherry-800 sm:inset-x-8" />
              <div className="absolute inset-x-6 top-10 flex justify-around sm:inset-x-12">
                {['🍓', '🍒', '🍓', '🍒', '🍓'].map((berry, index) => (
                  <span key={index} className="text-sm opacity-90 sm:text-base">
                    {berry}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </GameShell>
  )
}

/** One candle: wax stick, a flickering flame, and a puff of smoke when out. */
function Candle({ candle, onBlow }) {
  return (
    <button
      type="button"
      onPointerDown={onBlow}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onBlow()
        }
      }}
      aria-label={candle.lit ? 'Blow out this candle' : 'Candle is out'}
      aria-pressed={!candle.lit}
      className="group relative flex cursor-pointer flex-col items-center justify-end rounded-lg px-1 pt-10 transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      {/* flame / smoke */}
      <span className="relative mb-0.5 flex h-8 w-6 items-end justify-center">
        {candle.lit ? (
          <>
            <span className="absolute bottom-1 h-7 w-7 animate-glow rounded-full bg-gold-400/40 blur-md" />
            <span className="animate-flicker relative h-6 w-3.5 rounded-full rounded-t-full bg-linear-to-t from-cherry-500 via-gold-500 to-gold-300 shadow-[0_0_12px_2px_rgba(247,183,51,0.6)]" />
          </>
        ) : (
          <span className="animate-float-slow h-4 w-4 rounded-full bg-ink-soft/25 blur-[3px]" />
        )}
      </span>

      {/* wax */}
      <span
        style={{ height: `${candle.height}px` }}
        className={cn(
          'w-4 rounded-t-md rounded-b-sm shadow-md transition-all duration-300 sm:w-5',
          'bg-[repeating-linear-gradient(45deg,var(--color-cherry-500)_0_8px,var(--color-cream-50)_8px_16px)]',
          candle.lit ? 'opacity-100' : 'opacity-70 saturate-50',
        )}
      />
    </button>
  )
}
