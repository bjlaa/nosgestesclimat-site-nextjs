import Image from 'next/image'
import Link from 'next/link'
import { capitalise0 } from 'publicodes'
import { RulePage } from 'publicodes-react'
import { ComponentProps } from 'react'

const referencesImages = {
  'service-public.fr': '/références-images/marianne.png',
  'legifrance.gouv.fr': '/références-images/marianne.png',
  'gouv.fr': '/références-images/marianne.png',
  'ladocumentationfrançaise.fr':
    '/références-images/ladocumentationfrançaise.png',
  'senat.fr': '/références-images/senat.png',
  'ademe.fr': 'https://www.ademe.fr/wp-content/uploads/2021/12/logo-ademe.svg',
  'bilans-ges.ademe.fr':
    'https://www.ademe.fr/wp-content/uploads/2021/12/logo-ademe.svg',
}

export type ReferencesProps = {
  references: ComponentProps<
    NonNullable<ComponentProps<typeof RulePage>['renderers']['References']>
  >['references']
}

export default function References({ references }: ReferencesProps) {
  if (!references) return null

  const cleanDomain = (link: string) =>
    (link.includes('://') ? link.split('/')[2] : link.split('/')[0]).replace(
      'www.',
      ''
    )

  // Can be an object with labels as keys or just a list of URLs
  const referencesWithoutKeys = Array.isArray(references)

  return (
    <ul className="list-none pl-2">
      {Object.entries(references).map(([name, link]) => {
        const domain = cleanDomain(link)
        const path = link.split(domain)[1]
        return (
          <li key={name} className="mb-2 w-full flex items-center">
            {!referencesWithoutKeys && (
              <span className="w-[4.5rem] h-12 flex items-center justify-center mr-4">
                {Object.keys(referencesImages).includes(domain) && (
                  <Image
                    src={
                      referencesImages[domain as keyof typeof referencesImages]
                    }
                    alt={`logo de ${domain}`}
                    className="max-h-12 max-w-full rounded-sm align-sub"
                  />
                )}
              </span>
            )}
            <Link
              href={link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center min-w-1/2 no-underline mr-4 flex-1">
              <span className="ui__ label">{domain}</span>
              <span className="inline-block ml-2">
                {referencesWithoutKeys ? path : capitalise0(name)}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
