'use client'

import {
  footerClickDocumentation,
  headerClickProfil,
} from '@/constants/tracking/layout'
import BurgerMenu from '@/design-system/layout/BurgerMenu'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { Suspense } from 'react'
import NavLink from '../NavLink'
import OrganisationLink from '../_components/OrganisationLink'
import ProfileIcon from '../_components/ProfileIcon'
import CTAButton from '../headerDesktop/CTAButton'

export default function FoldableMenu() {
  const { user } = useUser()

  return (
    <BurgerMenu>
      {({ closeMenu, onFocus }) => (
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink
              onFocus={onFocus}
              onClick={() => {
                closeMenu()
                trackEvent(headerClickProfil)
              }}
              href="/profil"
              icon={ProfileIcon}>
              Profil
            </NavLink>
          </li>

          {user?.organisation?.administratorEmail && (
            <li>
              <OrganisationLink />
            </li>
          )}

          <li>
            <div className="ml-2 h-[1px] w-4 bg-gray-400" />
          </li>

          <li>
            <NavLink onFocus={onFocus} onClick={closeMenu} href="/blog">
              Blog
            </NavLink>
          </li>

          <li>
            <NavLink
              onFocus={onFocus}
              onClick={closeMenu}
              href="/questions-frequentes">
              FAQ
            </NavLink>
          </li>

          <li>
            <NavLink
              onFocus={onFocus}
              onClick={() => {
                closeMenu()
                trackEvent(footerClickDocumentation)
              }}
              href="/documentation">
              Documentation
            </NavLink>
          </li>

          <li>
            <NavLink onFocus={onFocus} onClick={closeMenu} href="/diffuser">
              Diffuser Nos Gestes Climat
            </NavLink>
          </li>

          {!user?.organisation?.administratorEmail ? (
            <li>
              <Suspense fallback={null}>
                <CTAButton />
              </Suspense>
            </li>
          ) : null}
        </ul>
      )}
    </BurgerMenu>
  )
}
