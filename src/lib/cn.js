/**
 * Joins class names, dropping anything falsy.
 * Keeps component call sites readable without pulling in a dependency.
 *
 *   cn('p-4', isOpen && 'bg-cherry-500', className)
 */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

/** Inclusive random integer, used by the games and the confetti. */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Picks one item at random. */
export function pickOne(list) {
  return list[Math.floor(Math.random() * list.length)]
}
