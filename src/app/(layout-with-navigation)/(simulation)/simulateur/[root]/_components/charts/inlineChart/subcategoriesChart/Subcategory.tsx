import { useRule } from '@/publicodes-state'
import Image from 'next/image'

type Props = {
  subcategory: string
  total: number
  position: 'first' | 'middle' | 'last'
}

const positionClassNames = {
  first: 'border-r',
  last: 'border-l',
  middle: 'border-x',
}
export default function Subcategory({ subcategory, total, position }: Props) {
  const { numericValue, title } = useRule(subcategory)

  const percent = (numericValue / total) * 100

  if (percent < 5) return
  return (
    <div
      className={`border-ltransition-all flex h-full items-center justify-center border-white ${positionClassNames[position]}`}
      style={{ width: `${percent}%` }}>
      <Image
        style={{ filter: 'grayscale(1) invert(1) brightness(1.8)' }}
        src={`/images/model/${subcategory}.svg`}
        alt={title || subcategory}
        width={32}
        height={32}
      />
    </div>
  )
}
