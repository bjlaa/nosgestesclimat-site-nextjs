import { getGeolocation } from '@/helpers/getGeolocation'
import { getMigrationInstructions } from '@/helpers/modelFetching/getMigrationInstructions'
import { UserProvider } from '@/publicodes-state'
import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'

const ClientErrorContent = dynamic(
  () => import('@/components/error/ErrorContent'),
  { ssr: false }
)

export default async function RootLayout({ children }: PropsWithChildren) {
  try {
    const region = await getGeolocation()
    const migrationInstructions = await getMigrationInstructions()

    return (
      <>
        <UserProvider
          initialRegion={region}
          storageKey="nosgestesclimat::v3"
          migrationInstructions={migrationInstructions}>
          {children}
        </UserProvider>

        <div id="modal" />
      </>
    )
  } catch (error) {
    return (
      <html lang="fr">
        <body>
          <ClientErrorContent />
        </body>
      </html>
    )
  }
}
