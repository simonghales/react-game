import { useStore } from './store'
import { V3 } from '../utils/types'
import { radians } from '../utils/angles'
import { GameState, IGamePlayer, IGamePlayers, IGameTiles } from './gameState'
import {
  getGamePlayerPosition,
  getHubPlayerPosition,
  getPlayerFromPlayers,
  getPlayerPositionSteps,
  IPlayerPositionStep,
  isGameStateHubRelated
} from './state'

export const useGameTiles = (): IGameTiles => {
  return useStore(state => state.tiles)
}

export const usePlayers = (): IGamePlayers => {
  return useStore(state => state.players)
}

export const useGameState = (): GameState => {
  return useStore(state => state.state)
}

export enum PlayerPositionKey {
  HUB = 'HUB',
  STARTING = 'STARTING',
  PLAYING = 'PLAYING',
  DEFAULT = 'DEFAULT'
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
