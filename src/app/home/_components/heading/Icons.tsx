'use client'

import { useIsClient } from '@/hooks/useIsClient'
import Circle from './icons/Circle'

const distanceBetweenIcons = 5
const numberOfCircles = 7
const circles: number[] = []
for (let i = 0; i < numberOfCircles; i++) {
  circles.push(i * distanceBetweenIcons)
}

export default function Icons() {
  const isClient = useIsClient()
  const isMobile = isClient && window.innerWidth < 768

  if (!isClient || isMobile) return null
  return (
    <div
      className="absolute left-1/2 top-1/2 hidden h-1/2 w-1/2 md:block"
      aria-hidden="true">
      {circles.map((distance) => (
        <Circle key={distance} distance={distance} />
      ))}
    </div>
  )
}
