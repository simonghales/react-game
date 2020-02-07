import React from 'react'
import { GameTileMdl } from '../../data/game'
import FloorTile from '../FloorTile/FloorTile'

interface Props {
  tile: GameTileMdl
}

const GameTile: React.FC<Props> = ({ tile }) => {
  const position: [number, number, number] = [tile.position[0], 0, tile.position[1]]
  return <FloorTile color="#a8d4ad" position={position} />
}

export default GameTile
