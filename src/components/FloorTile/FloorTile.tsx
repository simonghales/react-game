import React from 'react'

interface Props {
  color: string
  position: [number, number, number]
}

const FloorTile: React.FC<Props> = ({ color, position }) => {
  const updatedPosition = [position[0], position[1], position[2]]
  return (
    <mesh position={updatedPosition} scale={[1, 1, 1]} castShadow receiveShadow>
      <boxBufferGeometry attach="geometry" args={[0.8, 0.05, 0.8]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

export default FloorTile
