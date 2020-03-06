import React, { useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { useSpring } from 'react-spring/three'
import { useActivePlayer, useActiveTurnState, useCameraPosition, useCameraRotation, useGameState } from '../../state/hooks'
import { useMiscStore } from '../../state/store'
import { GameState, PlayerMoveState } from '../../state/gameState'
import { V3 } from '../../utils/types'

const useFollowRef = () => {
  const gameState = useGameState()
  const activePlayer = useActivePlayer()
  const playerRefs = useMiscStore(state => state.playerRefs)
  if (activePlayer && gameState === GameState.PLAYING) {
    if (playerRefs[activePlayer]) {
      return playerRefs[activePlayer]
    }
  }
  return null
}

const getPlayerFollowCameraOffset = (followRef: any): V3 => {
  return [followRef.position.x - 3, followRef.position.y + 4, followRef.position.z + 3]
}

const updatePlayerFollowCamera = (followRef: any, camera: any) => {
  const position = getPlayerFollowCameraOffset(followRef)
  camera.position.set(position[0], position[1], position[2])
}

const CameraHandler: React.FC = () => {
  const { camera } = useThree()
  const cameraPosition = useCameraPosition()
  const cameraRotation = useCameraRotation()
  const activeTurnState = useActiveTurnState()
  const followRef = useFollowRef()

  const movementOnFrame = (value: any) => {
    const { position } = value
    camera.position.set(position[0], position[1], position[2])
  }

  const [movementSpring, setMovementSpring] = useSpring(() => ({
    position: cameraPosition,
    config: { mass: 0.2, friction: 5, tension: 20 },
    onFrame: movementOnFrame
  }))

  const rotationOnFrame = (value: any) => {
    const { rotation } = value
    camera.rotation.set(rotation[0], rotation[1], rotation[2])
  }

  const [rotationSpring, setRotationSpring] = useSpring(() => ({
    rotation: cameraRotation,
    config: { mass: 0.2, friction: 5, tension: 20 },
    onFrame: rotationOnFrame
  }))

  useEffect(() => {
    camera.rotation.order = 'YXZ'
    camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2])
    camera.rotation.set(cameraRotation[0], cameraRotation[1], cameraRotation[2])
  }, [])

  useEffect(() => {
    console.log('updating camera rotation')
    setRotationSpring({
      to: {
        rotation: cameraRotation
      }
    })
  }, [...cameraRotation])

  useEffect(() => {
    setMovementSpring({
      to: {
        position: cameraPosition
      }
    })
    // camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2])
  }, [...cameraPosition])

  useEffect(() => {
    if (followRef) {
      // if (activeTurnState === ActiveTurnState.MOVING) {
      // todo - stop movementSpring
      updatePlayerFollowCamera(followRef, camera)
      camera.lookAt(followRef.position.x, followRef.position.y + 0.65, followRef.position.z)
      // } else {
      //   console.log('smooth transition')
      //   const onRest = () => {
      //     camera.lookAt(followRef.position.x, followRef.position.y + 0.5, followRef.position.z)
      //   }
      //   setMovementSpring({
      //     to: {
      //       position: getPlayerFollowCameraOffset(followRef)
      //     },
      //     onRest
      //   })
      // }
    }
  }, [followRef])

  useFrame(() => {
    if (followRef && activeTurnState === PlayerMoveState.MOVING) {
      updatePlayerFollowCamera(followRef, camera)
    }
  })
  return null
}

export default CameraHandler
