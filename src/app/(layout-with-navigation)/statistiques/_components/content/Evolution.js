import TransClient from '@/components/translation/TransClient'
import Card from '@/design-system/layout/Card'
import { useEffect, useState } from 'react'
export default function Evolution(props) {
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    const lastPeriod = props.reference - props.period
    const difference = props.period - lastPeriod
    setPercent((difference / lastPeriod) * 100)
  }, [props.period, props.reference])

  // We didn't track this stat at the beginning so we're guessing based on todays average completion
  const baseSimulations = 32015
  const simulations = props.simulations

  return (
    <div className="flex flex-row gap-4 md:!flex-col">
      <Card className="flex-1">
        <div className="m-0">
          <p className="mb-0 text-4xl font-bold">
            {props.allTime
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}
          </p>{' '}
          <p className="mb-0 text-sm">
            <TransClient>visites depuis le lancement</TransClient>
          </p>
        </div>
      </Card>
      <Card className="flex-1 flex-col gap-4">
        <div className="text-sm">
          <p className="mb-0 text-3xl font-bold">
            {percent > 0 && '+'}
            {Math.round(percent * 10) / 10}%
          </p>{' '}
          <p>
            <TransClient>
              de visites ce mois ci
              <small>&nbsp;(par rapport au mois d'avant)</small>
            </TransClient>
          </p>
        </div>

        <div>
          <p className="mb-0 text-3xl font-bold">
            {(simulations?.nb_visits + baseSimulations)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}
          </p>{' '}
          <p className="mb-0 text-sm">
            <TransClient>simulations terminées depuis le lancement</TransClient>
          </p>
        </div>
      </Card>
    </div>
  )
}
