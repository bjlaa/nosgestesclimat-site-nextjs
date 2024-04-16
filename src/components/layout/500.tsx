'use client'

import InlineLink from '@/design-system/inputs/InlineLink'
import { useClientTranslation } from '@/hooks/useClientTranslation'

export default function Error500() {
  const { t } = useClientTranslation()

  return (
    <div className="mx-auto my-16 text-center text-primary-700">
      <h1 className="flex items-center justify-center">
        {t('Oups\u202f! Une erreur est survenue')}{' '}
        <span role="img" aria-label="Emoji no" aria-hidden>
          😮
        </span>
      </h1>

      <InlineLink href="/" className="flex flex-col items-center !text-center">
        <em>
          <NGCTrans i18nKey="404.action">Revenir en lieu sûr</NGCTrans>
        </em>
      </InlineLink>
    </div>
  )
}
