import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'

/** The opening screen: name, date, one warm paragraph, two calls to action. */
export function Hero({ birthday, onCelebrate }) {
  const { name, date, kicker, intro } = birthday

  return (
    <header className="relative mx-auto flex min-h-[88svh] w-full max-w-5xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
      {/* glow behind the headline */}
      <span
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cherry-400/45 blur-3xl sm:h-96 sm:w-96"
      />

      <Reveal className="relative">
        <Badge tone="white" className="shadow-md shadow-cherry-975/40">
          🎊 {kicker}
        </Badge>
      </Reveal>

      <Reveal delay={100} className="relative mt-6">
        <p className="font-display text-2xl font-bold text-cherry-200 sm:text-3xl">
          Happy Birthday,
        </p>
        <h1 className="text-shimmer animate-shimmer mt-1 font-display text-6xl font-extrabold tracking-tight text-balance sm:text-7xl md:text-8xl">
          {name}!
        </h1>
      </Reveal>

      {date && (
        <Reveal delay={180} className="relative mt-6">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="animate-float text-4xl sm:text-5xl">
              🎂
            </span>
            <Badge tone="gold" className="px-5 py-2 text-base sm:text-lg">
              📅 {date}
            </Badge>
            <span
              aria-hidden="true"
              className="animate-float-slow text-4xl sm:text-5xl"
            >
              🎈
            </span>
          </div>
        </Reveal>
      )}

      <Reveal delay={260} className="relative mt-7 max-w-xl">
        <p className="text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">
          {intro}
        </p>
      </Reveal>

      <Reveal
        delay={340}
        className="relative mt-9 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Button size="lg" onClick={onCelebrate} className="w-full sm:w-auto">
          🎉 Throw confetti
        </Button>
        <Button as="a" href="#games" variant="soft" size="lg" className="w-full sm:w-auto">
          🎮 Play something annoying
        </Button>
      </Reveal>

      <Reveal
        delay={440}
        className="relative mt-14 text-sm font-semibold tracking-widest text-cherry-200/80 uppercase"
      >
        <span className="animate-float inline-block">↓ scroll ↓</span>
      </Reveal>
    </header>
  )
}
