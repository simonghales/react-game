import React from 'react'
import { GameTileMdl, GameTileType } from '../../../data/game'
import FloorTile from '../FloorTile/FloorTile'

const COLORS = {
  [GameTileType.PLAIN]: '#a8d4ad',
  [GameTileType.BONUS1]: '#338fd4',
  [GameTileType.BONUS2]: '#30d48d',
  [GameTileType.NEGATIVE1]: '#d4445a',
  [GameTileType.STAR]: '#d4cb40',
  [GameTileType.CHALLENGE]: '#8f63d4'
}

interface Props {
  tile: GameTileMdl
}

const GameTile: React.FC<Props> = ({ tile }) => {
  const position: [number, number, number] = [tile.position[0], 0, tile.position[1]]
  return <FloorTile color={COLORS[tile.type]} position={position} />
}

export default GameTile
