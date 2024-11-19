'use client'

import Trans from '@/components/translation/Trans'
import { baseClassNames, sizeClassNames } from '@/design-system/inputs/Button'
import type { GesturesType } from '@/types/landing-page'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function GestureSelector({
  gestures,
}: {
  gestures: GesturesType
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(gestures)[0]
  )
  return (
    <>
      <div className="flex-1 text-left">
        <ul className="mb-8 flex gap-1 overflow-x-auto overflow-y-visible px-1 py-2 md:overflow-x-hidden md:py-0">
          {Object.keys(gestures).map((categoryName: string) => (
            <li key={categoryName}>
              <button
                className={twMerge(
                  baseClassNames,
                  sizeClassNames.xs,
                  'my-1 border-2 border-primary-100 bg-primary-50 text-primary-800 transition-colors hover:bg-primary-100',
                  selectedCategory === categoryName &&
                    'border-primary-500 bg-primary-100 text-primary-800'
                )}
                onClick={() => setSelectedCategory(categoryName)}>
                <Trans>{categoryName}</Trans>
              </button>
            </li>
          ))}
        </ul>

        <div className="relative h-[120px] md:h-[300px]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={selectedCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute flex w-full flex-1 flex-col gap-6">
              {gestures[selectedCategory].gestureList.map((gesture, index) => (
                <li
                  key={`gesture-${index}`}
                  className="flex items-baseline gap-1 text-sm font-bold text-primary-600 md:text-lg">
                  <Trans>{gesture}</Trans>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex w-[400px] max-w-full justify-center md:justify-end">
          <Image
            src={gestures[selectedCategory].imageSrc}
            alt={gestures[selectedCategory].imageAlt}
            width="400"
            height="400"
            className="w-auto object-contain px-4"
          />
        </motion.div>
      </AnimatePresence>
    </>
  )
}
