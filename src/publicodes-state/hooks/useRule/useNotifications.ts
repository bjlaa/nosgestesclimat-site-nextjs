'use client'

import { useMemo } from 'react'
import { NGCEvaluatedNode, RuleName, Situation } from '../types'

type Props = {
  dottedName: RuleName
  everyNotifications: string[]
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  situation: Situation
}

export default function useNotifications({
  dottedName,
  everyNotifications,
  safeEvaluate,
  situation,
}: Props) {
  const notifications = useMemo<string[]>(
    () =>
      everyNotifications.filter(
        (notification) => {
          const splitNotification = notification.split(' . ')
          // If notification dottedName has only two names (itself and its category), it should apply to the whole category.
          if (splitNotification.length <= 2) {
            return splitNotification[0] === dottedName.split(' . ')[0]
          }
          // If not, it should apply to the subcategory
          return splitNotification[1] === dottedName.split(' . ')[1]
        },
        [dottedName, everyNotifications]
      ),
    [dottedName, everyNotifications]
  )

  const activeNotifications = useMemo<string[]>(
    () =>
      notifications.filter(
        (notification) => safeEvaluate(notification)?.nodeValue
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [notifications, safeEvaluate, situation]
  )

  return { notifications, activeNotifications }
}
