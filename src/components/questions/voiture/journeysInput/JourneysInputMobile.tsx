import Trans from '@/components/translation/Trans'
import { Journey } from '@/types/journey'
import { motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
import JourneyItem from './_components/JourneyItem'
import Summary from './_components/Summary'
import AddJourneyMobile from './journeysInputMobile/AddJourneyMobile'

type Props = {
  journeys: Journey[]
  setJourneys: Dispatch<SetStateAction<Journey[]>>
  averagePassengers: number
  total: number
  totalForOnePassenger: number
}

export default function JourneysInputMobile({
  journeys,
  setJourneys,
  averagePassengers,
  total,
  totalForOnePassenger,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-2 block w-full overflow-scroll rounded-lg bg-white p-2 md:hidden">
      <table className="block w-full border-collapse md:table">
        <tbody className="block w-full">
          <AddJourneyMobile
            className="block md:hidden"
            key={`${journeys.length}-mobile`}
            setJourneys={setJourneys}
          />

          {journeys.length > 0 && (
            <tr className="mt-4 block w-full text-left md:hidden">
              <th className="mb-2 block">
                <Trans>Vos trajets :</Trans>
              </th>
            </tr>
          )}

          {journeys.map((journey, index) => (
            <JourneyItem
              key={journey.id}
              journey={journey}
              odd={index % 2 ? false : true}
              setJourneys={setJourneys}
            />
          ))}
        </tbody>
      </table>

      <Summary
        total={total}
        averagePassengers={averagePassengers}
        totalForOnePassenger={totalForOnePassenger}
      />
    </motion.div>
  )
}
