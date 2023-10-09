import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useDebug } from '@/hooks/useDebug'
import { useLocale } from '@/hooks/useLocale'
import { useForm, useRule } from '@/publicodes-state'

type Props = {
  question: string
  toggleQuestionList: () => void
}

const statusClassNames = {
  missing: 'bg-gray-100 text-gray-500',
  current: 'border-2 border-primary',
  default: 'bg-primaryLight',
}
export default function Question({ question, toggleQuestionList }: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { label, isMissing, displayValue, unit, type, color } =
    useRule(question)

  const { currentQuestion, setCurrentQuestion } = useForm()

  const isDebug = useDebug()

  const status =
    currentQuestion === question ? 'current' : isMissing ? 'missing' : 'default'

  return (
    <button
      disabled={!isDebug && isMissing}
      className={`relative mb-2 flex w-full flex-col items-end justify-between gap-2 overflow-hidden rounded-lg p-4 pl-6 text-left font-bold md:flex-row md:items-center md:gap-4 ${statusClassNames[status]} `}
      onClick={() => {
        setCurrentQuestion(question)
        toggleQuestionList()
      }}
    >
      <div
        className="absolute bottom-0 left-0 top-0 w-2"
        style={{ backgroundColor: color }}
      />
      <div className="text-sm md:w-2/3 md:text-base">
        {isDebug ? (
          <>
            {question} ({type})
          </>
        ) : (
          label
        )}
      </div>
      <div className="align-center flex justify-end whitespace-nowrap md:text-lg">
        {displayValue !== 'mosaic' ? (
          <div
            className={`rounded-lg bg-white px-4 py-2 ${
              isMissing ? 'text-gray-500' : 'text-primaryDark'
            } first-letter:uppercase`}
          >
            {displayValue
              .toLocaleString(locale, {
                maximumFractionDigits: 2,
              })
              .replaceAll("'", '')}{' '}
            {t(unit ?? "")}
          </div>
        ) : null}
      </div>
    </button>
  )
}
