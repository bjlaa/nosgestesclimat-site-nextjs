import PencilIcon from '@/components/icons/PencilIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import Button from '@/design-system/inputs/Button'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  label: string
  value: boolean
  onChange: (value: boolean) => void
  name: string
  className?: string
  isCustomQuestion?: boolean
  onEdit?: () => void
  onDelete?: (question: string) => Promise<void>
}

export default function ToggleField({
  label,
  value,
  onChange,
  onEdit,
  onDelete,
  name,
  className,
  isCustomQuestion = false,
}: Props) {
  const [isEnabled, setIsEnabled] = useState<boolean>(value)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isPreventingDoubleClick, setIsPreventingDoubleClick] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleMouseEvent = () => {
    setIsEnabled((prev) => !prev)
    onChange(!isEnabled)
  }

  const handleKeyboardEvent = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleMouseEvent()
    }
  }

  async function handleDelete() {
    if (onDelete) {
      await onDelete(label)
    }
  }

  function triggerDisplayConfirmDeleteButton() {
    setIsPreventingDoubleClick(true)

    timeoutRef.current = setTimeout(() => {
      setIsConfirmingDelete(true)
      setIsPreventingDoubleClick(false)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className={twMerge(
        'relative flex w-full flex-col items-center overflow-hidden rounded-xl border-2 border-gray-200 p-4 transition-colors',
        `${isEnabled ? 'border-primary-300 bg-primary-100' : ''} ${className}`
      )}>
      <div className="flex w-full items-center justify-between">
        <p className="mb-0 cursor-default">{label}</p>

        <div className="relative inline-flex cursor-pointer items-center justify-between">
          <input
            id={name}
            type="checkbox"
            className="peer sr-only"
            checked={isEnabled}
            readOnly
          />

          <div className="flex items-center gap-2">
            {isCustomQuestion && (
              <div className="flex items-center gap-2">
                <Button
                  size="xs"
                  color="text"
                  className="h-7 w-7 p-0"
                  onClick={onEdit}>
                  <PencilIcon width="16" />
                </Button>

                {isConfirmingDelete ? (
                  <Button
                    size="xs"
                    color="secondary"
                    className="h-7"
                    onClick={handleDelete}
                    onBlur={() => setIsConfirmingDelete(false)}>
                    Supprimer
                  </Button>
                ) : (
                  <Button
                    size="xs"
                    color="text"
                    className="h-7 w-7 p-0"
                    aria-disabled={isPreventingDoubleClick}
                    onClick={
                      !isPreventingDoubleClick
                        ? triggerDisplayConfirmDeleteButton
                        : () => {}
                    }>
                    <TrashIcon width="16" />
                  </Button>
                )}
              </div>
            )}
            <div className="relative">
              <div
                tabIndex={0}
                role="checkbox"
                aria-checked="false"
                aria-labelledby="toggleLabel"
                aria-describedby="toggleDescription"
                onKeyDown={handleKeyboardEvent}
                onClick={handleMouseEvent}
                className={twMerge(
                  "peer h-6 w-11 rounded-full bg-primary-200  after:absolute  after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-focus:ring-primary-300",
                  `${isEnabled ? 'bg-primary-700 after:translate-x-full after:border-white' : ''}`
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
