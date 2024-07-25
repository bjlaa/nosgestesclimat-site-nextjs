import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ExternalLinkIcon from '@/design-system/icons/ExternalLinkIcon'
import Title from '@/design-system/layout/Title'
import Image from 'next/image'

export default function WaterActions() {
  return (
    <div>
      <Title tag="h2">
        <Trans>
          Comment <strong className="text-secondary-700">agir</strong> ?
        </Trans>
      </Title>
      <p>
        <Trans>
          <strong className="text-secondary-700">
            La majeure partie de l’empreinte eau concerne la pousse des
            végétaux,
          </strong>{' '}
          que ce soit pour nous alimenter, pour nourrir le bétail, ou pour
          obtenir la matière première de nombres de nos vêtements.
        </Trans>
      </p>
      <p className="mb-6">
        <Trans>Retrouvez nos conseils dans ces articles :</Trans>
      </p>
      <div className="mb-4 flex justify-center gap-4">
        <Link
          href={'/blog/empreinte-eau-alimentation'}
          target="_blank"
          className="relative flex flex-col justify-between rounded-xl border-2 border-primary-50 bg-gray-100 p-4 no-underline hover:bg-primary-100">
          <div>
            <Image
              src="/images/blog/erda-estremera-demenagement.jpg"
              width="400"
              height="200"
              className="mx-auto mb-3 h-36 w-full object-cover"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 text-center leading-tight text-black">
              Les 4 gestes pour réduire l’empreinte eau de mon alimentation
            </p>
          </div>
          <div className="text-center text-sm text-primary-700 underline">
            Lire l'article <ExternalLinkIcon className="stroke-primary-700" />
          </div>
        </Link>
        <Link
          href={'/blog/empreinte-eau-textile'}
          target="_blank"
          className="relative flex flex-col justify-between rounded-xl border-2 border-primary-50 bg-gray-100 p-4 no-underline hover:bg-primary-100">
          <div>
            {' '}
            <Image
              src="/images/blog/campus.jpg"
              width="400"
              height="200"
              className="mx-auto mb-3 h-36 w-full object-cover"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 text-center leading-tight text-black">
              Les 3 réflexes à adopter pour une garde-robe économe en eau
            </p>
          </div>
          <div className="text-center text-sm text-primary-700 underline">
            Lire l'article <ExternalLinkIcon className="stroke-primary-700" />
          </div>
        </Link>
      </div>
    </div>
  )
}
