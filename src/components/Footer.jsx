import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { Reveal } from './ui/Reveal'

/** Closing note + one last confetti button, because why not. */
export function Footer({ birthday, onCelebrate }) {
  return (
    <footer className="mx-auto w-full max-w-3xl px-5 pt-6 pb-20 sm:px-8">
      <Reveal>
        <Card tone="gold" hover={false} className="text-center">
          <p aria-hidden="true" className="animate-float text-5xl sm:text-6xl">
            💌
          </p>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
            One more time: Happy Birthday, {birthday.name}!
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-pretty text-ink-soft sm:text-base">
            Hope this year is kind to you, and that the games above were exactly as
            irritating as intended.
          </p>

          <Button variant="gold" className="mt-6" onClick={onCelebrate}>
            🎊 One last burst
          </Button>

          <p className="mt-7 font-display text-base font-bold text-gold-300">
            With love, {birthday.from} 💗
          </p>
        </Card>
      </Reveal>
    </footer>
  )
}
