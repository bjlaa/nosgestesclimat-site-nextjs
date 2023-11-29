import Route404 from '@/components/layout/404'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Markdown from '@/design-system/utils/Markdown'
import getPost from '@/helpers/markdown/getPost'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Actions, suite à votre simulation d'empreinte climat - Nos Gestes Climat",
    description:
      'Découvrez les actions que vous pouvez mettre en place pour réduire votre empreinte carbone.',
  })
}

type Props = {
  params: {
    dottedName: string[]
  }
}

export default async function ActionPlus({
  params: { dottedName: dottedNameArray },
}: Props) {
  const action = await getPost(
    `src/locales/actions-plus/fr/`,
    decodeURI(dottedNameArray.join(' . ').replaceAll('-', ' '))
  )

  return (
    <div>
      <div className="mb-8 mt-4 flex flex-wrap gap-4">
        <ButtonLink size="sm" color="text" href={'/actions/plus'}>
          <Trans>◀ Retour à la liste des fiches</Trans>
        </ButtonLink>
        {action ? (
          <ButtonLink size="sm" href={'/actions/' + dottedNameArray.join('/')}>
            <Trans>🧮 Voir le geste climat correspondant</Trans>
          </ButtonLink>
        ) : null}
      </div>
      {action ? <Markdown>{action}</Markdown> : <Route404 />}
    </div>
  )
}
