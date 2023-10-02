import Trans from '@/components/translation/Trans'
import Image from 'next/image'

import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ActionPlusList from './_components/ActionPlusList'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Actions, la liste - Nos Gestes Climat',
    description:
      'Découvrez les actions que vous pouvez mettre en place pour réduire votre empreinte carbone.',
  })
}

export default function ActionList() {
  return (
    <div className="mt-8">
      <h2>
        <Trans>Nos explications complètes</Trans>{' '}
        <Image
          src="/images/misc/beta.svg"
          width={36}
          height={10}
          alt="beta"
          className="inline align-top"
        />
      </h2>

      <p>
        <em>
          <Trans>
            Découvrez les enjeux qui se cachent derrière chaque action.
          </Trans>
        </em>
      </p>

      <ActionPlusList />
    </div>
  )
}
