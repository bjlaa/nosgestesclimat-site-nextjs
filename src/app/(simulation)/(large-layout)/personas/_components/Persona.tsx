'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { fixSituationWithPartialMosaic } from '@/helpers/personas/fixSituationWithPartialMosaic'
import { getPersonaFoldedSteps } from '@/helpers/personas/getPersonaFoldedSteps'
import {
  useCurrentSimulation,
  useSimulation,
  useUser,
} from '@/publicodes-state'
import { Persona as PersonaType } from '@/publicodes-state/types'

type Props = {
  persona: PersonaType
  personaName: string
}

export default function Persona({ persona, personaName }: Props) {
  const { initSimulation, hideTutorial } = useUser()

  const currentSimulation = useCurrentSimulation()

  const {
    everyMosaicChildrenWithParent,
    everyQuestions,
    everyRules,
    pristineEngine,
    safeEvaluate,
    safeGetRule,
  } = useSimulation()

  const isCurrentPersonaSelected = currentSimulation.persona === personaName

  return (
    <Card
      className={`${
        isCurrentPersonaSelected
          ? '!border-2 border-green-500 bg-green-200'
          : 'border-none bg-primary-50'
      } items-center`}>
      <div className="text-lg">{persona['icônes']}</div>

      <h3>{persona.nom}</h3>

      <p className="text-center text-sm">
        {persona['résumé'] || persona['description']}
      </p>

      {!isCurrentPersonaSelected && (
        <Button
          size="sm"
          className="align-self-end mt-auto"
          disabled={isCurrentPersonaSelected}
          onClick={() => {
            initSimulation({
              situation: fixSituationWithPartialMosaic({
                situation: persona.situation,
                everyMosaicChildrenWithParent,
                safeGetRule,
                safeEvaluate,
              }),
              persona: personaName,
              foldedSteps: getPersonaFoldedSteps({
                situation: persona.situation,
                everyMosaicChildrenWithParent,
                everyQuestions,
                everyRules,
                pristineEngine,
                safeGetRule,
                safeEvaluate,
              }),
            })
            hideTutorial('testIntro')
          }}>
          <Trans>Sélectionner</Trans>
        </Button>
      )}

      {isCurrentPersonaSelected && (
        <p className="align-self-end mb-0 mt-auto p-1 text-sm font-bold">
          <Trans>Sélectionné·e</Trans>
        </p>
      )}
    </Card>
  )
}
