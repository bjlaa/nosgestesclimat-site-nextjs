import { SimulationRecap } from '@/types/organizations'

type Props = {
  simulationRecaps: SimulationRecap[]
  ageFilters: { value: [number, number] }[]
  postalCodeFilters: { value: string }[]
}

export function filterSimulationRecaps({
  simulationRecaps,
  ageFilters,
  postalCodeFilters,
}: Props) {
  return simulationRecaps.filter(({ defaultAdditionalQuestionsAnswers }) => {
    const birthYear = new Date(
      defaultAdditionalQuestionsAnswers.birthDate
    ).getFullYear()

    const postalCode = defaultAdditionalQuestionsAnswers.postalCode

    const isPassingAgeFilter =
      ageFilters.length === 0 ||
      ageFilters.some((ageFilter) => {
        const [max, min] = ageFilter.value as [number, number]

        const age = new Date().getFullYear() - birthYear

        return age >= min && age <= max
      })

    const isPassingPostalCodeFilter =
      postalCodeFilters.length === 0 ||
      postalCodeFilters.some(
        (filterObject) => filterObject.value === postalCode
      )

    return isPassingAgeFilter && isPassingPostalCodeFilter
  })
}
