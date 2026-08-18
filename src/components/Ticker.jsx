/**
 * Infinite scrolling band of one-liners. The list is rendered twice so the
 * -50% marquee loop lands exactly where it started, with no visible seam.
 */
export function Ticker({ lines }) {
  const loop = [...lines, ...lines]

  return (
    <div className="relative overflow-hidden border-y border-gold-400/35 bg-linear-to-r from-cherry-975 via-cherry-800 to-cherry-975 py-3 shadow-lg shadow-cherry-975/50">
      <div className="animate-marquee flex w-max whitespace-nowrap motion-reduce:animate-none">
        {/* Spacing lives on the items, not the flex gap, so the two copies are
            exactly equal width and the -50% loop is seamless. */}
        {loop.map((line, index) => (
          <span
            key={index}
            className="flex items-center gap-8 pr-8 font-display text-sm font-semibold tracking-wide text-cream-50 sm:text-base"
          >
            {line}
            <span aria-hidden="true" className="text-gold-300">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
