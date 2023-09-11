import { useRule } from '@/publicodes-state'
import { formatValue } from 'publicodes'
import Badge from './Badge'
import PercentageDiff from './PercentageDiff'

type PointsListItemProps = {
  name: string
  value: number
  variation: number
}

export default function PointsListItem({
  name,
  value,
  variation,
}: PointsListItemProps) {
  const rule = useRule(name)

  return (
    <li className="mb-3 flex items-center justify-between rounded-md bg-[#F8F8F7] p-3 text-sm last:mb-0">
      <p className="mb-0 flex items-center">
        <span className="mr-3 inline-block text-lg">{rule?.icons}</span>
        {rule?.title}
        <PercentageDiff variation={variation} />
      </p>

      <Badge>
        <strong>{formatValue(value as number, { precision: 0 })}</strong> kg
      </Badge>
    </li>
  )
}
