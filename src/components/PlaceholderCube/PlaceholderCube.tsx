import React from 'react'

interface Props {
  [key: string]: any
}

const PlaceholderCube: React.FC<Props> = props => (
  <mesh {...props} scale={[1, 1, 1]} castShadow receiveShadow>
    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    <meshStandardMaterial attach="material" color="hotpink" />
  </mesh>
)

export default PlaceholderCube
