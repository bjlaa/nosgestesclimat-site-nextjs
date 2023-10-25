'use client'

import Trans from '@/components/translation/Trans'
import { useUser } from '@/publicodes-state'
import { capitaliseString } from '@/utils/capitaliseString'

export default function PersonaWarning() {
  const { getCurrentSimulation } = useUser()

  const persona = getCurrentSimulation()?.persona

  if (!persona) return null
  return (
    <p>
      <Trans>👤 Vous utilisez actuellement le persona</Trans>{' '}
      <span className="font-bold">
        {capitaliseString(persona.split(' . ')[1])}
      </span>
    </p>
  )
}
