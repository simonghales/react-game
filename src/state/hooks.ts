import { IStore, useStore } from './store'
import { V3 } from '../utils/types'
import { radians } from '../utils/angles'
import { GameState, IGamePlayer, IGamePlayers } from './gameState'
import { getGamePlayerPosition, getHubPlayerPosition, getPlayerFromPlayers, isGameStateHubRelated } from './state'

export const usePlayers = (): IGamePlayers => {
  return useStore(state => state.players)
}

export const useGameState = (): GameState => {
  return useStore(state => state.state)
}

export const usePlayerPosition = (playerKey: string): V3 => {
  const players = usePlayers()
  const state = useGameState()
  if (state === GameState.HUB || state === GameState.PENDING) {
    return getHubPlayerPosition(playerKey, players)
  }
  if (state === GameState.STARTING || state === GameState.PLAYING) {
    return getGamePlayerPosition(playerKey, players)
  }
  return [0, 0, 0]
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
