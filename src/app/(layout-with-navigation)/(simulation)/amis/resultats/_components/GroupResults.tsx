'use client'

import HowToAct from '@/components/actions/HowToAct'
import Separator from '@/design-system/layout/Separator'
import { useUser } from '@/publicodes-state'
import { Group, Results } from '@/types/groups'
import { UseQueryResult } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useFetchGroup } from '../../_hooks/useFetchGroup'
import { useGetGroupStats } from '../_hooks/useGetGroupStats'
import { useUpdateUserResults } from '../_hooks/useUpdateUserResults'
import Classement from './groupResults/Classement'
import InviteBlock from './groupResults/InviteBlock'
import OwnerAdminSection from './groupResults/OwnerAdminSection'
import ParticipantAdminSection from './groupResults/ParticipantAdminSection'
import PointsFortsFaibles from './groupResults/PointsFortsFaibles'
import VotreEmpreinte from './groupResults/VotreEmpreinte'

export default function GroupResults({ groupId }: { groupId: string }) {
  const [isSynced, setIsSynced] = useState(false)

  const router = useRouter()

  const {
    data: group,
    refetch,
    isLoading,
  }: UseQueryResult<Group> = useFetchGroup(groupId)

  const { user, setGroupToRedirectToAfterTest } = useUser()

  const userId = user?.id

  const isOwner = group?.owner?.userId === userId

  const intervalRef = useRef<NodeJS.Timeout>()

  const results: Results | null = useGetGroupStats({
    groupMembers: group?.members,
    userId: userId || '',
    isSynced,
  })

  useUpdateUserResults({
    setIsSynced,
    groupId,
  })

  useEffect(() => {
    setGroupToRedirectToAfterTest(undefined)
  }, [setGroupToRedirectToAfterTest])

  useEffect(() => {
    if (groupId && !group) {
      intervalRef.current = setInterval(() => refetch(), 60000)
    }
  }, [groupId, group, userId, refetch])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Group is not found
  if (!group && !isLoading) {
    router.push('/amis')
    return null
  }

  // User is not part of the group
  if (
    group &&
    !isLoading &&
    !group?.members?.some(
      (member: { userId: string }) => member.userId === userId
    )
  ) {
    router.push(`/amis/invitation?groupId=${group?._id}`)

    return null
  }

  // Group is loading
  if (!group) {
    return null
  }

  return (
    <>
      <Classement group={group} />

      <InviteBlock group={group} />

      {group?.members?.length > 1 ? (
        <>
          <Separator className="my-8" />

          <PointsFortsFaibles
            pointsFaibles={results?.pointsFaibles}
            pointsForts={results?.pointsForts}
          />

          <Separator className="mb-6 mt-10" />
        </>
      ) : (
        <Separator className="mb-6 mt-8" />
      )}

      <VotreEmpreinte
        categoriesFootprints={
          results?.userFootprintByCategoriesAndSubcategories
        }
        membersLength={group?.members?.length}
      />

      <Separator className="my-6" />

      <HowToAct />

      <Separator className="my-6" />

      {isOwner && <OwnerAdminSection group={group} />}

      {!isOwner && <ParticipantAdminSection group={group} />}
    </>
  )
}
