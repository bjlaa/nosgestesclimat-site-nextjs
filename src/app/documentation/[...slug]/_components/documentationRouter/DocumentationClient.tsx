'use client'

import Link from '@/components/Link'
import BilanChart from '@/components/charts/BilanChart'
import ServicesChart from '@/components/charts/ServicesChart'
import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'
import { decodeRuleNameFromPath } from '@/utils/decodeRuleNameFromPath'
import { RulePage } from '@publicodes/react-ui'
import Head from 'next/head'
import Engine from 'publicodes'

type Props = {
  supportedRegions: SuppportedRegions
  slugs: string[]
}
export default function DocumentationClient({ slugs }: Props) {
  const { i18n } = useClientTranslation()

  const path = decodeRuleNameFromPath(slugs.join('/'))

  const { engine } = useEngine()

  const documentationPath = '/documentation'

  return (
    <div className="p-8">
      <RulePage
        language={i18n.language as 'fr' | 'en'}
        rulePath={(path as string) ?? ''}
        engine={engine as Engine}
        documentationPath={documentationPath}
        searchBar={true}
        renderers={{
          Head,
          Link: ({ children, to }) => <Link href={to || ''}>{children}</Link>,
          Text: ({ children }) => (
            <>
              <Markdown>{children}</Markdown>
              {children.includes('<RavijenChart/>') && <BilanChart />}
              {children.includes('<RavijenChartSocietaux/>') && (
                <ServicesChart />
              )}
            </>
          ),
        }}
      />
    </div>
  )
}
