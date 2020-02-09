import React from 'react'
import * as THREE from 'three'
import { radians } from '../../utils/angles'

interface Props {
  position?: [number, number, number]
}

const Floor: React.FC<Props> = ({ position = [0, 0, 0], ...props }) => {
  const rotation = [radians(-90), 0, 0]
  return (
    <mesh {...props} position={position} rotation={rotation} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" color="#E8BD6A" side={THREE.DoubleSide} />
    </mesh>
  )
}

export default Floor
