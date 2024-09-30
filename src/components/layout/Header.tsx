'use client'

import HeaderDesktop from './header/HeaderDesktop'

type Props = {
  isSticky?: boolean
}
export default function Header({ isSticky = true }: Props) {
  return (
    <>
      {/* Displayed only on mobile (screens < 768px) */}
      <div className="h-24 lg:hidden"></div>
      {/* Displayed only on desktop */}
      <HeaderDesktop isSticky={isSticky} />
    </>
  )
}
