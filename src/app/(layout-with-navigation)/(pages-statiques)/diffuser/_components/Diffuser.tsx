'use client'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import DiffuserEn from '@/locales/pages/en-us/diffuser.mdx'
import DiffuserFr from '@/locales/pages/fr/diffuser.mdx'

export default function Diffuser() {
  const locale = useLocale()

  const DiffuserLocalised = getLocalisedMDX({
    dictionnaries: {
      fr: DiffuserFr,
      'en-US': DiffuserEn,
    },
    locale: locale ?? '',
  })

  return <DiffuserLocalised />
}
