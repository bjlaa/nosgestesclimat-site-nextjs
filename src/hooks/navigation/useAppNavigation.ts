import { useUser } from '@/publicodes-state'
import { useSearchParams } from 'next/navigation'
import { useOrganisationQueryParams } from '../organizations/useOrganisationQueryParams'
import { usePoll } from '../organizations/usePoll'

/**
 * Really rought hook to provide adequate links to the user, depending on his current state
 */
export function useAppNavigation() {
  const searchParams = useSearchParams()
  const queryParamsString = searchParams.toString()

  const { getCurrentSimulation } = useUser()
  const currentSimulation = getCurrentSimulation()

  const { pollSlug } = useOrganisationQueryParams()
  const { data: poll } = usePoll({ pollSlug })

  const linkToTutorial = `/tutoriel?${queryParamsString}`

  const linkToPollDashboard = `organisations/resultats-detailles/${currentSimulation?.poll}`

  const getLinkToInfosPage = (index: number) => {
    const infosPages = {
      email: `/infos/email?${queryParamsString}`,
      postalCode: `/infos/codepostal?${queryParamsString}`,
      birthdate: `/infos/naissance?${queryParamsString}`,
    }

    // if there is no pollSlug in query param, go to the test
    if (!pollSlug) {
      return `/simulateur/bilan`
    }

    // if there is no poll yet, return empty string (it should be handled by the caller component)
    if (!poll) {
      return ''
    }

    console.log('coucou')
    if (index === 0) {
      return infosPages.email
    }

    // if there is no poll or no additional question, go to the test
    if ((poll?.defaultAdditionalQuestions.length || 0) < index) {
      return `/infos/commencer?${queryParamsString}`
    }
    console.log(poll.defaultAdditionalQuestions[index - 1])

    // if there is an additional question, go to the corresponding page
    return infosPages[poll.defaultAdditionalQuestions[index - 1]]
  }

  const linkToEndPage = `/fin`

  return {
    linkToTutorial,
    linkToPollDashboard,
    getLinkToInfosPage,
    linkToEndPage,
  }
}
