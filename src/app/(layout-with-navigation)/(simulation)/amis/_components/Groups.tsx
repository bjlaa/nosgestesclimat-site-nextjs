'use client'

import { useUser } from '@/publicodes-state'
import { useFetchGroups } from '../_hooks/useFetchGroups'
import CreateFirstGroupSection from './CreateFirstGroupSection'
import CreateOtherGroupsSection from './CreateOtherGroupsSection'
import ServerErrorSection from './ServerErrorSection'

export default function Groups() {
  const { getCurrentSimulation, user } = useUser()

  const currentSimulation = getCurrentSimulation()

  const { data: groups, isFetched } = useFetchGroups({
    userId: user?.id,
    email: user?.email,
  })

  return (
    <>
      {isFetched && !groups && <ServerErrorSection />}

      {groups && groups?.length === 0 && <CreateFirstGroupSection />}

      {currentSimulation && groups && groups?.length > 0 && (
        <CreateOtherGroupsSection groups={groups} />
      )}
    </>
  )
}
