'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useUser } from '@/publicodes-state'
import { Simulation } from '@/publicodes-state/types'

export default function SimulationList() {
  const {
    simulations,
    currentSimulationId,
    setCurrentSimulationId,
    deleteSimulation,
  } = useUser()

  return (
    <div className="my-6">
      <h2 className="text-lg">
        <span
          role="img"
          aria-label="emoji save"
          aria-hidden
          className="mr-4 inline-block">
          💾
        </span>
        <Trans>Mon historique des simulations</Trans>
      </h2>
      <p>
        <Trans i18nKey={'publicodes.Profil.simulations'}>
          Chaque simulation que vous faite est sauvegardée dans votre navigateur
          Web. Vous êtes le seul à y avoir accès.
        </Trans>
      </p>
      <ul>
        {simulations.map((simulation: Simulation) => {
          const simulationDate =
            simulation.date !== undefined
              ? new Date(simulation.date)
              : new Date()

          return (
            <li key={simulation.id} className="mb-2 list-none">
              <details>
                <summary>
                  <div className="inline-flex">
                    <span>{simulationDate.toLocaleDateString()}</span>
                    <span className="ml-1 hidden w-[8rem] overflow-hidden overflow-ellipsis whitespace-nowrap md:inline-block">
                      - {simulation.id}
                    </span>
                    {currentSimulationId === simulation.id ? (
                      <span className="mx-2">
                        ✅ <Trans>Chargée</Trans>
                      </span>
                    ) : (
                      <span>
                        <Button
                          className="mx-2"
                          size="sm"
                          onClick={() => {
                            setCurrentSimulationId(simulation.id)
                          }}>
                          <Trans>Charger</Trans>
                        </Button>
                        <Button
                          className="mx-2"
                          size="sm"
                          onClick={() => {
                            deleteSimulation(simulation.id)
                          }}>
                          <Trans>Supprimer</Trans>
                        </Button>
                      </span>
                    )}
                  </div>
                </summary>
                <ul>
                  <li>
                    <Trans>Date complète :</Trans>
                    {simulationDate.toLocaleDateString()}{' '}
                    {simulationDate.toLocaleTimeString()}.
                  </li>
                  <li>
                    <Trans>Identifiant :</Trans> {simulation.id}.
                  </li>
                </ul>
              </details>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
