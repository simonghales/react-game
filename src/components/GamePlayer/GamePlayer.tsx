import React, { useEffect, useRef, useState } from 'react'
import { a, useSpring } from 'react-spring/three'
import { easeQuadInOut } from 'd3-ease'
import { IGamePlayer } from '../../state/gameState'
import Character from '../Character/Character'
import { PlayerPositionKey, useGetPlayerPositionSteps, usePlayerPosition, usePlayerRotation } from '../../state/hooks'
import { useMiscStore } from '../../state/store'
import ChatBubble from '../ChatBubble/ChatBubble'
import { V3 } from '../../utils/types'
import { DIRECTION_NORTH, DIRECTION_SOUTH, hasPassedTile } from '../../state/state'

interface Props {
  player: IGamePlayer
}

const ease = easeQuadInOut

const GamePlayer: React.FC<Props> = ({ player }) => {
  const playerRef = useRef()
  const [position, positionKey] = usePlayerPosition(player.key)
  const [previousPositionKey, setPreviousPositionKey] = useState<PlayerPositionKey | null>(null)
  const [positionAnimating, setPositionAnimating] = useState(false)
  const getPlayerPositionSteps = useGetPlayerPositionSteps(player.key)
  const [passedTiles, setPassedTiles] = useState({})

  const rotation = usePlayerRotation(player.key)
  const [direction, setDirection] = useState(rotation[1])

  const onStart = () => {
    setPositionAnimating(true)
  }

  const onRest = (finalAnimation: boolean, newDirection?: number) => {
    if (finalAnimation) {
      setPositionAnimating(false)
    }
    if (finalAnimation && !player.boardPosition) {
      setDirection(rotation[1])
    } else if (newDirection !== undefined) {
      setDirection(newDirection)
    }
  }

  const [movementSpring, setMovementSpring] = useSpring(() => ({
    position,
    config: { duration: 500, easing: ease },
    onStart
  }))

  const [rotationSpring, setRotationSpring] = useSpring(() => ({
    rotation,
    config: { mass: 0.2, friction: 5, tension: 20 }
  }))

  useEffect(() => {
    setRotationSpring({
      rotation: [0, direction, 0]
    })
  }, [direction])

  const setPlayerRef = useMiscStore(state => state.setPlayerRef)

  useEffect(() => {
    if (playerRef.current) {
      setPlayerRef(player.key, playerRef.current)
    }
    return () => {
      setPlayerRef(player.key, null)
    }
  }, [playerRef])

  useEffect(() => {
    console.log('previousPositionKey', previousPositionKey)

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const currentPosition: V3 = movementSpring.position.source.map(item => item.value)

    const steps = getPlayerPositionSteps(currentPosition, position, previousPositionKey, positionKey) // todo

    console.log('steps', steps)
    setDirection(steps[0].direction)

    const to = steps.map((step, index) => {
      const isFinal = index === steps.length - 1
      const nextDirection = isFinal ? step.direction : steps[index + 1].direction

      const onFrame = (value: any) => {
        step.tiles.forEach(tile => {
          if (hasPassedTile(value.position, tile, step.direction)) {
            setPassedTiles(latestState => {
              return {
                ...latestState,
                [tile.key]: tile
              }
            })
          }
        })
      }

      return {
        position: step.position,
        config: {
          duration: step.numberOfTiles * 500
        },
        onFrame,
        onRest: () => {
          onRest(index === steps.length - 1, nextDirection)
        }
      }
    })

    setMovementSpring({
      to
    })
    setPreviousPositionKey(positionKey)
  }, [...position])
  return (
    <a.group ref={playerRef} position={movementSpring.position}>
      <a.group rotation={rotationSpring.rotation}>
        <Character type={player.characterType} walking={positionAnimating} />
      </a.group>
      <ChatBubble characterType={player.characterType} />
    </a.group>
  )
}

export default GamePlayer
