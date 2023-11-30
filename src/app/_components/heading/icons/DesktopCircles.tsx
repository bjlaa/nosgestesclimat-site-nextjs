'use client'

import { useEffect, useState } from 'react'
import DesktopIcon from './desktopCircles/DesktopIcon'

type Props = {
  circles: {
    iconIndex: number
    x: number
    y: number
    rotation: number
    delay: number
  }[][]
}

export default function DesktopCircles({ circles }: Props) {
  const [firstSelected, setFirstSelected] = useState<any | null>(null)
  const [secondSelected, setSecondSelected] = useState<any | null>(null)

  const [validatedIcons, setValidatedIcons] = useState<any[]>([])

  const [isWrong, setIsWrong] = useState(false)

  useEffect(() => {
    setFirstSelected(null)
    setSecondSelected(null)
  }, [circles])

  useEffect(() => {
    let timer: any = null
    if (firstSelected && secondSelected) {
      if (firstSelected.iconIndex === secondSelected.iconIndex) {
        setValidatedIcons((prevValidatedIcons) => [
          ...prevValidatedIcons,
          firstSelected,
          secondSelected,
        ])
      } else {
        setIsWrong(true)
      }
      timer = setTimeout(() => {
        setFirstSelected(null)
        setSecondSelected(null)
        setIsWrong(false)
      }, 1000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [firstSelected, secondSelected])

  return (
    <div
      className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      aria-hidden={true}>
      {circles.map((circle) =>
        circle.map(({ iconIndex, x, y, rotation, delay }) => (
          <DesktopIcon
            onClick={() => {
              if (!firstSelected) {
                setFirstSelected({ iconIndex, x, y })
                return
              }
              if (isMatch({ iconIndex, x, y }, firstSelected)) {
                return
              }
              if (!secondSelected) {
                setSecondSelected({ iconIndex, x, y })
                return
              }
            }}
            key={String(x) + String(y)}
            iconIndex={iconIndex}
            x={x}
            y={y}
            rotation={rotation}
            delay={delay}
            scale={1}
            isSelected={
              isMatch({ iconIndex, x, y }, firstSelected) ||
              isMatch({ iconIndex, x, y }, secondSelected)
            }
            isValidated={validatedIcons.some((validatedIcon) =>
              isMatch({ iconIndex, x, y }, validatedIcon)
            )}
            isWrong={isWrong}
          />
        ))
      )}
    </div>
  )
}

const isMatch = (icon1: any, icon2: any) =>
  JSON.stringify(icon1) === JSON.stringify(icon2)
