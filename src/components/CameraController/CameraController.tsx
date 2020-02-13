import React, { useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { useGameState } from '../GameState/GameState'

const CameraController: React.FC = () => {
  const { camera } = useThree()
  const { followingObjectRef } = useGameState()
  useEffect(() => {
    console.log('followingObjectRef', followingObjectRef, camera)
  }, [followingObjectRef])
  useFrame(() => {
    if (followingObjectRef) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      camera.position.set(followingObjectRef.position.x - 3, followingObjectRef.position.y + 4, followingObjectRef.position.z + 3)
    }
  })
  return null
}

export default CameraController
