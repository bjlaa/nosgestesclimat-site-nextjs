import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import { endClickJagisSecondBlock } from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import Badge from '@/design-system/layout/Badge'
import { useSendSimulationToAgir } from '@/hooks/simulation/useSendSimulationToAgir'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Image from 'next/image'
import { useEffect } from 'react'

export default function AgirSecondaryBlock() {
  const { t } = useClientTranslation()

  const { sendSimulation, data, isPending, isSuccess, isError, error } =
    useSendSimulationToAgir()

  useEffect(() => {
    if (data?.redirectUrl && isSuccess) {
      window.open(data.redirectUrl, '_blank')
      return
    }
  }, [data, isSuccess])

  return (
    <div className="rainbow-border relative rounded-xl border-2">
      <div className="bg-[url('/images/misc/jagis-bg.svg')] bg-right-bottom bg-no-repeat px-4 py-6 lg:bg-[length:18rem]">
        <div className="mb-4 flex gap-4">
          <Badge size="xs" color="green">
            <Trans>Aides financières</Trans>
          </Badge>
          <Badge size="xs" color="green">
            <Trans>Bons plans</Trans>
          </Badge>
          <Badge size="xs" color="green">
            <Trans>Idées</Trans>
          </Badge>
        </div>
        <h2 className="mb-2">
          <Trans>Que faire pour réduire mon empreinte ?</Trans>
        </h2>
        <p>
          <Trans>
            À partir de votre bilan, <strong>J’agis</strong> vous propose des
            actions concrètes et adaptées à vos envies et à vos moyens
          </Trans>
        </p>
        <Button
          disabled={isPending}
          className="mb-4"
          onClick={() => {
            trackEvent(endClickJagisSecondBlock)
            sendSimulation()
          }}>
          <Trans>Créer mon compte</Trans>
        </Button>
        {isError && <div className="text-red-600">{error?.toString()}</div>}
        {!data?.redirectUrl && isSuccess && (
          <div className="text-red-600">
            <Trans>Une erreur est survenue</Trans>
          </div>
        )}
        <div className="flex items-center gap-4">
          <Image
            src="/images/misc/jagis.svg"
            alt={t(`Logo de J'agis`)}
            width="60"
            height="60"
          />
          <Logo size="sm" />
        </div>
      </div>
    </div>
  )
}
