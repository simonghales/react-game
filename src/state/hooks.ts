import { useEffect, useState } from 'react'
import { useLocalStore, useStore } from './store'
import { V3 } from '../utils/types'
import { radians } from '../utils/angles'
import { GameRoundState, GameState, IGamePlayer, IGamePlayers, IGameRound, IGameTiles, PlayerMoveState } from './gameState'
import {
  getGamePlayerPosition,
  getHubPlayerPosition,
  getPlayerFromPlayers,
  getPlayerPositionSteps,
  getRoundActiveTurn,
  getRoundFromRounds,
  IPlayerPositionStep,
  isGameStateHubRelated,
  PlayerPositionKey,
  sortPlayersByOrder
} from './state'
import { useGameStateHandlerContext } from '../components/GameStateHandler/GameStateHandler'

export const useGameTiles = (): IGameTiles => {
  return useStore(state => state.tiles)
}

export const usePlayers = (): IGamePlayers => {
  return useStore(state => state.players)
}

export const useGameState = (): GameState => {
  return useStore(state => state.state)
}

export const useCurrentRound = (): IGameRound | null => {
  const [rounds, currentRound] = useStore(state => {
    return [state.rounds, state.currentRound]
  })
  return getRoundFromRounds(rounds, currentRound)
}

export const useActivePlayer = (): string => {
  const currentRound = useCurrentRound()
  if (!currentRound) return ''
  return currentRound.currentPlayerTurn
}

export const useActiveTurnState = (): PlayerMoveState | null => {
  const currentRound = useCurrentRound()
  if (!currentRound) return null
  if (!currentRound.currentPlayerTurn) return null
  const turn = currentRound.playerMoves[currentRound.currentPlayerTurn]
  if (!turn) return null
  return turn.state
}

export const useIsActivePlayer = (playerKey: string): boolean => {
  const activePlayer = useActivePlayer()
  return playerKey === activePlayer
}

export const usePlayerPosition = (playerKey: string): [V3, PlayerPositionKey] => {
  const players = usePlayers()
  const state = useGameState()
  const tiles = useGameTiles()
  if (state === GameState.HUB || state === GameState.PENDING) {
    return [getHubPlayerPosition(playerKey, players), PlayerPositionKey.HUB]
  }
  if (state === GameState.STARTING) {
    return [getGamePlayerPosition(playerKey, players, tiles), PlayerPositionKey.STARTING]
  }
  if (state === GameState.PLAYING) {
    return [getGamePlayerPosition(playerKey, players, tiles), PlayerPositionKey.PLAYING]
  }
  return [[0, 0, 0], PlayerPositionKey.DEFAULT]
}

export const usePlayer = (playerKey: string): IGamePlayer => {
  const players = usePlayers()
  return getPlayerFromPlayers(playerKey, players)
}

export const usePlayerRotation = (playerKey: string): V3 => {
  const state = useGameState()
  const player = usePlayer(playerKey)
  if (isGameStateHubRelated(state)) {
    return [0, radians(180), 0]
  }
  return [0, radians(-90), 0]
}

export const useCameraPosition = (): V3 => {
  const state = useGameState()
  if (isGameStateHubRelated(state)) {
    return [-4.5, 1, -2.5]
  }
  return [-6.5, 4.5, 1]
}

export const useCameraRotation = (): V3 => {
  const state = useGameState()
  if (isGameStateHubRelated(state)) {
    return [radians(4.5), radians(270), 0]
  }
  return [radians(-30), radians(270), radians(0)]
}
export const useGetPlayerPositionSteps = (playerKey: string) => {
  const player = usePlayer(playerKey)
  const tiles = useGameTiles()
  const getPlayerSteps = (
    currentPosition: V3,
    newPosition: V3,
    previousPositionKey: PlayerPositionKey | null,
    positionKey: PlayerPositionKey | null
  ): IPlayerPositionStep[] => {
    return getPlayerPositionSteps(player, tiles, currentPosition, newPosition, previousPositionKey, positionKey)
  }
  return getPlayerSteps
}

// export const useActiveTurnState = (): ActiveTurnState => {
//   return useLocalStore(state => state.activeTurn.state)
// }

