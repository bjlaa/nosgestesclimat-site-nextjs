import { SERVER_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import type { PollData } from '@/types/organisations'
import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  orgaSlug?: string
  pollSlug?: string
  enabled?: boolean
}

export function useFetchPollData({
  orgaSlug,
  pollSlug,
  enabled = true,
}: Props = {}): UseQueryResult<PollData | null, Error> {
  const { user } = useUser()

  return useQuery({
    queryKey: ['pollData'],
    queryFn: () =>
      axios
        .get(
          `${SERVER_URL}/polls/fetch-poll-processed-data?orgaSlug=${encodeURIComponent(orgaSlug ?? '')}&pollSlug=${encodeURIComponent(pollSlug ?? '')}&email=${encodeURIComponent(user?.organisation?.administratorEmail ?? '')}&userId=${encodeURIComponent(user?.userId)}`
        )
        .then((res) => res.data)
        .catch((err) => {
          console.error(err)
          return null
        }),
    enabled: !!orgaSlug && enabled && !!user?.userId,
    refetchInterval: 30000,
  })
}
