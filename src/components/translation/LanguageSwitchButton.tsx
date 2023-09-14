'use client'

import Button from '@/design-system/inputs/Button'
import { getLocalisedURL } from '@/helpers/localisation/getLocalisedURL'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRouter } from 'next/navigation'

export default function LanguageSwitchButton() {
  const { t } = useClientTranslation()

  const currentUrl =
    typeof window !== 'undefined' ? window.location.pathname : '/'
  const locale = useLocale()

  const router = useRouter()

  const handleChange = () => {
    const newLocale = locale === 'fr' ? 'en-US' : 'fr'

    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)

    const expires = '; expires=' + date.toUTCString()

    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    router.push(
      getLocalisedURL({
        locale: newLocale || 'fr',
        href: currentUrl,
      })
    )
    router.refresh()
    // window.location.reload()
  }

  return (
    <div className="mx-auto flex justify-center gap-2">
      <Button
        lang="fr"
        color={locale === 'fr' ? 'primary' : 'secondary'}
        onClick={handleChange}
        size="sm"
        aria-label={
          locale === 'fr' ? t('Français sélectionné') : t('Passer en français')
        }
        className="flex gap-2 px-4 py-3">
        <span>FR</span> <span aria-hidden>🇫🇷</span>
      </Button>
      <Button
        lang="en"
        color={locale === 'en-US' ? 'primary' : 'secondary'}
        onClick={handleChange}
        size="sm"
        aria-label={
          locale === 'fr' ? t('English selected') : t('Switch to english')
        }
        className="flex gap-2 px-4 py-3">
        <span>EN</span> <span aria-hidden>🇬🇧</span>
      </Button>
    </div>
  )
}
