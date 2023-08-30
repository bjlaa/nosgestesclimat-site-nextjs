'use client'

import PrivacyEn from '@/locales/pages/en-us/privacy.mdx'
import PrivacyFr from '@/locales/pages/fr/privacy.mdx'

import PageLayout from '@/components/layout/PageLayout'
import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'

export default function Diffuser() {
  const locale = useLocale()

  const DiffuserLocalised = getLocalisedMDX({
    dictionnaries: {
      fr: PrivacyFr,
      'en-US': PrivacyEn,
    },
    locale: locale ?? '',
  })

  return (
    <PageLayout shouldShowMenu>
      <DiffuserLocalised />
    </PageLayout>
  )
}
