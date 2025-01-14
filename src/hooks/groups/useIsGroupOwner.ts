import { useUser } from '@/publicodes-state'
import type { Group } from '@/types/groups'

type Props = {
  group: Group
}
export function useIsGroupOwner({ group }: Props) {
  const { user } = useUser()

  const isGroupOwner = group.administrator.id === user.userId

  return { isGroupOwner }
}
