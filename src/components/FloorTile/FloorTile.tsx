import React from 'react'

interface Props {
  color: string
  position: [number, number, number]
}

const FloorTile: React.FC<Props> = ({ color, position }) => {
  const updatedPosition = [position[0], position[1] - 0.02, position[2]]
  return (
    <mesh position={updatedPosition} scale={[1, 1, 1]} receiveShadow>
      <boxBufferGeometry attach="geometry" args={[0.6, 0.05, 0.6]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

export default FloorTile
