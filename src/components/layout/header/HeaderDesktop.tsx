'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import Trans from '@/components/translation/Trans'
import {
  headerClickActions,
  headerClickClassements,
} from '@/constants/tracking/layout'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import NavLink from './NavLink'
import SimulateurLink from './SimulateurLink'

type Props = {
  isSticky: boolean
}
export default function HeaderDesktop({ isSticky }: Props) {
  const { t } = useClientTranslation()

  return (
    <header
      className={twMerge(
        'mb-8 hidden h-20 items-center lg:block',
        isSticky ? 'sticky top-0 z-50' : ''
      )}>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-20 w-full items-center border-b bg-white shadow-sm">
        <div className="mx-auto flex h-full w-full max-w-6xl justify-between gap-6 px-4">
          <div className="flex items-center justify-between gap-20">
            <div className="flex origin-left items-center justify-center"></div>

            <nav className="h-full">
              <ul className="flex h-full flex-1 justify-start gap-4">
                <li>
                  <Suspense fallback={null}>
                    <SimulateurLink />
                  </Suspense>
                </li>

                <li>
                  <NavLink
                    href="/actions"
                    onClick={() => trackEvent(headerClickActions)}
                    icon={ActionsIcon}
                    title={t('Mes gestes')}>
                    <Trans>Mes gestes</Trans>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    href={linkToClassement}
                    onClick={() => trackEvent(headerClickClassements)}
                    icon={AmisIcon}
                    activeMatches={['/classement', '/amis']}
                    title={t('Mes classements')}
                    data-cypress-id="amis-link">
                    <Trans>Mes classements</Trans>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
