'use client'

import ExportDataButton from '@/components/organisations/ExportDataButton'
import OrgaStatistics from '@/components/organisations/OrgaStatistics'
import Trans from '@/components/translation/Trans'
import { filterSimulationRecaps } from '@/helpers/organisations/filterSimulationRecaps'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { useParams } from 'next/navigation'
import { useContext } from 'react'
import { FiltersContext } from './_components/FiltersProvider'
import OrgaStatisticsCharts from './_components/OrgaStatisticsCharts'
import OrgaStatisticsFilters from './_components/OrgaStatisticsFilters'

export default function ResultatsDetaillesPage() {
  const params = useParams()

  const { data: pollData } = useFetchPollData({ orgaSlug: String(params.slug) })

  const { ageFilters, postalCodeFilters } = useContext(FiltersContext)

  const filteredSimulationRecaps =
    pollData &&
    filterSimulationRecaps({
      simulationRecaps: pollData?.simulationRecaps,
      ageFilters,
      postalCodeFilters,
    })

  return (
    <div className="pt-12">
      <div className="mb-10 flex flex-wrap items-center justify-between md:flex-nowrap">
        <h1 className="text-xl md:text-2xl">
          <Trans>Résultats détaillés de</Trans>{' '}
          <span className="text-primary-500">
            {pollData?.organisationName ?? ''}
          </span>
        </h1>

        {pollData?.isAdmin && (
          <ExportDataButton
            simulationRecaps={pollData?.simulationRecaps ?? []}
            color="secondary"
          />
        )}
      </div>

      <OrgaStatisticsFilters
        simulationRecaps={pollData?.simulationRecaps ?? []}
        filteredSimulationRecaps={filteredSimulationRecaps ?? []}
        defaultAdditionalQuestions={pollData?.defaultAdditionalQuestions ?? []}
      />

      <OrgaStatistics
        simulationRecaps={filteredSimulationRecaps ?? []}
        funFacts={pollData?.funFacts}
        title={<Trans>Chiffres clés</Trans>}
      />

      <OrgaStatisticsCharts simulationRecaps={filteredSimulationRecaps ?? []} />
    </div>
  )
}
