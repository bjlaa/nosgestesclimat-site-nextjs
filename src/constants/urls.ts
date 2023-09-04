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

export const serverURL = protocol + process.env.SERVER_URL

export const simulationURL = serverURL + '/simulation/'
