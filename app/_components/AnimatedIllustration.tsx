import { ForwardedRef, useEffect, useRef, useState } from 'react'
import IllustrationSVG from './IllustrationSVG'

const windowAnimationDuration = '60s'

export default function AnimatedIllustration({ small }: { small?: boolean }) {
	const [isCycling, setIsCycling] = useState(false)
	const svgRef = useRef<SVGElement & { onclick: () => void }>()

	useEffect(() => {
		if (!svgRef.current) return

		svgRef.current.onclick = () => setIsCycling(true)
	}, [svgRef])

	return (
		<div
			aria-hidden="true"
			className={`landing-animated-illustration ${
				isCycling ? 'landing-animated-illustration--cycling' : ''
			} ${small}`}
		>
			<IllustrationSVG ref={svgRef as ForwardedRef<SVGElement | null>} />
		</div>
	)
}
