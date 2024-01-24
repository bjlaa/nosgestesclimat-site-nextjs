'use client'

import { PropsWithChildren } from 'react'

import UserContext from './context'
import usePersistentSimulations from './usePersistentSimulations'
import usePersistentTutorials from './usePersistentTutorials'
import usePersistentUser from './usePersistentUser'
import useUpdateOldLocalStorage from './useUpdateOldLocalStorage'
import { migrationType } from '@/publicodes-state/types'

type Props = {
  /**
   * The localstorage key in use
   */
  storageKey?: string
  /**
   * The inital region of the user
   */
  initialRegion: { code: string; name: string }
  /**
   * The migration instructions for old localstorage
   */
  migrationInstructions: migrationType
}
export default function UserProvider({
  children,
  storageKey = 'ngc',
  initialRegion,
  migrationInstructions,
}: PropsWithChildren<Props>) {
  useUpdateOldLocalStorage({ storageKey, migrationInstructions })

  const { user, setUser } = usePersistentUser({ storageKey, initialRegion })

  const { tutorials, setTutorials } = usePersistentTutorials({ storageKey })

  const {
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
    groupToRedirectToAfterTest,
    setGroupToRedirectToAfterTest,
  } = usePersistentSimulations({ storageKey })

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        tutorials,
        setTutorials,
        simulations,
        setSimulations,
        currentSimulationId,
        setCurrentSimulationId,
        groupToRedirectToAfterTest,
        setGroupToRedirectToAfterTest,
      }}>
      {children}
    </UserContext.Provider>
  )
}
