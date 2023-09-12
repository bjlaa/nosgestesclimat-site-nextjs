'use client'

import { QueryClient, QueryClientProvider } from 'react-query'

import StatsContent from './_components/StatsContent'

const queryClient = new QueryClient()

export default function Dashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatsContent />
    </QueryClientProvider>
  )
}
