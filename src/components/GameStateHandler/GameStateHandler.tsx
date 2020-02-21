/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext } from 'react'
import { useStore } from '../../state/store'
import { getPlayerFromPlayers, getPlayerRolledPositionAndPath } from '../../state/state'
import { useGameTiles, usePlayers } from '../../state/hooks'

export interface IGameStateHandlerContext {
  rollPlayerDice: (playerKey: string, dice: number) => void
}

export const GameStateHandlerContext = React.createContext<IGameStateHandlerContext>({
  rollPlayerDice: () => {}
})

export const useGameStateHandlerContext = (): IGameStateHandlerContext => {
  return useContext(GameStateHandlerContext)
}

const GameStateHandler: React.FC = ({ children }) => {
  const tiles = useGameTiles()
  const players = usePlayers()
  const setPlayerState = useStore(state => state.setPlayerState)
  const setActivePlayer = useStore(state => state.setActivePlayer)

  const rollPlayerDice = (playerKey: string, dice: number) => {
    const player = getPlayerFromPlayers(playerKey, players)
    const { position, positionPath, pendingMoves } = getPlayerRolledPositionAndPath(player, tiles, dice)

    const updatedPlayer = {
      ...player,
      boardPosition: position,
      boardPositionPath: positionPath
    }

    console.log('rollPlayerDice', playerKey, dice, position, positionPath, pendingMoves, updatedPlayer)

    setActivePlayer(playerKey)
    setPlayerState(updatedPlayer)

    /*
      
      calculate new tile position
      calculate path to new tile position
      store results 
      
       */
    // setPlayerState
  }

  return (
    <GameStateHandlerContext.Provider
      value={{
        rollPlayerDice
      }}
    >
      {children}
    </GameStateHandlerContext.Provider>
  )
}

export default GameStateHandler
