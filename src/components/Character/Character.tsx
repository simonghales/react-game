import React, { Suspense } from 'react'
import Banana from '../characters/Banana/Banana'
import PlaceholderCube from '../PlaceholderCube/PlaceholderCube'
import { V3 } from '../../utils/types'
import { GameCharacterType } from '../../data/game'
import Donut from '../characters/Donut/Donut'

const models = {
  [GameCharacterType.BANANA]: Banana,
  [GameCharacterType.DONUT]: Donut
}

const getCharacterModel = (type: GameCharacterType): React.FC<any> => {
  const model = models[type]
  if (!model) {
    throw new Error(`No model found matching ${type}`)
  }
  return model
}

interface Props {
  type: GameCharacterType
  position: V3
}

const Character: React.FC<Props> = ({ type, position }) => {
  const Model = getCharacterModel(type)
  return (
    <Suspense fallback={<PlaceholderCube position={position} />}>
      <Model position={position} />
    </Suspense>
  )
}

export default Character
