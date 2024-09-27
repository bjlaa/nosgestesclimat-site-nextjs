'use client'

import BilanIcon from '@/components/icons/BilanIcon'
import Trans from '@/components/translation/Trans'
import { headerClickTest } from '@/constants/tracking/layout'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import NavLink from './NavLink'

export default function SimulateurLink() {
  const { t } = useClientTranslation()

  const { getLinkToSimulateurPage } = useSimulateurPage()

  return (
    <NavLink
      href={getLinkToSimulateurPage()}
      onClick={() => trackEvent(headerClickTest)}
      activeMatches={['/tutoriel', '/simulateur', '/fin']}
      icon={BilanIcon}
      title={t('Mon empreinte')}>
      <Trans>Mon empreinte</Trans>
    </NavLink>
  )
}
