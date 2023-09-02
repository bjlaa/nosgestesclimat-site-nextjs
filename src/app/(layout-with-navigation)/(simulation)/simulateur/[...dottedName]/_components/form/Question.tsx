import { useRule } from '@/publicodes-state'
import BooleanInput from './question/BooleanInput'
import ChoicesInput from './question/ChoicesInput'
import Label from './question/Label'
import Mosaic from './question/Mosaic'
import NumberInput from './question/NumberInput'
import Suggestions from './question/Suggestions'
import Assistance from './question/Assistance'

type Props = {
  question: string
}
  
export default function Question({ question }: Props) {
  const { type, assistance } = useRule(question)
  console.log(assistance)
  return (
    <div className="mb-4">
      <Label question={question} />
      <Suggestions question={question} />
      {type === 'number' && <NumberInput question={question} />}
      {type === 'boolean' && <BooleanInput question={question} />}
      {type === 'choices' && <ChoicesInput question={question} />}
      {type === 'mosaic' && <Mosaic question={question} />}
      {assistance ? <Assistance question={question} assistance={assistance} /> : null}
    </div>
  )
}
