'use client'

import VerticalBarChartItem from '@/components/charts/verticalBarChart/VerticalBarChartItem'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'

export default function CategoryChartItem({
  category,
  maxValue,
  value,
  index,
}: {
  category: string
  value: number
  maxValue: number
  index: number
}) {
  const { t } = useClientTranslation()

  const { icons, title } = useRule(category)

  const percentageOfMaxValue = 1 - (maxValue - value) / maxValue
  console.log(percentageOfMaxValue, maxValue, value)
  return (
    <VerticalBarChartItem
      value={value}
      index={index}
      percentage={percentageOfMaxValue}
      ariaLabel={t(
        'La catégorie {{title}} représente {{value}} tonnes de CO2 equivalent.',
        { value, title }
      )}
      title={title ?? ''}
      icons={icons}
    />
  )
}
