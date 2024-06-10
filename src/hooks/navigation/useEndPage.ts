import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import { linkToQuiz } from '@/helpers/navigation/quizPages'
import { getComputedResults } from '@/helpers/simulation/getComputedResults'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useCurrentSimulation, useSimulation } from '@/publicodes-state'
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

  const currentSimulation = useCurrentSimulation()

  const progression = currentSimulation?.progression

  const { safeEvaluate, categories } = useSimulation()

  const { saveSimulation } = useSaveSimulation()

  const [isNavigating, setIsNavigating] = useState(false)

  const goToEndPage = useCallback(
    async ({
      isAllowedToSave = true,
      allowedToGoToGroupDashboard = false,
      shouldShowQuiz = false,
    }: GoToEndPageProps = goToEndPagePropsDefault) => {
      // If we are already navigating, we don't do anything
      if (isNavigating) {
        return
      }
      setIsNavigating(true)

      // If the simulation is finished and is in a poll or a group, we save it (unless save is false)
      if (
        progression === 1 &&
        isAllowedToSave &&
        (currentSimulation.polls || currentSimulation.groups)
      ) {
        await saveSimulation({
          simulation: {
            ...currentSimulation,
            // Fix to avoid computedResults bilan === 0 bug
            computedResults:
              currentSimulation.computedResults?.bilan === 0
                ? getComputedResults(categories, safeEvaluate)
                : currentSimulation.computedResults,
          },
        })
      }

      // If we should show the quiz, we redirect to the quiz page
      // TODO: This is maybe in the wrong place. Should check it later
      if (shouldShowQuiz) {
        router.push(linkToQuiz)
        return
      }

      // if the simulation is in a group and we are allowed to, we redirect to the group results page
      if (currentSimulation.groups && allowedToGoToGroupDashboard) {
        const lastGroupId =
          currentSimulation.groups[currentSimulation.groups.length - 1]

        router.push(getLinkToGroupDashboard({ groupId: lastGroupId }))
        return
      }

      // else we redirect to the results page
      router.push('/fin')
    },
    [
      isNavigating,
      progression,
      currentSimulation,
      router,
      saveSimulation,
      categories,
      safeEvaluate,
    ]
  )

  const getLinkToEndPage = useCallback(
    ({
      allowedToGoToGroupDashboard = false,
      shouldShowQuiz = false,
    }: GetLinkToEndPageProps = GetLinkToEndPagePropsDefault): string => {
      // If we should show the quiz, we redirect to the quiz page
      // TODO: This is maybe in the wrong place. Should check it later
      if (shouldShowQuiz) {
        return linkToQuiz
      }

      // if the simulation is in a group and we are allowed to, we redirect to the group results page
      if (currentSimulation.groups && allowedToGoToGroupDashboard) {
        const lastGroupId =
          currentSimulation.groups[currentSimulation.groups.length - 1]

        return getLinkToGroupDashboard({ groupId: lastGroupId })
      }

      // else we return the results page
      return '/fin'
    },
    [currentSimulation]
  )

  return { goToEndPage, getLinkToEndPage, isNavigating }
}
