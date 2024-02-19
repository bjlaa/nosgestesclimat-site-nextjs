import { GROUP_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type MutateAsyncProps = {
  groupInfo: {
    name: string
    emoji: string
    email: string
    prenom: string
    userId: string
    simulation?: Simulation
  }
}

export default function useCreateGroup() {
  return useMutation({
    mutationFn: ({
      groupInfo: { name, emoji, email, prenom, userId, simulation },
    }: MutateAsyncProps) =>
      axios
        .post(GROUP_URL + '/create', {
          name: name,
          emoji: emoji,
          administratorEmail: email,
          administratorName: prenom,
          userId,
          simulation,
        })
        .then((res) => res.data),
  })
}
