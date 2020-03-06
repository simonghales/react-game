import React from 'react'
import { V3 } from '../../utils/types'

interface Props {
  color: string
  position: V3
}

const FloorTile: React.FC<Props> = ({ color, position }) => {
  const updatedPosition = [position[0], position[1] - 0.01, position[2]]
  return (
    <mesh position={updatedPosition} scale={[1, 1, 1]} receiveShadow>
      <boxBufferGeometry attach="geometry" args={[0.5, 0.03, 0.5]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

export default FloorTile
