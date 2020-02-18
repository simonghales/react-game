import React, { useEffect } from 'react'
import { useStore } from '../../state/store'
import GameTile from '../GameTile/GameTile'
import { IGameTiles } from '../../state/gameState'

const GameTiles: React.FC = () => {
  const tiles: IGameTiles = useStore(state => state.tiles)
  useEffect(() => {
    console.log('tiles', tiles)
  }, [tiles])
  return (
    <>
      {Object.entries(tiles).map(([key, tile]) => {
        return <GameTile key={key} tile={tile} />
      })}
    </>
  )
}

export default GameTiles
