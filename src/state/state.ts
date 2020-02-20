import { GameState, IGamePlayer, IGamePlayers } from './gameState'
import { V3 } from '../utils/types'

export const getPlayersSortedByJoinedTimestamp = (players: IGamePlayers): IGamePlayer[] => {
  return Object.values(players).sort((playerA, playerB) => {
    return playerA.timestamps.joined - playerB.timestamps.joined
  })
}

export const getHubPlayerPosition = (playerKey: string, players: IGamePlayers): V3 => {
  const sortedPlayers = getPlayersSortedByJoinedTimestamp(players)
  const playerIndex = sortedPlayers.findIndex(player => {
    return player.key === playerKey
  })
  // todo - handle > 4 (wrap around to 8)
  const zOffset = playerIndex
  const xOffset = 1
  return [xOffset, 0, -(zOffset * 0.9 + 1.5)]
}

export const getPlayerFromPlayers = (playerKey: string, players: IGamePlayers): IGamePlayer => {
  const player = players[playerKey]
  if (!player) {
    throw new Error(`Player ${playerKey} not found in players`)
  }
  return player
}

export const getGamePlayersSortedByOrder = (players: IGamePlayers): IGamePlayer[] => {
  return Object.values(players).sort((playerA, playerB) => {
    return playerA.order - playerB.order
  })
}

export const getGamePlayerWaitingPosition = (player: IGamePlayer, players: IGamePlayers): V3 => {
  const waitingPlayers = getGamePlayersSortedByOrder(players).filter(filterPlayer => {
    return !filterPlayer.boardPosition
  })
  const waitingIndex = waitingPlayers.findIndex(findPlayer => {
    return player.key === findPlayer.key
  })
  const zPos = -1 - waitingIndex * 0.5
  return [0, 0, zPos]
}

export const getGamePlayerPosition = (playerKey: string, players: IGamePlayers): V3 => {
  const player = getPlayerFromPlayers(playerKey, players)
  if (!player.boardPosition) {
    return getGamePlayerWaitingPosition(player, players)
  }
  return [0, 0, 0]
}

export const isGameStateHubRelated = (state: GameState): boolean => {
  return state === GameState.PENDING || state === GameState.HUB
}
