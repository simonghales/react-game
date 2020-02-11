import { V3 } from '../utils/types'
import { GAME_PLAYERS, GAME_TILES, GamePlayerMdl, GamePlayersMdl, GameTileMdl, GameTilesMdl } from '../data/game'
import { useGameState } from '../components/GameState/GameState'
import { getPlayerFromPlayers } from '../data/player'

export const usePlayers = (): GamePlayersMdl => {
  const state = useGameState()
  return state.players
}

export const usePlayer = (playerKey: string): GamePlayerMdl => {
  const players = usePlayers()
  return getPlayerFromPlayers(playerKey, players)
}

export const sortPlayersByOrder = (playerA: GamePlayerMdl, playerB: GamePlayerMdl) => {
  return playerA.order - playerB.order
}

export const getWaitingPlayers = (players: GamePlayersMdl): GamePlayerMdl[] => {
  return Object.values(players)
    .filter(player => {
      return !player.position
    })
    .sort(sortPlayersByOrder)
}

export const getWaitingPosition = (player: GamePlayerMdl, players: GamePlayersMdl): V3 => {
  const waitingPlayers = getWaitingPlayers(players)
  const waitingIndex = waitingPlayers.findIndex(findPlayer => {
    return findPlayer.key === player.key
  })
  const x = -1 - waitingIndex * 0.8
  return [x, 0, 0]
}

export const useTiles = () => {
  return GAME_TILES
}

export const getTile = (tileKey: string, tiles: GameTilesMdl): GameTileMdl => {
  const tile = tiles[tileKey]
  if (!tile) {
    throw new Error(`Tile ${tileKey} not found within tiles`)
  }
  return tile
}

export const getTilePositionV3 = (tile: GameTileMdl): V3 => {
  return [tile.position[0], 0, tile.position[1]]
}

export const getPlayerPathToPosition = (player: GamePlayerMdl, position: V3): V3[] => {
  const [xPos, yPos, zPos] = position
  return [position]
}

export const usePlayerPosition = (playerKey: string): V3[] => {
  const players = usePlayers()
  const player = usePlayer(playerKey)
  const tiles = useTiles()
  if (!player.position) {
    return [getWaitingPosition(player, players)]
  }
  const tile = getTile(player.position, tiles)
  return [getTilePositionV3(tile)]
}

export const getDirection = (currentPosition: V3, newPosition: V3, currentDirection: string): string => {
  if (currentPosition[0] !== newPosition[0]) {
    if (currentPosition[0] < newPosition[0]) {
      return 'north'
    }
    return 'south'
  }
  if (currentPosition[2] !== newPosition[2]) {
    if (currentPosition[2] < newPosition[2]) {
      return 'east'
    }
    return 'west'
  }
  console.log('no match, returning currentDirection', currentPosition, newPosition)
  return currentDirection
}

export const useGetPositionSteps = () => {
  const getSteps = (currentPosition: V3, newPosition: V3) => {
    const currentDirection = 'north' // todo
    if (currentPosition[0] !== newPosition[0] && currentPosition[2] !== newPosition[2]) {
      const firstPosition = [newPosition[0], currentPosition[1], currentPosition[2]]
      const firstDirection = getDirection(currentPosition, firstPosition, currentDirection) // todo
      const finalDirection = getDirection(firstPosition, newPosition, firstDirection) // todo
      console.log('firstDirection', firstDirection)
      return [
        {
          position: firstPosition,
          direction: firstDirection
        },
        {
          position: newPosition,
          direction: finalDirection
        }
      ]
    }
    const finalDirection = getDirection(currentPosition, newPosition, currentDirection) // todo
    return [{ position: newPosition, direction: finalDirection }]
  }
  return [getSteps]
}
