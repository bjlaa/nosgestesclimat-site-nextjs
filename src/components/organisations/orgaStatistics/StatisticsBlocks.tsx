import VerticalBarChart from '@/components/charts/VerticalBarChart'
import Trans from '@/components/translation/Trans'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { SimulationRecap } from '@/types/organisations'
import CategoryChartItem from './statisticsBlocks/CategoryChartItem'
import ResultsSoonBanner from './statisticsBlocks/ResultsSoonBanner'

// Create a mock results object with the default carbon footprints values for each category
const mockResults = {
  bilan: 8000,
  transport: 3000,
  logement: 1000,
  alimentation: 1000,
  divers: 500,
  'services sociétaux': 2000,
}

function formatSimulationRecaps(simulationRecaps: SimulationRecap[]) {
  const result = simulationRecaps.reduce(
    (acc, simulation) => {
      return {
        bilan: acc.bilan + simulation.bilan,
        transport: acc.transport + simulation?.categories?.transport,
        logement: acc.logement + simulation?.categories?.logement,
        alimentation: acc.alimentation + simulation?.categories?.alimentation,
        divers: acc.divers + simulation?.categories?.divers,
        'services sociétaux':
          acc['services sociétaux'] +
          simulation?.categories?.['services sociétaux'],
      }
    },
    {
      bilan: 0,
      transport: 0,
      logement: 0,
      alimentation: 0,
      divers: 0,
      'services sociétaux': 0,
    }
  )
  Object.keys(result).forEach((key: string) => {
    result[key as keyof typeof result] =
      result[key as keyof typeof result] / simulationRecaps.length
  })

  return result
}

export default function StatisticsBlocks({
  simulationRecaps,
}: {
  simulationRecaps: SimulationRecap[]
}) {
  if (!simulationRecaps) {
    return null
  }

  const hasLeastThan3Participants = simulationRecaps.length < 3

  const result = hasLeastThan3Participants
    ? mockResults
    : formatSimulationRecaps(simulationRecaps)

  const { formattedValue, unit } = formatCarbonFootprint(result?.bilan, {
    maximumFractionDigits: 1,
  })

  const optionalSString = simulationRecaps.length > 1 ? 's' : ''

  return (
    <div className="items grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-grey-100 p-8 md:col-span-1">
        <p className="text-4xl font-bold text-primary-500">
          {simulationRecaps.length}
        </p>

        <p className="text-xl">
          <Trans>
            Simulation{optionalSString} terminée{optionalSString}
          </Trans>
        </p>
      </div>
      <div className="relative col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
        {hasLeastThan3Participants && <ResultsSoonBanner />}
        <div className="relative rounded-lg bg-grey-100 p-8">
          <p className="text-4xl font-bold text-primary-500">
            {formattedValue}{' '}
            <span className="text-base font-normal">{unit} CO2 eq</span>
          </p>
          <p className="text-xl">
            <Trans>Empreinte moyenne</Trans>
          </p>
        </div>

        <div className="relative min-h-[200px] rounded-lg bg-grey-100 py-2">
          <VerticalBarChart className={`mt-0 h-[calc(100%-48px)]`}>
            {Object.entries(result)
              .filter(([key]) => key !== 'bilan')
              .map(([key, value], index) => (
                <CategoryChartItem
                  index={index}
                  key={key}
                  category={key}
                  maxValue={result.bilan / 1000}
                  value={value / 1000}
                />
              ))}
          </VerticalBarChart>
          <h3 className="mb-4 ml-6 mt-4 text-sm">
            <Trans>Moyenne du groupe par catégorie</Trans>
          </h3>
        </div>
      </div>
    </div>
  )
}