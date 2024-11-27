import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  question?: DottedName
  locale?: string
}
export const getLinkToSimulateur = ({ question, locale }: Props = {}) => {
  const basePath = locale ? `/${locale}` : ''
  // If no question is provided, we return
  if (!question) {
    return `${basePath}/simulateur/bilan`
  }
  //
  return `${basePath}/simulateur/bilan?question=${question
    .replaceAll(' . ', '.')
    .replaceAll(' ', '_')}`
}
