'use client'

import silhouette from '@/assets/images/silhouettes.svg'
import TransClient from '@/components/translation/TransClient'
import { matomoEventModeGroupeCTAStart } from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Image from 'next/image'

export default function GroupsLink() {
	return (
		<ButtonLink
			href="/groupe"
			className="ui__ button cta"
			onClick={() => {
				trackEvent(matomoEventModeGroupeCTAStart)
			}}
			data-cypress-id="as-a-group-link"
			size="xl"
			color="secondary"
		>
			<Image src={silhouette} alt="" className="w-8 h-auto mr-4" />
			<span>
				<TransClient>En groupe</TransClient>
			</span>
		</ButtonLink>
	)
}
