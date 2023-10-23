import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { formatValue } from 'publicodes'

type Props = {
  subcategory: string
  categoryValue: number
}

const getIcon = (subcategory: string) => {
  switch (subcategory) {
    case 'alimentation . repas':
      return '🍽'

    case 'divers . animaux domestiques':
      return '🐶'

    default:
      return ''
  }
}

export default function SubcategoryListItem({
  subcategory,
  categoryValue,
}: Props) {
  const { numericValue, title, icons } = useRule(subcategory)

  const formattedValue = formatValue(numericValue, { precision: 0 })

  if (formattedValue === '0') return null

  const percentageOfCategoryValue =
    1 - (categoryValue - numericValue) / categoryValue
  console.log(icons, typeof icons)
  return (
    <li className="p-3">
      <div className="flex items-baseline gap-4">
        {/* @bjlaa: flex w-4 is required here because of a bug of react-easy-emoji that creates a duplicate empty element */}
        <Emoji className="flex w-4">{icons ?? getIcon(subcategory)}</Emoji>

        <div className="w-full">
          <div className="flex items-center justify-between text-sm md:text-base">
            <p className="mb-0">{title}</p>

            <div className="text-primaryDark">
              <strong>{formatValue(numericValue, { precision: 0 })}</strong>{' '}
              tonnes
            </div>
          </div>
          <div className="mt-2">
            <div>
              <div
                className="h-[6px] rounded-lg bg-pink-500"
                style={{
                  width: `calc(${percentageOfCategoryValue} * 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
