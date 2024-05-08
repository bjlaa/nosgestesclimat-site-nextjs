import { useActions, useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import Action from './actions/Action'

type Props = {
  subcategory: DottedName
}

const forbidenActions = ['alimentation . devenir végétalien']

export default function Actions({ subcategory }: Props) {
  const { category } = useRule(subcategory)

  const { orderedActions } = useActions()

  const filteredActions = orderedActions.filter(
    (orderedAction) => !forbidenActions.includes(orderedAction)
  )

  const actionsOfCategory = filteredActions.filter((orderedAction) =>
    orderedAction.includes(category)
  )

  const firstThreeActions = actionsOfCategory.slice(0, 3)
  return (
    <div className="mb-4 flex flex-row-reverse gap-4">
      {firstThreeActions.map((action, index) => (
        <Action key={action} action={action} index={index} />
      ))}
    </div>
  )
}
