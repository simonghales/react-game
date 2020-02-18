import { IGamePlayer, IGamePlayers } from './gameState'
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
