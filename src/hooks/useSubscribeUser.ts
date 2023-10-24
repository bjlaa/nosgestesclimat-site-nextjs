import { SAVE_SIMULATION_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'
import { formatDataForDB } from '@/utils/formatDataForDB'
import * as Sentry from '@sentry/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  simulation: Simulation
  email: string
  optIn: boolean
  shouldSendReminder: boolean
}
export function useSubscribeUser() {
  return useMutation(
    async ({
      simulation,
      email,
      optIn,
      shouldSendReminder,
    }: Props): Promise<any> => {
      const idSimulationSaved: string = await saveSimulationInDB(
        simulation as unknown as Simulation
      )

      if (!idSimulationSaved)
        return Promise.reject(Error(`Impossible d'enregistrer la simulation`))

      return axios.post(`/api/email-service`, {
        email,
        optIn,
        shouldSendReminder,
        simulationURL:
          location +
          `&sid=${encodeURIComponent(
            idSimulationSaved
          )}&mtm_campaign=retrouver-ma-simulation`,
        // URL already contains the query param details
        shareURL: location.toString() + '&mtm_campaign=partage-email',
      })
    }
  )
}

const saveSimulationInDB = async (data: Simulation) => {
  const dataFormatted = { ...data }

  if (dataFormatted.situation) {
    dataFormatted.situation = formatDataForDB(dataFormatted)
  }

  try {
    const response = await axios.post(
      SAVE_SIMULATION_URL,
      {
        data: dataFormatted,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const idSimulationSaved = response.data
    return idSimulationSaved
  } catch (e) {
    Sentry.captureException(e)
  }
}
