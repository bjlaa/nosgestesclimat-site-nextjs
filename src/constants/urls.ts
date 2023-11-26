const secure = process.env.NODE_ENV === 'development' ? '' : 's'
const protocol = `http${secure}://`

export const SERVER_URL =
  protocol + (process.env.NEXT_PUBLIC_SERVER_URL || 'localhost:3001')

export const SIMULATION_URL = SERVER_URL + '/simulation/'

export const EMAIL_SIMULATION_URL = SERVER_URL + '/email-simulation/'

export const GROUP_URL = SERVER_URL + '/group'

export const SAVE_SIMULATION_URL = SERVER_URL + '/email-simulation'

export const NGC_MODEL_API_URL =
  'https://nosgestesclimat-api.osc-fr1.scalingo.io'

// Use the fallback url if the NGC_MODEL_API_URL is not available
export const NGC_MODEL_API_URL_FALLBACK = `https://master--ecolab-data.netlify.app`

export const getModelPRUrl = (PRNumber: string | number) =>
  `https://deploy-preview-${PRNumber}--ecolab-data.netlify.app`
