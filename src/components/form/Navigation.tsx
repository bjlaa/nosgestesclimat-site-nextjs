import {
  getMatomoEventClickDontKnow,
  getMatomoEventClickNextQuestion,
  getMatomoEventClickPrevQuestion,
} from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'

type Props = {
  question: string
  onComplete?: () => void
}

//TODO: It should maayyybe be described in the model...
const questionsThatCantBeZero = [
  'transport . voiture . saisie voyageurs',
  'logement . saisie habitants',
  'logement . surface',
]

export default function Navigation({ question, onComplete = () => '' }: Props) {
  const { t } = useClientTranslation()
  const { gotoPrevQuestion, gotoNextQuestion, noPrevQuestion, noNextQuestion } =
    useForm()
  const { isMissing, setDefaultAsValue, numericValue } = useRule(question)
  const [isSettingDefaultValue, setIsSettingDefaultValue] = useState(false)

  const nextDisabled =
    questionsThatCantBeZero.includes(question) && numericValue < 1
  return (
    <div className="flex justify-end  gap-4">
      {!noPrevQuestion ? (
        <Button
          disabled={isSettingDefaultValue}
          onClick={() => {
            trackEvent(getMatomoEventClickPrevQuestion(question))
            if (!noPrevQuestion) {
              gotoPrevQuestion()
            }
          }}
          color="text">
          {'← ' + t('Précédent')}
        </Button>
      ) : null}
      <Button
        color={isMissing ? 'secondary' : 'primary'}
        disabled={isSettingDefaultValue || nextDisabled}
        onClick={async () => {
          if (isMissing) {
            trackEvent(getMatomoEventClickDontKnow(question))
          } else {
            trackEvent(getMatomoEventClickNextQuestion(question))
          }
          setIsSettingDefaultValue(true)
          await setDefaultAsValue(question)
          setIsSettingDefaultValue(false)

          // Focus the question title upon question change
          setTimeout(() => {
            const questionTitle = document.getElementById('question-label')

            questionTitle?.focus()
          })

          if (!noNextQuestion) {
            gotoNextQuestion()

            return
          }
          onComplete()
        }}>
        {noNextQuestion
          ? t('Terminer')
          : isMissing
          ? t('Je ne sais pas') + ' →'
          : t('Suivant') + ' →'}
      </Button>
    </div>
  )
}
