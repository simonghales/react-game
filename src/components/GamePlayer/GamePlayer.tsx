import React, { useEffect, useRef, useState } from 'react'
import { a, useSpring } from 'react-spring/three'
import { easeQuadInOut } from 'd3-ease'
import { IGamePlayer } from '../../state/gameState'
import Character from '../Character/Character'
import { usePlayerPosition, usePlayerRotation } from '../../state/hooks'
import { useMiscStore } from '../../state/store'
import ChatBubble from '../ChatBubble/ChatBubble'

interface Props {
  player: IGamePlayer
}

const ease = easeQuadInOut

const GamePlayer: React.FC<Props> = ({ player }) => {
  const playerRef = useRef()
  const position = usePlayerPosition(player.key)
  const [positionAnimating, setPositionAnimating] = useState(false)

  const onStart = () => {
    setPositionAnimating(true)
  }

  const onRest = () => {
    setPositionAnimating(false)
  }

  const [movementSpring, setMovementSpring] = useSpring(() => ({
    position,
    config: { duration: 500, easing: ease },
    onStart,
    onRest
  }))

  const rotation = usePlayerRotation(player.key)
  const setPlayerRef = useMiscStore(state => state.setPlayerRef)

  useEffect(() => {
    setPlayerRef(player.key, playerRef)
    return () => {
      setPlayerRef(player.key, null)
    }
  }, [playerRef])

  useEffect(() => {
    // position updated - animate towards it?
    setMovementSpring({
      to: {
        position
      }
    })
  }, [...position])
  return (
    <a.group ref={playerRef} position={movementSpring.position}>
      <a.group rotation={rotation}>
        <Character type={player.characterType} walking={positionAnimating} />
      </a.group>
      <ChatBubble characterType={player.characterType} />
    </a.group>
  )
}

export default GamePlayer
