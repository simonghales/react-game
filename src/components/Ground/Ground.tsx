import React from 'react'
import * as CANNON from 'cannon'
import * as THREE from 'three'
import { useCannon } from '../Physics/Physics'

const radians = (degrees: number): number => {
  return (degrees * Math.PI) / 180
}

const Ground: React.FC<any> = ({ position, ...props }) => {
  const rotation = [radians(-90), 0, 0]
  // Register plane as a physics body with zero mass
  const ref = useCannon({ mass: 0 }, (body: any) => {
    console.log('body', body)
    body.addShape(new CANNON.Plane())
    body.position.set(...position)
    body.quaternion.setFromEuler(...rotation)
  })
  return (
    <mesh ref={ref} {...props} position={position} rotation={rotation} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" color="#272727" side={THREE.DoubleSide} />
    </mesh>
  )
}

export default Ground
