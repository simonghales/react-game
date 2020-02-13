import { V3 } from '../utils/types'
import { GAME_PLAYERS, GAME_TILES, GamePlayerMdl, GamePlayersMdl, GameTileMdl, GameTilesMdl } from '../data/game'
import { getTileFromTiles, useGameState } from '../components/GameState/GameState'
import { getPlayerFromPlayers } from '../data/player'

export const usePlayers = (): GamePlayersMdl => {
  const state = useGameState()
  return state.players
}

export const usePlayersArray = (): [string, GamePlayerMdl][] => {
  const players = usePlayers()
  const playersArray = Object.entries(players)
  return playersArray
}

export const usePlayer = (playerKey: string): GamePlayerMdl => {
  const players = usePlayers()
  return getPlayerFromPlayers(playerKey, players)
}

export const useUpdatePlayer = () => {
  const { updatePlayer } = useGameState()
  return updatePlayer
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

export const getPositionSteps = (currentPosition: V3, newPosition: V3, player: GamePlayerMdl, tiles: GameTilesMdl) => {
  const currentDirection = 'north' // todo
  if (player.positionPath.length === 0) {
    const finalDirection = getDirection(currentPosition, newPosition, currentDirection)
    return [
      {
        numberOfTiles: 1,
        direction: finalDirection,
        position: newPosition
      }
    ]
  }

  const steps: { direction: string; position: V3; numberOfTiles: number }[] = []

  player.positionPath.forEach(tileKey => {
    const tile = getTileFromTiles(tileKey, tiles)
    const tilePosition = getTilePositionV3(tile)
    if (steps.length === 0) {
      const direction = getDirection(currentPosition, tilePosition, currentDirection)
      steps.push({
        numberOfTiles: 1,
        position: tilePosition,
        direction
      })
    } else {
      const previousStep = steps[steps.length - 1]
      const direction = getDirection(previousStep.position, tilePosition, previousStep.direction)
      const step = {
        numberOfTiles: 1,
        position: tilePosition,
        direction
      }
      if (direction === previousStep.direction) {
        steps[steps.length - 1] = {
          ...step,
          numberOfTiles: previousStep.numberOfTiles + 1
        }
      } else {
        steps.push(step)
      }
    }
  })

  return steps

  // console.log('steps', steps)
  //
  // if (currentPosition[0] !== newPosition[0] && currentPosition[2] !== newPosition[2]) {
  //   const firstPosition = [newPosition[0], currentPosition[1], currentPosition[2]]
  //   const firstDirection = getDirection(currentPosition, firstPosition, currentDirection) // todo
  //   const finalDirection = getDirection(firstPosition, newPosition, firstDirection) // todo
  //   console.log('firstDirection', firstDirection)
  //   return [
  //     {
  //       position: firstPosition,
  //       direction: firstDirection
  //     },
  //     {
  //       position: newPosition,
  //       direction: finalDirection
  //     }
  //   ]
  // }
  // const finalDirection = getDirection(currentPosition, newPosition, currentDirection) // todo
  // return [{ position: newPosition, direction: finalDirection }]
}

export const useGetPositionSteps = () => {
  const tiles = useTiles()
  const getSteps = (currentPosition: V3, newPosition: V3, player: GamePlayerMdl) => {
    return getPositionSteps(currentPosition, newPosition, player, tiles)
  }
  return [getSteps]
}
