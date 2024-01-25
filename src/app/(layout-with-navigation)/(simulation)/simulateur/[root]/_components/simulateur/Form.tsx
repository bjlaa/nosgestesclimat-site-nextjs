import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import questions from '@/components/questions'
import { getMatomoEventParcoursTestOver } from '@/constants/matomo'
import { formatResultToDetailParam } from '@/helpers/url/formatResultToDetailParam'
import { useDebug } from '@/hooks/useDebug'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
import { useEngine, useForm, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ColorIndicator from './form/ColorIndicator'
import { useUpdateGroupAndRedirectToGroup } from './form/_hooks/useUpdateGroupAndRedirectToGroup'

export default function Form() {
  // We store here a temporary value that will be used to display the error message
  // for a question that has a minimum value
  const [invalidValue, setInvalidValue] = useState<number | undefined>()

  const router = useRouter()

  const isDebug = useDebug()

  const { groupToRedirectToAfterTest } = useUser()

  const {
    remainingQuestions,
    relevantAnsweredQuestions,
    currentQuestion,
    setCurrentQuestion,
    categories,
  } = useForm()

  const { getValue, getNumericValue } = useEngine()

  const { questionInQueryParams, setQuestionInQueryParams } =
    useQuestionInQueryParams()

  const [isInitialized, setIsInitialized] = useState(false)

  const handleUpdateGroupAndRedirectToGroup = useUpdateGroupAndRedirectToGroup()

  useEffect(() => {
    if (!isInitialized) {
      if (
        questionInQueryParams &&
        (relevantAnsweredQuestions.includes(questionInQueryParams) || isDebug)
      ) {
        setCurrentQuestion(questionInQueryParams)
      } else {
        setCurrentQuestion(remainingQuestions[0])
      }
      setIsInitialized(true)
    }
  }, [
    isDebug,
    questionInQueryParams,
    remainingQuestions,
    relevantAnsweredQuestions,
    setCurrentQuestion,
    isInitialized,
  ])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentQuestion])

  useEffect(() => {
    if (isInitialized && currentQuestion) {
      setQuestionInQueryParams(currentQuestion)
    }
  }, [setQuestionInQueryParams, currentQuestion, isInitialized])

  if (!isInitialized || !currentQuestion) {
    return
  }

  const SpecificQuestion = questions[currentQuestion]

  return (
    <div className="relative mb-4 overflow-hidden rounded-lg bg-grey-100 p-4 pl-6">
      <ColorIndicator question={currentQuestion} />
      {SpecificQuestion ? (
        <SpecificQuestion
          setInvalidValue={setInvalidValue}
          invalidValue={invalidValue}
        />
      ) : (
        <Question
          question={currentQuestion}
          key={currentQuestion}
          invalidValue={invalidValue}
          setInvalidValue={setInvalidValue}
        />
      )}
      <Navigation
        question={currentQuestion}
        isNextButtonDisabled={invalidValue !== undefined}
        onComplete={() => {
          trackEvent(getMatomoEventParcoursTestOver(getNumericValue('bilan')))

          // When a user joins a group without having his test passed
          if (groupToRedirectToAfterTest) {
            handleUpdateGroupAndRedirectToGroup({
              group: groupToRedirectToAfterTest,
            })
            return
          }
          router.push(
            `/fin?${formatResultToDetailParam({
              categories,
              getValue,
            })}`
          )
        }}
      />
    </div>
  )
}
