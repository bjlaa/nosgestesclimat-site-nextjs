import Button from '@/design-system/inputs/Button'
import { useRule } from '@/publicodes-state'
type Props = {
  question: string
  title?: string
  icons?: string
  description?: string
  setValue: (value: number) => void
}

export default function NumberInput({
  question,
  title,
  icons,
  description,
  setValue,
}: Props) {
  const { numericValue, isMissing } = useRule(question)

  // Model shenanigans for description split...
  return (
    <div
      className={
        'flex items-center justify-between gap-4 rounded  bg-grey-100 px-4 py-2 md:py-4'
      }>
      <div>
        {title && icons ? (
          <span className="font-semibold md:text-xl">
            {title}&nbsp;{icons}
          </span>
        ) : null}
        {description ? (
          <>
            <br />
            <p className="mb-0 text-xs italic md:text-sm">
              {description.split('\n')[0]}
            </p>
          </>
        ) : null}
      </div>
      <div className="flex items-center">
        <Button
          disabled={numericValue === 0}
          onClick={() => setValue(numericValue - 1)}
          className="z-10 h-10 w-10">
          -
        </Button>
        <input
          className="bg-transparent-100  w-10 text-center"
          type="number"
          value={isMissing ? '' : numericValue}
          placeholder={numericValue.toLocaleString('fr-fr', {
            maximumFractionDigits: 0,
          })}
          onChange={(event) => setValue(Number(event.target.value))}
        />
        <Button
          onClick={() => setValue(numericValue + 1)}
          className="z-10 h-10 w-10">
          +
        </Button>
      </div>
    </div>
  )
}
