import React, { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend, useThree, useFrame } from 'react-three-fiber'

extend({ OrbitControls })

const Controls: React.FC<any> = props => {
  const { camera, gl } = useThree()
  const controls: any = useRef()
  useFrame(() => controls.current.update())
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return <orbitControls ref={controls} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} {...props} />
}

export default Controls
