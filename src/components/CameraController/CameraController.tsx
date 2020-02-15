import React, { useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { useGameState } from '../GameState/GameState'

const useFollowRef = () => {
  const { activePlayer, playersRefs } = useGameState()
  if (activePlayer && playersRefs[activePlayer]) {
    return playersRefs[activePlayer]
  }
  return null
}

const CameraController: React.FC = () => {
  const { camera } = useThree()
  const followRef = useFollowRef()
  // useEffect(() => {
  //   console.log('followingObjectRef', followingObjectRef, camera)
  // }, [followingObjectRef])
  useFrame(() => {
    if (followRef) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      camera.position.set(followRef.position.x - 3, followRef.position.y + 4, followRef.position.z + 3)
    }
  })
  return null
}

export default CameraController
