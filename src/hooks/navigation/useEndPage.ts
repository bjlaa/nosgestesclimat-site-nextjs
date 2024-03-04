import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import { linkToQuiz } from '@/helpers/navigation/quizPages'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

type GoToEndPageProps = {
  isAllowedToSave?: boolean
  allowedToGoToGroupDashboard?: boolean
  shouldShowQuiz?: boolean
}
const goToEndPagePropsDefault = {
  isAllowedToSave: true,
  allowedToGoToGroupDashboard: false,
  shouldShowQuiz: false,
}

type GetLinkToEndPageProps = {
  allowedToGoToGroupDashboard?: boolean
  shouldShowQuiz?: boolean
}
const GetLinkToEndPagePropsDefault = {
  allowedToGoToGroupDashboard: false,
  shouldShowQuiz: false,
}

export function useEndPage() {
  const router = useRouter()

  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const progression = currentSimulation?.progression

  const { saveSimulation } = useSaveSimulation()

  const [isNavigating, setIsNavigating] = useState(false)

  const goToEndPage = useCallback(
    async ({
      isAllowedToSave = true,
      allowedToGoToGroupDashboard = false,
      shouldShowQuiz = false,
    }: GoToEndPageProps = goToEndPagePropsDefault) => {
      if (!currentSimulation) {
        router.push('/404') // TODO: should throw an error
        return
      }

      // If we are already navigating, we don't do anything
      if (isNavigating) {
        return
      }
      setIsNavigating(true)

      // If the simulation is finished and is in a poll or a group, we save it (unless save is false)
      if (
        progression === 1 &&
        isAllowedToSave &&
        (currentSimulation.poll || currentSimulation.group)
      ) {
        await saveSimulation({ simulation: currentSimulation })
      }

      // If we should show the quiz, we redirect to the quiz page
      // TODO: This is maybe in the wrong place. Should check it later
      if (shouldShowQuiz) {
        router.push(linkToQuiz)
        return
      }

      // if the simulation is in a group and we are allowed to, we redirect to the group results page
      if (currentSimulation.group && allowedToGoToGroupDashboard) {
        router.push(
          getLinkToGroupDashboard({ groupId: currentSimulation.group })
        )
        return
      }

      // else we redirect to the results page
      router.push('/fin')
    },
    [currentSimulation, progression, router, saveSimulation, isNavigating]
  )

  const getLinkToEndPage = useCallback(
    ({
      allowedToGoToGroupDashboard = false,
      shouldShowQuiz = false,
    }: GetLinkToEndPageProps = GetLinkToEndPagePropsDefault) => {
      if (!currentSimulation) {
        return '/404' // TODO: should throw an error
      }

      // If we should show the quiz, we redirect to the quiz page
      // TODO: This is maybe in the wrong place. Should check it later
      if (shouldShowQuiz) {
        return linkToQuiz
      }

      // if the simulation is in a group and we are allowed to, we redirect to the group results page
      if (currentSimulation.group && allowedToGoToGroupDashboard) {
        return getLinkToGroupDashboard({ groupId: currentSimulation.group })
      }

      // else we return the results page
      return '/fin'
    },
    [currentSimulation]
  )

  return { goToEndPage, getLinkToEndPage, isNavigating }
}
