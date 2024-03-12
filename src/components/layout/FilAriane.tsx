'use client'

import useFetchOrganisation from '@/app/(layout-with-navigation)/(simulation)/organisations/_hooks/useFetchOrganisation'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import { getOrganisationItems } from '@/helpers/filAriane/getOrganisationItems'
import { useUser } from '@/publicodes-state'
import { useParams, usePathname } from 'next/navigation'

const TARGETED_PATHS = ['organisations']

export default function FilAriane() {
  const pathname = usePathname()
  const params = useParams()

  const { user } = useUser()

  const { data: organisation } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  if (!TARGETED_PATHS.some((path) => pathname.includes(path))) return null

  const getBreadcrumbsItems = (): {
    href: string
    label: string | JSX.Element
    isActive: boolean
  }[] => {
    // Organisation path
    if (pathname.includes('organisations')) {
      return getOrganisationItems({
        pathname,
        params,
        user,
        isAdmin: !!organisation,
      })
    }

    return []
  }

  return <Breadcrumbs items={getBreadcrumbsItems()} />
}