import { Suspense } from 'react'
import MobileCircles from './icons/MobileCircles'
import TempDesktop from './icons/TempDesktop'

export default async function Icons() {
  return (
    <>
      <Suspense fallback={null}>
        <TempDesktop />
      </Suspense>
      <MobileCircles />
    </>
  )
}
