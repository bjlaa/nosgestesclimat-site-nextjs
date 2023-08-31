import { useRule } from '@/publicodes-state'
import MosaicChild from './mosaic/MosaicChild'

type Props = {
  question: string
}

export default function Mosaic({ question }: Props) {
  const { childrenOfMosaic } = useRule(question)

  return (
    <div className="grid grid-cols-2 gap-4">
      {childrenOfMosaic
        ? childrenOfMosaic.map((childOfMosaic) => (
            <MosaicChild key={childOfMosaic} child={childOfMosaic} />
          ))
        : 'Cette mosaique n a pas d enfants.'}
    </div>
  )
}
