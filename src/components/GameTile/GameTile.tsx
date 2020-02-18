import React from 'react'
import { GameTileType, IGameTile } from '../../state/gameState'
import { V3 } from '../../utils/types'
import FloorTile from '../FloorTile/FloorTile'

const COLORS = {
  [GameTileType.DEFAULT]: '#a8d4ad',
  [GameTileType.BONUS1]: '#338fd4',
  [GameTileType.BONUS2]: '#30d48d',
  [GameTileType.NEGATIVE1]: '#d4445a',
  [GameTileType.STAR]: '#d4cb40'
  // [GameTileType.CHALLENGE]: '#8f63d4'
}

interface Props {
  tile: IGameTile
}

const GameTile: React.FC<Props> = ({ tile }) => {
  const position: V3 = [tile.position[1], 0, tile.position[0]]
  const color = COLORS[tile.tileType]
  return <FloorTile position={position} color={color} />
}

export default GameTile
