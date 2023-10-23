'use client'

import Accordion from '@/design-system/layout/accordion/Accordion'
import { useForm, useTempEngine } from '@/publicodes-state'

export default function CategoriesAccordion() {
  const { categories } = useForm()

  const { getRuleObject } = useTempEngine()

  return (
    <Accordion
      className="mt-8"
      items={categories.map((categoryName) => {
        const categoryObject = getRuleObject(categoryName)

        return {
          title: categoryObject?.title,
          content: 'toto',
          icons: categoryObject?.rawNode.icônes,
          category: categoryName,
        }
      })}
    />
  )
}
