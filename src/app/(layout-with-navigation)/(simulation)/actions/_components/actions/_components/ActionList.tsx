'use client'

import { actionsClickYes } from '@/constants/tracking/pages/actions'
import {
  FormProvider,
  useCurrentSimulation,
  useEngine,
  useUser,
} from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import ActionCard from './ActionCard'
import ActionForm from './ActionForm'
import CustomActionForm from './actionList/CustomActionForm'

type Props = {
  actions: any[]
  rules: any
  bilan: any
  focusedAction: string
  setFocusedAction: (dottedName: string) => void
}

export default function ActionList({
  actions,
  rules,
  bilan,
  focusedAction,
  setFocusedAction,
}: Props) {
  const { getCategory } = useEngine()
  const { toggleActionChoice } = useUser()

  const { actionChoices } = useCurrentSimulation()

  const isFocusedActionCustom = focusedAction.includes('personnalisée')

  return (
    <ul className="mt-4 flex list-none flex-wrap items-center justify-center p-0">
      {actions.map((action) => {
        const cardComponent = (
          <li key={action.dottedName} className="m-2 w-[12rem]">
            <ActionCard
              setFocusedAction={setFocusedAction}
              isFocused={focusedAction === action.dottedName}
              rule={rules[action.dottedName]}
              action={action}
              total={bilan?.nodeValue}
            />
          </li>
        )

        if (focusedAction === action.dottedName && !isFocusedActionCustom) {
          const convId = 'conv'

          return (
            <>
              <li className="m-4 h-auto w-full" key={convId}>
                <FormProvider root={action.dottedName}>
                  <ActionForm
                    key={action.dottedName}
                    category={getCategory(action.dottedName)}
                    onComplete={() => {
                      toggleActionChoice(action.dottedName)

                      if (!actionChoices[action.dottedName]) {
                        trackEvent(actionsClickYes(action.dottedName))
                      }
                      setFocusedAction('')

                      setTimeout(() => {
                        // scroll to div bearing the dottedName
                        const el = document.getElementById(action.dottedName)
                        if (el) {
                          el.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'center',
                          })
                        }
                      }, 100)
                    }}
                  />
                </FormProvider>
              </li>

              {cardComponent}
            </>
          )
        }

        if (focusedAction === action.dottedName && isFocusedActionCustom) {
          return (
            <CustomActionForm
              dottedName={action.dottedName}
              setFocusedAction={setFocusedAction}
              key={`${action.dottedName}-custom-form`}
            />
          )
        }
        return cardComponent
      })}
    </ul>
  )
}
