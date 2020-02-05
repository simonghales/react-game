import React, { useRef, useState } from 'react'
import * as CANNON from 'cannon'
import { useFrame } from 'react-three-fiber'
import { useCannon } from '../Physics/Physics'

const Box: React.FC<any> = ({ position, ...props }) => {
  // This reference will give us direct access to the mesh
  // const mesh: any = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const ref = useCannon({ mass: 10 }, (body: any) => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)))
    body.position.set(...position)
    // eslint-disable-next-line no-param-reassign
    body.linearDamping = 0.01
  })

  // // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   if (mesh) {
  //     // eslint-disable-next-line no-multi-assign
  //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  //   }
  // })

  return (
    <mesh
      {...props}
      position={position}
      ref={ref}
      scale={[1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
      castShadow
      receiveShadow
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default Box
