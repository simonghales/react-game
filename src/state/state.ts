import { GameState, IGamePlayer, IGamePlayers, IGameTile, IGameTiles } from './gameState'
import { V3 } from '../utils/types'
import { PlayerPositionKey } from './hooks'
import { radians } from '../utils/angles'

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

export const getTileFromTiles = (tileKey: string, tiles: IGameTiles): IGameTile => {
  return tiles[tileKey]
}

export const getGameTileV3Position = (tile: IGameTile): V3 => {
  return [tile.position[1], 0, tile.position[0]]
}

export const getGamePlayerPosition = (playerKey: string, players: IGamePlayers, tiles: IGameTiles): V3 => {
  const player = getPlayerFromPlayers(playerKey, players)
  if (!player.boardPosition) {
    return getGamePlayerWaitingPosition(player, players)
  }
  const tile = getTileFromTiles(player.boardPosition, tiles)
  return getGameTileV3Position(tile)
}

export const isGameStateHubRelated = (state: GameState): boolean => {
  return state === GameState.PENDING || state === GameState.HUB
}

export const isGameStatePlayingRelated = (state: GameState): boolean => {
  return state === GameState.STARTING || state === GameState.PLAYING
}

export const DIRECTION_NORTH = radians(0)
export const DIRECTION_EAST = radians(-90)
export const DIRECTION_SOUTH = radians(180)
export const DIRECTION_WEST = radians(90)

export interface IPlayerPositionStep {
  numberOfTiles: number
  tiles: IGameTile[]
  direction: number
  position: V3
}

export const getDirection = (currentPosition: V3, newPosition: V3, currentDirection: number): number => {
  if (currentPosition[0] !== newPosition[0]) {
    if (currentPosition[0] < newPosition[0]) {
      return DIRECTION_NORTH
    }
    return DIRECTION_SOUTH
  }
  if (currentPosition[2] !== newPosition[2]) {
    if (currentPosition[2] < newPosition[2]) {
      return DIRECTION_EAST
    }
    return DIRECTION_WEST
  }
  console.log('no match, returning currentDirection', currentPosition, newPosition)
  return currentDirection
}

export const getPlayerPositionSteps = (
  player: IGamePlayer,
  tiles: IGameTiles,
  currentPosition: V3,
  newPosition: V3,
  previousPositionKey: PlayerPositionKey | null,
  positionKey: PlayerPositionKey | null
): IPlayerPositionStep[] => {
  const currentDirection = DIRECTION_EAST

  if (positionKey && positionKey !== PlayerPositionKey.PLAYING) {
    console.log('returning default...', positionKey, 'DIRECTION_EAST', DIRECTION_EAST, 'DIRECTION_SOUTH', DIRECTION_SOUTH)
    return [
      {
        numberOfTiles: 1,
        tiles: [],
        direction: positionKey === PlayerPositionKey.STARTING ? DIRECTION_EAST : DIRECTION_SOUTH,
        position: newPosition
      }
    ]
  }

  if (player.boardPositionPath.length === 0) {
    return [
      {
        numberOfTiles: 1,
        tiles: [],
        direction: getDirection(currentPosition, newPosition, currentDirection),
        position: newPosition
      }
    ]
  }

  const steps: IPlayerPositionStep[] = []

  player.boardPositionPath.forEach(tileKey => {
    const tile = getTileFromTiles(tileKey, tiles)
    const tilePosition = getGameTileV3Position(tile)
    if (steps.length === 0) {
      const direction = getDirection(currentPosition, tilePosition, currentDirection)
      steps.push({
        numberOfTiles: 1,
        tiles: [tile],
        direction,
        position: tilePosition
      })
    } else {
      const previousStep = steps[steps.length - 1]
      const direction = getDirection(previousStep.position, tilePosition, previousStep.direction)
      const step = {
        numberOfTiles: 1,
        tiles: [tile],
        position: tilePosition,
        direction
      }
      if (direction === previousStep.direction) {
        steps[steps.length - 1] = {
          ...step,
          tiles: previousStep.tiles.concat([tile]),
          numberOfTiles: previousStep.numberOfTiles + 1
        }
      } else {
        steps.push(step)
      }
    }
  })

  console.log('player.boardPositionPath', player.boardPositionPath, steps)

  return steps
}

export const getStartingTile = (tiles: IGameTiles): IGameTile => {
  const startingTile = Object.values(tiles).find(tile => {
    return tile.starting
  })
  if (!startingTile) {
    throw new Error(`No starting tile found`)
  }
  return startingTile
}

export const getNextTile = (currentTileKey: string, tiles: IGameTiles): IGameTile => {
  if (!currentTileKey) {
    return getStartingTile(tiles)
  }
  const currentTile = getTileFromTiles(currentTileKey, tiles)
  const nextTileKey = currentTile.connectedTiles[0] // todo - handle multiple paths...
  return getTileFromTiles(nextTileKey, tiles)
}

export const getPlayerRolledPositionAndPath = (
  player: IGamePlayer,
  tiles: IGameTiles,
  dice: number
): {
  position: string
  positionPath: string[]
  pendingMoves: number
} => {
  const { boardPosition } = player
  const positionPath: string[] = []
  for (let i = 0, len = dice; i < len; i++) {
    const currentTileKey = i === 0 ? boardPosition : positionPath[i - 1]
    const nextTile = getNextTile(currentTileKey, tiles)
    positionPath.push(nextTile.key)
  }
  const newPosition = positionPath[positionPath.length - 1]
  const pendingMoves = 0
  return {
    position: newPosition,
    positionPath,
    pendingMoves
  }
}

const difference = 0.05

export const hasPassedTile = (position: V3, tile: IGameTile, direction: number): boolean => {
  const [xPos, yPos, zPos] = position
  const [tileXPos, tileZPos] = tile.position
  if (direction === DIRECTION_EAST) {
    if (zPos >= tileZPos - difference) {
      return true
    }
  } else if (direction === DIRECTION_WEST) {
    if (zPos <= tileZPos + difference) {
      return true
    }
  } else if (direction === DIRECTION_SOUTH) {
    if (xPos <= tileXPos + difference) {
      return true
    }
  } else if (direction === DIRECTION_NORTH) {
    if (xPos >= tileXPos - difference) {
      return true
    }
  }
  return false
}
