import { Card } from './ui/Card'
import { Reveal } from './ui/Reveal'

/** One wish. Purely presentational — content comes from birthday.config.js. */
export function WishCard({ wish, index = 0 }) {
  return (
    <Reveal delay={index * 90} className="h-full">
      <Card tone={wish.tone} className="group h-full">
        <span
          aria-hidden="true"
          className="inline-block text-4xl transition-transform duration-500 ease-out group-hover:scale-125 group-hover:-rotate-12 sm:text-5xl"
        >
          {wish.emoji}
        </span>
        <h3 className="mt-4 text-xl font-extrabold sm:text-2xl">{wish.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-soft sm:text-base">
          {wish.text}
        </p>
      </Card>
    </Reveal>
  )
}
