import React from 'react'
import { GamePlayerMdl } from '../../data/game'
import Character from '../Character/Character'
import { usePlayerPosition } from '../../hooks/player'

interface Props {
  player: GamePlayerMdl
}

const GamePlayer: React.FC<Props> = ({ player }) => {
  const position = usePlayerPosition(player.key)
  return <Character type={player.character} position={position} />
}

export default GamePlayer
