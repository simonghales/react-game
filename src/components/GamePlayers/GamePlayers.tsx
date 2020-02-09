import React from 'react'
import GamePlayer from '../GamePlayer/GamePlayer'
import { usePlayers } from '../../hooks/player'

const GamePlayers: React.FC = () => {
  const players = usePlayers()
  const playersArray = Object.entries(players)
  console.log('playersArray', playersArray)
  return (
    <>
      {playersArray.map(([key, player]) => {
        return <GamePlayer player={player} key={key} />
      })}
    </>
  )
}

export default GamePlayers
