/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useEffect, useState } from 'react'
import { useLocalStore, useStore } from '../../state/store'
import { getPlayerFromPlayers, getPlayerRolledPositionAndPath, getPlayersFromGame, getTilesFromGame } from '../../state/state'
import GameStateManager from './components/GameStateManager/GameStateManager'
import { DUMMY_GAME } from '../../state/dummy'
import {
  updateCurrentRoundActivePlayer,
  updateCurrentRoundActivePlayerMoveCompleted,
  updateCurrentRoundActivePlayerRoll,
  updateCurrentRoundState,
  updatePlayerState
} from '../../state/update'
import { useIsActiveTurnCompleted } from '../../state/hooks'
import { GameRoundState } from '../../state/gameState'

export interface IGameStateHandlerContext {
  startRound: () => void
  setActivePlayer: (playerKey: string) => void
  rollPlayerDice: (playerKey: string, dice: number) => void
}

export const GameStateHandlerContext = React.createContext<IGameStateHandlerContext>({
  startRound: () => {},
  setActivePlayer: () => {},
  rollPlayerDice: () => {}
})

export const useGameStateHandlerContext = (): IGameStateHandlerContext => {
  return useContext(GameStateHandlerContext)
}

const GameStateHandler: React.FC = ({ children }) => {
  const [gameState, setGameState] = useState(DUMMY_GAME)
  const [updateCount, setUpdateCount] = useState(0)
  const activeTurnCompleted = useIsActiveTurnCompleted()
  const [previousActiveTurnCompleted, setPreviousActiveTurnCompleted] = useState(activeTurnCompleted)
  const setStoreData = useStore(state => state.setStoreData)
  const setActiveTurn = useLocalStore(state => state.setActiveTurn)

  useEffect(() => {
    console.log('setStoreData', gameState)
    setStoreData({
      players: gameState.players,
      rounds: gameState.rounds,
      tiles: gameState.tiles,
      state: gameState.state,
      currentRound: gameState.currentRound
    })
  }, [updateCount])

  const updateState = () => {
    setUpdateCount(prevState => prevState + 1)
  }

  useEffect(() => {
    if (activeTurnCompleted && !previousActiveTurnCompleted) {
      setGameState(prevState => {
        return updateCurrentRoundActivePlayerMoveCompleted(prevState)
      })
    }
    setPreviousActiveTurnCompleted(activeTurnCompleted)
    updateState()
  }, [activeTurnCompleted])

  const startRound = () => {
    setGameState(prevState => {
      return updateCurrentRoundState(prevState, GameRoundState.TURNS)
    })
    updateState()
  }

  const setActivePlayer = (playerKey: string) => {
    setGameState(prevState => {
      return updateCurrentRoundActivePlayer(prevState, playerKey)
    })
    updateState()
  }

  const setActiveTurnCompleted = (playerKey: string) => {}

  const rollPlayerDice = (playerKey: string, dice: number) => {
    const players = getPlayersFromGame(gameState)
    const tiles = getTilesFromGame(gameState)
    const player = getPlayerFromPlayers(playerKey, players)
    const { position, positionPath, pendingMoves } = getPlayerRolledPositionAndPath(player, tiles, dice)

    const updatedPlayer = {
      ...player,
      boardPosition: position,
      boardPositionPath: positionPath
    }

    console.log('rollPlayerDice', playerKey, dice, position, positionPath, pendingMoves, updatedPlayer)

    const nextTileKey = positionPath.length > 0 ? positionPath[0] : ''

    setActiveTurn(playerKey, true, nextTileKey)

    setGameState(prevState => {
      return updateCurrentRoundActivePlayerRoll(prevState, dice)
    })

    setGameState(prevState => {
      return updatePlayerState(prevState, updatedPlayer)
    })

    updateState()
  }

  return (
    <GameStateHandlerContext.Provider
      value={{
        startRound,
        setActivePlayer,
        rollPlayerDice
      }}
    >
      <GameStateManager />
      {children}
    </GameStateHandlerContext.Provider>
  )
}

export default GameStateHandler
