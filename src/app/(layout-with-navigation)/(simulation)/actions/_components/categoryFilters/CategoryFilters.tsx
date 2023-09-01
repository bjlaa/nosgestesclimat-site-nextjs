'use client'
import { useForm } from '@/publicodes-state'
import Filter from './_components/Filter'

type Props = {
  actions: any
}

export default function CategoryFilters({ actions }: Props) {
  const { categories } = useForm()

  const countByCategory = actions.reduce((accumulator: any, action: any) => {
    const category = action.dottedName.split(' . ')[0]

    return { ...accumulator, [category]: (accumulator[category] || 0) + 1 }
  }, {})

  return (
    <ul className="flex flex-wrap list-none justify-center pl-0 gap-1">
      {categories.map((category: string) => {
        return (
          <Filter
            key={category}
            dottedName={category}
            countByCategory={countByCategory}
          />
        )
      })}
    </ul>
  )
}
