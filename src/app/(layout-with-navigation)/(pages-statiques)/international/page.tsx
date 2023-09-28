import Link from '@/components/Link'
import RegionGrid from '@/components/misc/RegionGrid'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import InlineLink from '@/design-system/inputs/InlineLink'
import Container from '@/design-system/layout/Container'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { useSupportedRegions } from '@/hooks/useSupportedRegions'
import Image from 'next/image'

const SHARED_TITLE = 'Le calculateur d’empreinte climat international'
const SHARED_DESCRIPTION = `Où que vous vivez, calculez votre empreinte carbone personnelle avec les particularités de votre pays.`

export function generateMetadata() {
  return getMetadataObject({
    title: SHARED_TITLE,
    description: SHARED_DESCRIPTION,
  })
}

export default async function International() {
  const { t } = await getServerTranslation()

  const title = t(SHARED_TITLE)
  const description = t(SHARED_DESCRIPTION)

  const supportedRegions = await useSupportedRegions()

  // TODO: add back full width somehow
  return (
    <>
      <Container maxWidth="3xl" className="pb-12 pt-8">
        <div className="flex items-start justify-between gap-4">
          <div className="text-center md:text-left">
            <Title title={title} />

            <Image
              src="/images/misc/international-illustration.jpeg"
              alt=""
              className="max-w-12 mx-auto py-8 md:hidden"
              width="100"
              height="100"
            />

            <p className="mb-8">{description}</p>
            <div>
              <ButtonLink href="/simulateur/bilan" size="xl" className="px-20">
                <span>
                  <Trans>Faire le test</Trans>
                </span>
              </ButtonLink>
            </div>
          </div>

          <Image
            src="/images/misc/international-illustration.jpeg"
            alt=""
            aria-hidden="true"
            className="mx-auto hidden max-w-md p-8 md:block"
            width="300"
            height="300"
          />
        </div>
      </Container>
      <div className="rounded-md bg-primaryLight">
        <Container maxWidth="3xl" className="px-4 pb-12 pt-8">
          <h2>
            <Trans i18nKey="international.pourquoi.titre">
              Adapté à votre pays
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="international.pourquoi.1">
              Les modes de vies ne sont pas les mêmes en fonction du pays dans
              lequel on vit. Certains pays ont un réseau ferré très développé,
              d'autres sont insulaires et donc reposent davantage sur le ferry
              et l'avion.
            </Trans>
          </p>
          <p>
            <Trans i18nKey="international.pourquoi.2">
              Au fur et à mesure que l'électricité prend une place très
              importante grâce à la transition énergétique, l'empreinte carbone
              du mix électrique influence fortement le calcul d'empreinte
              climat.
            </Trans>
          </p>
          <p>
            <Trans i18nKey="international.pourquoi.3">
              Nous utilisons, quand disponible, l'empreinte du mix électrique
              fournie par{' '}
              <Link href="https://app.electricitymaps.com/map" target="_blank">
                <Image
                  alt="Electricity Maps"
                  src="/images/misc/electricitymaps.svg"
                  className="ml-2 h-4"
                  width="100"
                  height="100"
                />
              </Link>
              .
            </Trans>
          </p>
        </Container>
      </div>

      <Container maxWidth="3xl" className="pb-12 pt-8">
        <h2>
          <Trans i18nKey="international.comment.titre">
            Comment ça marche ?
          </Trans>
        </h2>
        <p>
          <Trans i18nKey="international.comment.1">
            Pour proposer un modèle pour chaque pays, il nous faut forcément une
            base. Nos Gestes Climat s'est construit sur le cas de la France. À
            partir de là, chaque pays décrit ses différences par rapport à la
            base.
          </Trans>
          <p>
            <Trans i18nKey="international.comment.2">
              Explorez en détail les spécificités de chaque pays.
            </Trans>
            &nbsp;
            <span className="ml-2 whitespace-nowrap rounded-sm bg-primaryLight px-2 py-1">
              ⏳️ <Trans>À venir !</Trans>
            </span>
          </p>
        </p>
      </Container>

      <div className="rounded-md bg-primaryLight">
        <Container maxWidth="3xl" className="pb-12 pt-8">
          <div className="mx-auto my-0">
            <RegionGrid
              shouldShowButton={false}
              supportedRegions={supportedRegions}
            />
          </div>
        </Container>
      </div>

      <Container maxWidth="3xl" className="pb-12 pt-8">
        <h2>
          <Trans i18nKey="international.ensuite.titre">
            Vous ne trouvez pas votre pays ?
          </Trans>
        </h2>
        <p>
          <Trans i18nKey="international.ensuite.1">
            Nous avons lancé une première version de l'internationalisation qui
            comprend une douzaine de pays. Nous le faisons pas à pas, pour
            consolider les particularités de chaque pays. Le votre n'y est pas ?{' '}
            <InlineLink href="/a-propos">Écrivez-nous !</InlineLink>
          </Trans>
        </p>
      </Container>
    </>
  )
}
