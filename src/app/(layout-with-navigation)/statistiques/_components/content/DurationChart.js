import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import TransClient from '@/components/translation/TransClient'
import CustomTooltip from './histogram/CustomTooltip'

export default function visitDuration(props) {
  // 0-1 min excluded
  const zeroToSeven = props.duration
    .slice(3, 6)
    .reduce((memo, elt) => memo + elt.nb_visits, 0)

  const duration = props.duration.slice(6, 10)
  duration.unshift({
    label: '1-7\u00A0min',
    nb_visits: zeroToSeven,
    segment: 'visitDuration>=60;visitDuration<=420',
  })

  return (
    <div className="h-[22rem] w-full">
      <h4>
        <TransClient>Nombre de visites pour les 60 derniers jours</TransClient>
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={duration}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip content={<CustomTooltip label={duration} />} />
          <Bar dataKey="nb_visits" fill="#5758BB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
