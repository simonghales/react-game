import { IStore, useStore } from './store'
import { V3 } from '../utils/types'
import { radians } from '../utils/angles'
import { GameState, IGamePlayers } from './gameState'
import { getHubPlayerPosition } from './state'

export const usePlayers = (): IGamePlayers => {
  return useStore(state => state.players)
}

export const useGameState = (): GameState => {
  return useStore(state => state.state)
}

export const usePlayerPosition = (playerKey: string): V3 => {
  const players = usePlayers()
  const state = useGameState()
  if (state === GameState.HUB) {
    return getHubPlayerPosition(playerKey, players)
  }
  return [0, 0, 0]
}

export const usePlayerRotation = (playerKey: string): V3 => {
  const store: IStore = useStore()
  return [0, radians(180), 0]
}
