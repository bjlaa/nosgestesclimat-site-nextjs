'use client'

import { Personas } from '@/publicodes-state/types'
import Persona from './Persona'

type Props = {
  personas: Personas
}

export default function PersonaList({ personas }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {Object.keys(personas).map((key) => (
        <Persona key={key} personaName={key} persona={personas[key]} />
      ))}
    </div>
  )
}