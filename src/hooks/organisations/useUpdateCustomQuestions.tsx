import { SERVER_URL } from '@/constants/urls'
import { CustomAdditionalQuestions } from '@/types/organisations'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  pollSlug: string
  orgaSlug: string
}

export function useUpdateCustomQuestions({ pollSlug, orgaSlug }: Props) {
  return useMutation({
    mutationKey: ['updateCustomQuestions', pollSlug, orgaSlug],
    mutationFn: ({
      customAdditionalQuestions,
    }: {
      customAdditionalQuestions: CustomAdditionalQuestions[]
    }) =>
      axios
        .post(`${SERVER_URL}/organisations/update-custom-questions`, {
          pollSlug,
          orgaSlug,
          customAdditionalQuestions,
        })
        .then((res) => res.data),
    retry: false,
  })
}
