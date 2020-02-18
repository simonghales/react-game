import React, { useEffect, useRef } from 'react'
import { a, useSpring } from 'react-spring/three'
import { IGamePlayer } from '../../state/gameState'
import Character from '../Character/Character'
import { usePlayerPosition, usePlayerRotation } from '../../state/hooks'
import { useMiscStore } from '../../state/store'
import ChatBubble from '../ChatBubble/ChatBubble'

interface Props {
  player: IGamePlayer
}

const GamePlayer: React.FC<Props> = ({ player }) => {
  const playerRef = useRef()
  const position = usePlayerPosition(player.key)
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
  }, [...position])
  return (
    <a.group ref={playerRef} position={position} rotation={rotation}>
      <Character type={player.characterType} walking={false} />
      <ChatBubble characterType={player.characterType} />
    </a.group>
  )
}

export default GamePlayer
