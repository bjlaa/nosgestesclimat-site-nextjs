import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useTrain({ answers, isPristine }: HookProps) {
  const { setValue: setTrainKmValue } = useRule('transport . train . km')

  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.train) {
      setTrainKmValue(0)
    }
  }, [answers, isPristine, setTrainKmValue])
}