import { NGC_MODEL_API_URL, getModelPRUrl } from '@/constants/urls'
import useModelVersion from '@/hooks/useModelVersion'

export const useDataServer = () => {
  const PRNumber = 2108
  const modelVersion = useModelVersion()

  if (PRNumber) {
    const previewURL = getModelPRUrl(PRNumber)
    console.debug(`[useDataServer] using preview URL: ${previewURL}`)
    return previewURL
  }

  return `${NGC_MODEL_API_URL}/${modelVersion}`
}
