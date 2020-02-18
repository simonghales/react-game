// this file is causing bugs for some reason...

import React from 'react'
import { useSpring } from 'react-spring'
import { GamePlayerMdl } from '../../../data/game'
import Character from '../Character/Character'
import { usePlayerPosition } from '../../../hooks/player'

interface Props {
  player: GamePlayerMdl
}

const GamePlayer: React.FC<Props> = ({ player }) => {
  // const position = usePlayerPosition(player.key)
  const position = [0, 0, 0]
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })
  // console.log('position', position)
  // console.log('props', props)
  return null
  // return <Character type={player.character} position={position} />
}

export default GamePlayer
