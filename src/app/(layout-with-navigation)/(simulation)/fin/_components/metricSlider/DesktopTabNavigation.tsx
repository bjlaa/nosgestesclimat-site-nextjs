'use client'

import Trans from '@/components/translation/Trans'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { twMerge } from 'tailwind-merge'
import HeadingButtons from './heading/HeadingButtons'

type Props = {
  sticky?: boolean
}
export default function DesktopTabNavigation({ sticky }: Props) {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  return (
    <div className="relative flex w-full items-end justify-between bg-white pt-0.5">
      <div className={twMerge('flex', sticky && 'gap-2')}>
        <button
          onClick={() => setCurrentMetric('carbone')}
          className={twMerge(
            'z-50 mb-0 rounded-t-xl border-2 px-4 pb-1 pt-2 text-lg font-medium transition-all duration-500',
            currentMetric !== 'carbone'
              ? ' border-transparent border-b-primary-50 text-primary-700'
              : 'border-x-primary-50 border-b-transparent border-t-primary-50 bg-gray-100'
          )}>
          <span className="hidden lg:inline">
            <Trans>Mon empreinte</Trans>{' '}
          </span>
          <strong
            className={twMerge(
              currentMetric !== 'carbone'
                ? 'font-medium'
                : ' font-black text-secondary-700'
            )}>
            carbone
          </strong>
        </button>
        <button
          onClick={() => setCurrentMetric('eau')}
          className={twMerge(
            'z-50 mb-0 rounded-t-xl border-2 px-4 pb-1 pt-2 text-lg font-medium transition-all duration-500',
            currentMetric !== 'eau'
              ? 'z-50 border-transparent border-b-primary-50 text-primary-700'
              : 'border-x-primary-50 !border-b-transparent border-t-primary-50 bg-gray-100 '
          )}>
          <span className="hidden lg:inline">
            <Trans>Mon empreinte</Trans>{' '}
          </span>
          <strong
            className={twMerge(
              currentMetric !== 'eau'
                ? 'font-medium'
                : ' font-black text-secondary-700'
            )}>
            eau
          </strong>
        </button>
      </div>
      {!sticky && <HeadingButtons endPage />}
    </div>
  )
}
