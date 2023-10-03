import { getMatomoEventClickHelp } from '@/constants/matomo'
import Markdown from '@/design-system/utils/Markdown'
import { QuestionSize } from '@/types/values'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

type Props = {
  question: string
  label?: string
  description?: string
  size?: QuestionSize
}

const sizeClassNames = {
  sm: 'text-sm',
  md: 'text-lg md:text-xl',
}
const buttonSizeClassNames = {
  sm: 'h-6 w-6 text-sm',
  md: 'h-6 w-6 text-sm md:h-8 md:w-8 md:text-base',
}
export default function Label({
  question,
  label,
  description,
  size = 'md',
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useTranslation()

  if (!label) return
  return (
    <>
      <div className={`mb-3 ${sizeClassNames[size]} font-semibold`}>
        {label}{' '}
        {description ? (
          <button
            onClick={() => {
              trackEvent(getMatomoEventClickHelp(question))
              setIsOpen((previsOpen) => !previsOpen)
            }}
            className={`inline-block ${buttonSizeClassNames[size]} rounded-full border-none bg-primary text-base font-bold text-white`}
            title={t("Voir plus d'informations")}>
            <code>i</code>
          </button>
        ) : null}
      </div>
      {isOpen && description ? (
        <div className="mb-3">
          <Markdown>{description}</Markdown>{' '}
          <button
            onClick={() => setIsOpen(false)}
            className="block text-primary underline"
            title={t('Fermer')}>
            <Trans>Fermer</Trans>
          </button>
        </div>
      ) : null}
    </>
  )
}
