'use client'

import { Points } from '@/types/groups'
import { Trans } from 'react-i18next'
import PointsListItem from './PointsListItem'

export default function PointsFortsFaibles({
  pointsForts,
  pointsFaibles,
}: {
  pointsForts?: Points[]
  pointsFaibles?: Points[]
}) {
  return (
    <div>
      <h2 className="mt-0 text-lg" data-cypress-id="points-fort-faibles-title">
        <Trans>Vos points forts</Trans>
      </h2>
      <p className="mb-4 text-gray-500">
        <Trans>Par rapport à la moyenne du groupe.</Trans>
      </p>
      <ul className="pl-0">
        {pointsForts?.map((point, index) => {
          const { name, value, variation } = point.resultObject

          return (
            <PointsListItem
              name={name}
              value={value}
              variation={variation || 0}
              key={`points-forts-${index}`}
            />
          )
        })}
      </ul>

      <h2 className="mt-6 text-lg">
        <Trans>Vos points faibles</Trans>
      </h2>
      <ul className="pl-0">
        {pointsFaibles?.map((point, index) => {
          const { name, value, variation } = point.resultObject
          return (
            <PointsListItem
              name={name}
              value={value}
              variation={variation || 0}
              key={`points-faibles-${index}`}
            />
          )
        })}
      </ul>
    </div>
  )
}
