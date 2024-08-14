import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { endClickActions } from '@/constants/tracking/pages/end'
import { useEngine, useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Action from './actions/Action'

type Props = {
  subcategory: string
  noNumberedFootprint?: boolean
}

type ActionObject = {
  dottedName: string
  value: number
}

export default function Actions({ subcategory, noNumberedFootprint }: Props) {
  const { getValue } = useEngine()

  const { title, actions } = useRule(subcategory as DottedName)

  const filteredActions = noNumberedFootprint
    ? actions
    : actions?.filter((action: string) => getValue(action as DottedName))

  if (!filteredActions?.length) return null

  const sortedActions = noNumberedFootprint
    ? filteredActions.sort((a: string) => {
        if (a.includes('voter')) {
          return -1
        }
        return 1
      })
    : filteredActions
        .map((action: string) => ({
          dottedName: action,
          value: getValue(action as DottedName) as number,
        }))
        .sort((a: ActionObject, b: ActionObject) =>
          a.value > b.value ? -1 : 1
        )
        .map((actionObject: ActionObject) => actionObject.dottedName)

  const firstThreeActions = sortedActions.slice(0, 3)

  return (
    <>
      {!noNumberedFootprint && (
        <p className="mb-6 text-sm">
          <Trans>
            Voici quelques idées pour vous aider à réduire votre impact :
          </Trans>
        </p>
      )}
      <div className="mb-4 flex flex-row-reverse justify-center gap-4">
        {firstThreeActions.map((action, index) => (
          <Action key={action} action={action} index={index} />
        ))}
      </div>
      {!noNumberedFootprint && (
        <div className="flex justify-center">
          <Link
            onClick={() => trackEvent(endClickActions)}
            href="/actions"
            className="text-center text-xs">
            <Trans>Voir tous les gestes</Trans> : {title}
          </Link>
        </div>
      )}
    </>
  )
}