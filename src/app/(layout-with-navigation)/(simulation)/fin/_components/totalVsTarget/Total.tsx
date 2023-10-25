import { useForm } from '@/publicodes-state'

import { useTranslation } from 'react-i18next'
import Annotation from './total/Annotation'
import Category from './total/Category'
import NumberDisplay from './total/NumberDisplay'

type Props = {
  total: number
}
export default function Total({ total }: Props) {
  const { categories } = useForm()
  const { t } = useTranslation()

  return (
    <div className="relative h-full w-16 md:w-28">
      <Annotation content={t('Mon empreinte carbone')} />

      <NumberDisplay number={total} isTotal />

      <div className="flex h-full flex-col overflow-hidden rounded-t border-4 border-b-0 border-black">
        {categories.map((category: string, index: number) => (
          <Category
            key={category}
            position={
              index === 0
                ? 'first'
                : index === categories.length - 1
                ? 'last'
                : 'middle'
            }
            category={category}
            total={total}
          />
        ))}
      </div>
    </div>
  )
}
