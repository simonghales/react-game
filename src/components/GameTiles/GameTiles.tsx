import React from 'react'
import { GAME_TILES } from '../../data/game'
import Box from '../Box/Box'
import GameTile from '../GameTile/GameTile'

const GameTiles: React.FC = () => {
  const tiles = GAME_TILES
  const tilesArray = Object.entries(tiles)
  return (
    <>
      {tilesArray.map(([key, tile]) => {
        return <GameTile tile={tile} key={key} />
      })}
    </>
  )
}

export default GameTiles
