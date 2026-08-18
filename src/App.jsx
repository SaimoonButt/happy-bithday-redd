import { useCallback, useState } from 'react'
import { birthday, wishes, tickerLines } from './birthday.config'

import { Hero } from './components/Hero'
import { Ticker } from './components/Ticker'
import { WishCard } from './components/WishCard'
import { Footer } from './components/Footer'
import { RunawayGift } from './components/games/RunawayGift'
import { CandleChaos } from './components/games/CandleChaos'

import { Section } from './components/ui/Section'
import { Confetti } from './components/ui/Confetti'
import { FloatingBalloons } from './components/ui/FloatingBalloons'

function App() {
  const [celebrations, setCelebrations] = useState(0)

  // A counter rather than a boolean, so repeat bursts always re-fire.
  const celebrate = useCallback(() => setCelebrations((count) => count + 1), [])

  return (
    <>
      <FloatingBalloons />
      <Confetti trigger={celebrations} />

      <main className="relative z-10">
        <Hero birthday={birthday} onCelebrate={celebrate} />

        <Ticker lines={tickerLines} />

        <Section
          id="wishes"
          eyebrow="the sappy part"
          title="A few wishes for you"
          subtitle="Read them slowly. I wrote them at a suspicious hour."
        >
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {wishes.map((wish, index) => (
              <WishCard key={wish.title} wish={wish} index={index} />
            ))}
          </div>
        </Section>

        <Section
          id="games"
          eyebrow="the punishment"
          title="Two extremely annoying games"
          subtitle="Consider this the entry fee for your birthday message. Good luck."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <RunawayGift onWin={celebrate} />
            <CandleChaos onWin={celebrate} />
          </div>
        </Section>

        <Footer birthday={birthday} onCelebrate={celebrate} />
      </main>
    </>
  )
}

export default App
