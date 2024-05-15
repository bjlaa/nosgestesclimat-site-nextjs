import { MigrationType, Simulation } from '@/publicodes-state/types'
import { migrateSituation } from '@publicodes/tools'
import { v4 as uuidv4 } from 'uuid'

export function generateSimulation({
  id = uuidv4(),
  date = new Date().toISOString(),
  situation = {},
  foldedSteps = [],
  actionChoices = {},
  persona,
  computedResults,
  progression = 0,
  defaultAdditionalQuestionsAnswers,
  polls,
  groups,
  savedViaEmail,
  migrationInstructions,
}: Partial<Simulation> & {
  migrationInstructions?: MigrationType
} = {}): Simulation {
  const simulation = {
    id,
    date,
    situation,
    foldedSteps,
    actionChoices,
    persona,
    computedResults,
    progression,
    defaultAdditionalQuestionsAnswers,
    polls,
    groups,
    savedViaEmail,
  } as Simulation

  if (migrationInstructions) {
    const { situationMigrated, foldedStepsMigrated } = migrateSituation({
      situation: simulation.situation as any,
      foldedSteps: simulation.foldedSteps,
      migrationInstructions,
    })

    return {
      ...simulation,
      situation: situationMigrated,
      foldedSteps: foldedStepsMigrated,
    }
  }

  return simulation
}
