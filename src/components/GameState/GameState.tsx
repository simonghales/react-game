import React, { useContext, useEffect, useState } from 'react'
import { GAME_PLAYERS, GamePlayersMdl } from '../../data/game'
import { getPlayerFromPlayers } from '../../data/player'

export interface IGameState {
  players: GamePlayersMdl
}

export const GameStateContext = React.createContext<IGameState>({
  players: {}
})

export const useGameState = (): IGameState => {
  return useContext(GameStateContext)
}

const GameState: React.FC = ({ children }) => {
  const [players, setPlayers] = useState(GAME_PLAYERS)

  useEffect(() => {
    setInterval(() => {
      setPlayers(updatedPlayers => {
        const playerToUpdate = getPlayerFromPlayers('00', updatedPlayers)
        const newPosition = playerToUpdate.position ? '' : '02'
        const updatedPlayer = {
          ...playerToUpdate,
          position: newPosition
        }
        console.log('updatedPlayer', updatedPlayer)
        return {
          ...updatedPlayers,
          [updatedPlayer.key]: updatedPlayer
        }
      })
    }, 4000)
  }, [])

  return (
    <GameStateContext.Provider
      value={{
        players
      }}
    >
      {children}
    </GameStateContext.Provider>
  )
}

export default GameState
