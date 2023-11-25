import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import Trans from '@/components/translation/Trans'
import NavLink from '../NavLink'

export default function BottomMenu() {
  return (
    <ul className="fixed bottom-0 left-0 z-50 flex w-screen justify-around border-t border-gray-200 border-t-gray-200 bg-grey-100 shadow-md">
      <li className="h-full w-full">
        <NavLink
          href="/simulateur/bilan"
          activeMatches={['/tutoriel', '/simulateur']}
          icon={BilanIcon}
          className="flex-col  p-2 px-4"
          activeClassName="bg-white border-r border-gray-200 text-primary-500 font-bold">
          <Trans>Test</Trans>
        </NavLink>
      </li>

      <li className="h-full w-full">
        <NavLink
          className="flex-col  p-2 px-4"
          activeClassName="bg-white border-x border-gray-200 text-primary-500 font-bold"
          href="/actions"
          icon={ActionsIcon}>
          <Trans>Actions</Trans>
        </NavLink>
      </li>

      <li className="h-full w-full">
        <NavLink
          className="flex-col p-2 px-4"
          activeClassName="bg-white border-l border-gray-200 text-primary-500 font-bold"
          href="/amis"
          icon={AmisIcon}
          data-cypress-id="amis-link">
          <Trans>Amis</Trans>
        </NavLink>
      </li>
    </ul>
  )
}
