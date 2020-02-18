import React from 'react'
import { useStore } from '../../state/store'
import GamePlayer from '../GamePlayer/GamePlayer'

const GamePlayers: React.FC = () => {
  const players = useStore(state => state.players)
  return (
    <>
      {Object.entries(players).map(([key, player]) => {
        return <GamePlayer key={key} player={player} />
      })}
    </>
  )
}

export default GamePlayers
