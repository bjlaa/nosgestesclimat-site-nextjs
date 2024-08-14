import SaveIcon from '@/components/icons/SaveIcon'
import ShareIcon from '@/components/icons/ShareIcon'
import { endClickSaveShortcut } from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import { useEndPageSharedUrl } from '@/hooks/useEndPageSharedUrl'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { twMerge } from 'tailwind-merge'
import ListIcon from '../icons/ListIcon'

const sizeClassNames = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
}
const saveClassNames = {
  sm: 'h-6 w-6',
  md: 'h-7 w-7',
}
const shareClassNames = {
  sm: 'h-[22px] w-[22px]',
  md: 'h-[26px] w-[26px]',
}

type Props = {
  size?: 'sm' | 'md'
  buttons?: ('share' | 'save' | 'summary')[]
  toggleQuestionList?: () => void
}
export default function HeadingButtons({
  size = 'md',
  buttons = ['share', 'save'],
  toggleQuestionList = () => {},
}: Props) {
  const { sharedUrl } = useEndPageSharedUrl()

  const handleShare = async () => {
    if (navigator?.share) {
      await navigator
        .share({
          text: sharedUrl,
          url: sharedUrl,
          title: 'Découvre mon empreinte carbone !',
        })
        .catch((e) => console.log(e))
    } else {
      handleScroll('share-block')
    }
  }

  const handleScroll = (id: string) => {
    const emailBlock = document.getElementById(id)
    emailBlock?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="flex gap-4">
      {buttons.includes('summary') && (
        <Button
          color="secondary"
          className={twMerge('p-0', sizeClassNames[size])}
          onClick={toggleQuestionList}>
          <ListIcon
            className={twMerge('fill-primary-700', saveClassNames[size])}
          />
        </Button>
      )}
      {buttons.includes('save') && (
        <Button
          color="secondary"
          className={twMerge('p-0', sizeClassNames[size])}
          onClick={() => {
            trackEvent(endClickSaveShortcut)
            handleScroll('email-block')
          }}>
          <SaveIcon
            className={twMerge('fill-primary-700', saveClassNames[size])}
          />
        </Button>
      )}
      {buttons.includes('share') && (
        <Button
          className={twMerge('p-0', sizeClassNames[size])}
          onClick={handleShare}>
          <ShareIcon
            className={twMerge('mr-[1px] fill-white', shareClassNames[size])}
          />
        </Button>
      )}
    </div>
  )
}