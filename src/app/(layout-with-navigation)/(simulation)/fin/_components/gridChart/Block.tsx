import { useRule } from '@/publicodes-state'
import Image from 'next/image'

type Props = {
  subcategory: string
}
export default function Block({ subcategory }: Props) {
  const { title, color } = useRule(subcategory)

  return (
    <div
      className={`flex h-14 items-center justify-center`}
      style={{ backgroundColor: color }}>
      <Image
        style={{ filter: 'grayscale(1) invert(1) brightness(1.8)' }}
        src={`/images/model/${subcategory}.svg`}
        alt={title || 'icône'}
        width={32}
        height={32}
      />
    </div>
  )
}
