import React, { useEffect, useState, Suspense } from 'react'
import { a, useSpring } from 'react-spring/three'
import { easeQuadInOut } from 'd3-ease'
import { GameCharacterType } from '../../state/gameState'
import ChatBubbleShape from './components/ChatBubbleShape/ChatBubbleShape'

const defaultOffset = 1

const CHARACTER_OFFSETS: {
  [key: string]: number
} = {
  [GameCharacterType.PEACH]: defaultOffset - 0.1,
  [GameCharacterType.BANANA]: defaultOffset + 0.07,
  [GameCharacterType.DONUT]: defaultOffset + 0.03
}

const getYOffset = (characterType: GameCharacterType): number => {
  if (Object.keys(CHARACTER_OFFSETS).includes(characterType)) {
    return CHARACTER_OFFSETS[characterType]
  }
  return defaultOffset
}

interface Props {
  characterType: GameCharacterType
}

const movementOffset = 0.015

const ease = easeQuadInOut

const springConfig = { duration: 2000, easing: ease }

const ChatBubble: React.FC<Props> = ({ characterType }) => {
  const [inverseDirection, setInverseDirection] = useState(false)
  const yOffset = getYOffset(characterType)

  const [props, set] = useSpring(() => ({
    from: {
      position: [0, yOffset, 0]
    },
    to: {
      position: [0, yOffset + movementOffset, 0]
    },
    config: springConfig,
    onRest: () => {
      setInverseDirection(prevState => {
        return !prevState
      })
    }
  }))

  useEffect(() => {
    const offset = inverseDirection ? 0 - movementOffset : movementOffset
    set({
      to: {
        position: [0, yOffset + offset, 0]
      },
      config: springConfig
    })
  }, [inverseDirection])

  const { position } = props

  return (
    <a.group position={position}>
      <Suspense fallback={null}>
        <ChatBubbleShape />
      </Suspense>
    </a.group>
  )
}

export default ChatBubble
