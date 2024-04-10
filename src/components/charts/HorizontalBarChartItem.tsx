import BarChart from '@/design-system/utils/BarChart'
import Emoji from '@/design-system/utils/Emoji'
import { DottedName } from '@/publicodes-state/types'
import { ReactNode } from 'react'

type Props = {
  title?: string
  icons?: string
  displayValue: ReactNode
  percentageOfTotalValue: number
  minTitleWidth?: number
  index?: number
  category?: DottedName
}

export default function HorizontalBarChartItem({
  title,
  icons,
  displayValue,
  percentageOfTotalValue,
  minTitleWidth,
  index,
  category,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-8">
      <div
        className="hidden items-center gap-2 md:flex"
        style={{
          minWidth: (minTitleWidth ?? 11) + 'rem',
        }}>
        <Emoji className="flex w-4">{icons}</Emoji>{' '}
        <p className={`mb-0 underline decoration-dotted underline-offset-4`}>
          {title}
        </p>
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <Emoji>{icons}</Emoji>{' '}
        <p className={`mb-0 underline decoration-dotted underline-offset-4`}>
          {(title?.length ?? 0) > 14 ? title?.split(' ')[0] : title}
        </p>
      </div>

      <div className="mr-4 hidden flex-1 md:block">
        <BarChart
          type="horizontal"
          value={`${percentageOfTotalValue}%`}
          index={index && index < 5 ? index : 0}
          category={category}
        />
      </div>

      <div className="mr-4 text-primary-700">{displayValue}</div>
    </div>
  )
}
