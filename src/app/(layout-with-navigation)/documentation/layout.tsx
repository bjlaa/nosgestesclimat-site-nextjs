import { PropsWithChildren } from 'react'
import { IsDocumentationClientProvider } from './_contexts/DocumentationStateContext'

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <IsDocumentationClientProvider>
      <div className="mx-auto flex flex-col items-center justify-center gap-4 px-4 pb-8 md:mx-auto md:w-full md:max-w-5xl md:items-start md:px-8 md:pb-10 md:text-left">
        {children}
      </div>
    </IsDocumentationClientProvider>
  )
}
