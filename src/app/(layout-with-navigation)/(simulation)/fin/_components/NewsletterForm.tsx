'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Separator from '@/design-system/layout/Separator'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useSubscribeUser } from '@/hooks/useSubscribeUser'
import { useUser } from '@/publicodes-state'
import { useState } from 'react'
import Confirmation from './newsletterForm/Confirmation'
import Text from './newsletterForm/Text'

export const NewsletterForm = () => {
  const { t } = useClientTranslation()
  const { getCurrentSimulation } = useUser()
  const simulation = getCurrentSimulation()

  const [email, setEmail] = useState('')
  const [optIn, setOptIn] = useState(false)

  const {
    mutate: subscribeUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSubscribeUser()

  return (
    <div id="newsletter-form-container" className="mx-auto mb-4 max-w-lg">
      <Separator className="my-4" />
      <div>
        {isSuccess ? (
          <Confirmation />
        ) : (
          <form
            id="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault()
              if (isLoading || !simulation) return
              subscribeUser({ simulation, email, optIn })
            }}>
            <Text />
            <TextInputGroup
              name="EMAIL"
              type="email"
              label={t('Entrez votre adresse email')}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              className="mb-4"
            />
            <CheckboxInputGroup
              name="OPT_IN"
              value={optIn}
              onChange={() => setOptIn((prevOptIn) => !prevOptIn)}
              required
              label={
                <Trans i18nKey="NewsletterForm.confirmation">
                  J'accepte de recevoir des informations de la part de Nos
                  Gestes Climat et sa{' '}
                  <a
                    target="_blank"
                    href="https://nosgestesclimat.fr/vie-privee"
                    rel="noreferrer"
                    aria-label={
                      'politique de confidentialité, nouvelle fenêtre'
                    }>
                    politique de confidentialité
                  </a>
                </Trans>
              }
              className="mb-4"
            />

            <p className="text-xs text-gray-500">
              <Trans>
                Vous pourrez choisir de ne plus recevoir nos emails à tout
                moment
              </Trans>
            </p>

            <Button onClick={() => null} type="submit" disabled={isLoading}>
              <Trans>Envoyer</Trans>
            </Button>
            <input
              type="text"
              name="email_address_check"
              value=""
              className="invisible"
              readOnly
            />
            <input type="hidden" name="locale" value="en" readOnly />
            <input type="hidden" name="html_type" value="simple" readOnly />
            {isError && (
              <div className="mt-4 text-red-600">{error?.toString()}</div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
