'use client'

import { useEngine, useForm, useUser } from '@/publicodes-state'
import { useMemo, useState } from 'react'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import ActionsTutorial from './_components/ActionsTutorial'
import CategoryFilters from './_components/CategoryFilters'
import PetrolFilter from './_components/PetrolFilter'
import SimulationMissing from './_components/SimulationMissing'
import useActions from './_helpers/getActions'
import { getCarbonFootprint } from './_helpers/getCarbonFootprint'

export default function ActionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { t, i18n } = useClientTranslation()

  const [radical, setRadical] = useState(true)
  const [focusedAction, focusAction] = useState('')

  const metric = searchParams.métrique || ''

  const [metricTargeted] = useState(metric)

  const { progression, categories } = useForm()

  const { user } = useUser()
  const { getValue, rules } = useEngine()

  const category = searchParams.catégorie
  console.log(rules)
  /*
  const tutorials = useSelector((state: AppState) => state.tutorials)
*/
  const tutorials = {}

  const actions = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useActions({
        metric: metricTargeted as string,
        focusedAction,
        rules,
        radical,
        getValue,
        user,
      }),
    [metricTargeted, focusedAction, rules, radical, getValue, user]
  )

  const bilan = { ...getValue('bilan'), dottedName: 'bilan' }

  const filterByCategory = (actions: any) =>
    actions.filter((action: any) =>
      category ? action.dottedName.split(' . ')[0] === category : true
    )

  const finalActions = filterByCategory(actions)

  const countByCategory = finalActions.reduce(
    (accumulator: any, action: any) => {
      const category = action.dottedName.split(' . ')[0]

      return { ...accumulator, [category]: (action[category] || 0) + 1 }
    },
    {}
  )

  //TODO this is quite a bad design
  // we'd better check if the test is finished
  // but is it too restrictive ?
  const isSimulationWellStarted = progression > 0.5

  const [value, unit] = getCarbonFootprint({ t, i18n }, bilan.nodeValue)

  return (
    <div className="pb-4 my-4 mx-auto">
      {!isSimulationWellStarted && <SimulationMissing />}

      {isSimulationWellStarted && (tutorials as any).actions !== 'skip' && (
        <ActionsTutorial value={value} unit={unit} />
      )}

      <div
        className={
          isSimulationWellStarted ? '' : 'pointer-events-none opacity-70'
        }
        aria-hidden={isSimulationWellStarted ? 'false' : 'true'}>
        <PetrolFilter />

        <CategoryFilters
          categories={categories}
          // metric={metric}
          isSelected={!!category}
          countByCategory={countByCategory}
        />
        {/*
        <OptionsBar
          setRadical={setRadical}
          radical={radical}
          finalActions={finalActions}
        />

        <Actions
          actions={finalActions.reverse()}
          rules={rules}
          bilan={bilan}
          focusAction={focusAction}
          focusedAction={focusedAction}
          radical={radical}
        />
             */}
      </div>
    </div>
  )
}
