'use client'

import { Group } from '@/types/groups'
import { Dispatch, SetStateAction, createContext } from 'react'
import { v4 as uuid } from 'uuid'
import { Simulation, Tutorials, User } from '../types'

type UserContextType = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
  tutorials: Tutorials
  setTutorials: Dispatch<SetStateAction<Tutorials>>
  simulations: Simulation[]
  setSimulations: Dispatch<SetStateAction<Simulation[]>>
  currentSimulationId: string
  setCurrentSimulationId: Dispatch<SetStateAction<string>>
  groupToRedirectToAfterTest?: Group
  setGroupToRedirectToAfterTest: Dispatch<SetStateAction<Group | undefined>>
}

export default createContext<UserContextType>({
  user: {
    region: {
      code: '',
      name: '',
    },
    initialRegion: {
      code: '',
      name: '',
    },
    name: '',
    email: '',
    id: uuid(),
    hasSavedSimulation: false,
  },
  setUser: () => {},
  tutorials: {},
  setTutorials: () => {},
  simulations: [],
  setSimulations: () => {},
  currentSimulationId: '',
  setCurrentSimulationId: () => {},
  groupToRedirectToAfterTest: undefined,
  setGroupToRedirectToAfterTest: () => {},
})
