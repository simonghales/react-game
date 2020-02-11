import React, { useContext, useEffect, useState } from 'react'
import { GAME_PLAYERS, GAME_TILES, GamePlayerMdl, GamePlayersMdl, GameTileMdl, GameTilesMdl } from '../../data/game'
import { getPlayerFromPlayers } from '../../data/player'

export interface IGameState {
  players: GamePlayersMdl
  updatePlayer: (player: GamePlayerMdl) => void
  rollDice: (playerKey: string, result: number) => void
}

export const GameStateContext = React.createContext<IGameState>({
  players: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updatePlayer: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  rollDice: () => {}
})

export const useGameState = (): IGameState => {
  return useContext(GameStateContext)
}

export const getTileFromTiles = (tileKey: string, tiles: GameTilesMdl): GameTileMdl => {
  const tile = tiles[tileKey]
  if (!tile) {
    throw new Error(`Tile ${tileKey} not found in tiles`)
  }
  return tile
}

export const getNextTile = (currentTileKey: string, tiles: GameTilesMdl): GameTileMdl => {
  if (!currentTileKey) {
    return GAME_TILES['00']
  }
  const currentTile = getTileFromTiles(currentTileKey, tiles)
  const nextTileKey = currentTile.nextTiles[0]
  return getTileFromTiles(nextTileKey, tiles)
}

const getPlayerRolledPositionAndPath = (player: GamePlayerMdl, rollResult: number, tiles: GameTilesMdl) => {
  const currentPosition = player.position
  const positionPath: string[] = []
  for (let i = 0, len = rollResult; i < len; i++) {
    const currentTileKey = i === 0 ? currentPosition : positionPath[i - 1]
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

const GameState: React.FC = ({ children }) => {
  const tiles = GAME_TILES
  const [players, setPlayers] = useState(GAME_PLAYERS)
  const [pendingRolls, setPendingRolls] = useState<
    {
      timestamp: any
      playerKey: string
      result: number
    }[]
  >([])

  const updatePlayer = (updatedPlayer: GamePlayerMdl) => {
    setPlayers(latestPlayers => {
      return {
        ...latestPlayers,
        [updatedPlayer.key]: updatedPlayer
      }
    })
  }

  useEffect(() => {
    pendingRolls.forEach(pendingRoll => {
      console.log('handle pending roll', pendingRoll)
      const player = getPlayerFromPlayers(pendingRoll.playerKey, players)
      const { position, positionPath, pendingMoves } = getPlayerRolledPositionAndPath(player, pendingRoll.result, tiles)
      updatePlayer({
        ...player,
        position,
        positionPath,
        pendingMoves
      })
    })
    setPendingRolls([])
  }, [
    pendingRolls
      .map(({ timestamp }) => {
        return timestamp
      })
      .join(',')
  ])

  const rollDice = (playerKey: string, result: number) => {
    setPendingRolls(currentPendingRolls => {
      return currentPendingRolls.concat([
        {
          timestamp: Date.now(),
          playerKey,
          result
        }
      ])
    })
  }

  // useEffect(() => {
  //   setInterval(() => {
  //     setPlayers(updatedPlayers => {
  //       const playerToUpdate = getPlayerFromPlayers('00', updatedPlayers)
  //       const newPosition = playerToUpdate.position ? '' : '02'
  //       const updatedPlayer = {
  //         ...playerToUpdate,
  //         position: newPosition
  //       }
  //       console.log('updatedPlayer', updatedPlayer)
  //       return {
  //         ...updatedPlayers,
  //         [updatedPlayer.key]: updatedPlayer
  //       }
  //     })
  //   }, 4000)
  // }, [])

  return (
    <GameStateContext.Provider
      value={{
        players,
        updatePlayer,
        rollDice
      }}
    >
      {children}
    </GameStateContext.Provider>
  )
}

export default GameState
