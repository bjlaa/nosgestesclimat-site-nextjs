const openmojis = {
  test: '25B6',
  action: 'E10C',
  conference: '1F3DF',
  sondage: '1F4CA',
  profile: 'silhouette',
  silhouettes: 'silhouettes',
  personas: '1F465',
  github: 'E045',
} as { [key: string]: string }

export const getOpenmojiURL = (name: string) => `/images/${openmojis[name]}.svg`

const secure = process.env.NODE_ENV === 'development' ? '' : 's'
const protocol = `http${secure}://`

export const SERVER_URL =
  protocol + (process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL)

export const SIMULATION_URL = SERVER_URL + '/simulation/'

export const GROUP_URL =
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : SERVER_URL) + '/group'

export const SAVE_SIMULATION_URL =
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : SERVER_URL) + '/email-simulation'

export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://nosgestesclimat.fr'
