'use client'

import Separator from '@/design-system/layout/Separator'
import type { GesturesType } from '@/types/landing-page'
import type { ReactNode } from 'react'
import DynamicCTAButton from '../cta/DynamicCTAButton'
import GestureSelector from './dailyGestures/GestureSelector'

export default function DailyGestures({
  title,
  description,
  gestures,
}: {
  title: ReactNode
  description: ReactNode
  gestures: GesturesType
}) {
  return (
    <div className="mx-auto my-20 w-full max-w-full px-4 text-center md:max-w-[850px] md:px-0">
      <h2 className="text-xl md:text-3xl">{title}</h2>

      <Separator className="mx-auto my-4 md:my-8" />

      <section className="text-sm md:text-lg">{description}</section>

      <div className="mt-10 flex w-full flex-col justify-between gap-10 md:flex-row">
        <GestureSelector gestures={gestures} />
      </div>

      <div className="mt-10 text-center">
        <DynamicCTAButton />
      </div>
    </div>
  )
}
