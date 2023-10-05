import Choice from './choicesInput/Choice'

type Props = {
  question: string
  value: string
  isMissing: boolean
  choices: any[]
  setValue: (value: string) => void
  'data-cypress-id': string
  label: string
}

export default function ChoicesInput(props: Props) {
  const { question, value, isMissing, choices, setValue, label } = props

  return (
    <fieldset className="align flex flex-col items-end">
      <legend className="sr-only">{label}</legend>

      {choices &&
        choices.map((choice: any) => (
          <Choice
            key={choice}
            question={question}
            choice={choice}
            active={!isMissing && value === choice}
            setValue={setValue}
            data-cypress-id={`${props['data-cypress-id']}-${choice}`}
          />
        ))}
    </fieldset>
  )
}