export const useShowChatBubble = (): boolean => {
  const state = useGameState()
  return state === GameState.HUB || state === GameState.PENDING
}

export const useCurrentPendingTurnPlayer = (): string => {
  const activePlayer = useActivePlayer()
  const activeTurnState = useActiveTurnState()
  if (!activePlayer) return ''
  if (activeTurnState && activeTurnState === PlayerMoveState.PENDING) {
    return activePlayer
  }
  return ''
}

export const useUnsafePlayer = (playerKey: string | null): IGamePlayer | null => {
  const players = usePlayers()
  if (!playerKey) return null
  return getPlayerFromPlayers(playerKey, players)
}

export const usePlayersSortedByOrder = (): IGamePlayer[] => {
  const players = usePlayers()
  return sortPlayersByOrder(Object.values(players))
}

export const useNextPlayer = (): string | null => {
  const activePlayer = useActivePlayer()
  const playersOrder = usePlayersSortedByOrder()
  const playerIndex = playersOrder.findIndex(player => {
    return player.key === activePlayer
  })
  if (playersOrder[playerIndex + 1]) {
    return playersOrder[playerIndex + 1].key
  }
  return null
}

export const useHandleBeginRoundMiniGame = () => {
  const setActiveTurn = useLocalStore(state => state.setActiveTurn)

  const handle = () => {
    setActiveTurn('', false)
  }

  return handle
}

export const useHandleTurnCompleted = () => {
  const { setActivePlayer } = useGameStateHandlerContext()
  const [previousActiveTurnState, setPreviousActiveTurnState] = useState<PlayerMoveState | null>(null)
  const activeTurnState = useActiveTurnState()
  const gameState = useGameState()
  const nextPlayer = useNextPlayer()
  const handleBeginRoundMiniGame = useHandleBeginRoundMiniGame()

  const onTurnCompleted = () => {
    console.log('turn completed, next player', nextPlayer)
    if (nextPlayer) {
      // set nextPlayer
      setActivePlayer(nextPlayer)
    } else {
      // handle round mini-game start
      console.log('handle round mini-game start')
    }
  }

  useEffect(() => {
    console.log('activeTurnState changed to', activeTurnState)
    console.log('previousActiveTurnState', previousActiveTurnState)
    if (
      activeTurnState === PlayerMoveState.COMPLETED &&
      previousActiveTurnState !== PlayerMoveState.COMPLETED &&
      gameState === GameState.PLAYING
    ) {
      console.log('turn was just completed, proceed to next game step...')
      setTimeout(() => {
        onTurnCompleted()
      }, 500)
    }
    setPreviousActiveTurnState(activeTurnState)
  }, [activeTurnState])
}

export const useGameRoundInProgress = (): boolean => {
  const gameState = useGameState()
  // todo - add logic
  return gameState === GameState.PLAYING
}

export const useLocalActiveTurn = () => {
  return useLocalStore(state => state.activeTurn)
}

export const useActiveTurnDiceRoll = (): number | null => {
  const currentRound = useCurrentRound()
  if (!currentRound) return null
  const activeTurn = getRoundActiveTurn(currentRound)
  if (!activeTurn) return null
  return activeTurn.diceRoll
}

export const useIsActiveTurnCompleted = (): boolean => {
  const activeTurn = useLocalStore(state => state.activeTurn)
  return activeTurn ? activeTurn.completed : false
}

export const useCurrentRoundState = (): GameRoundState | null => {
  const round = useCurrentRound()
  if (!round) return null
  return round.state
}

export const useHandleRoundStateChanges = () => {
  const { setActivePlayer } = useGameStateHandlerContext()
  const players = usePlayersSortedByOrder()
  const roundState = useCurrentRoundState()
  const [previousRoundState, setPreviousRoundState] = useState(roundState)

  useEffect(() => {
    console.log('round state changed', roundState)
    if (roundState === GameRoundState.TURNS && previousRoundState === GameRoundState.PENDING) {
      if (players.length === 0) {
        throw new Error(`No players...`)
      }
      setActivePlayer(players[0].key)
    } else if (roundState === GameRoundState.MINIGAME && previousRoundState === GameRoundState.TURNS) {
      // todo
    }
    setPreviousRoundState(roundState)
  }, [roundState])
}
