import React, { Suspense } from 'react'
import { useSpring } from 'react-spring'
import Banana from '../characters/Banana/Banana'
import PlaceholderCube from '../PlaceholderCube/PlaceholderCube'
import { V3 } from '../../utils/types'
import Donut from '../characters/Donut/Donut'
import Cherry from '../characters/Cherry/Cherry'
import Peach from '../characters/Peach/Peach'
import {GameCharacterType} from "../../state/gameState";

const models = {
  [GameCharacterType.BANANA]: Banana,
  [GameCharacterType.DONUT]: Donut,
  [GameCharacterType.CHERRY]: Cherry,
  [GameCharacterType.PEACH]: Peach
}

const getCharacterModel = (type: GameCharacterType): React.FC<any> => {
  const model = models[type]
  if (!model) {
    throw new Error(`No model found matching ${type}`)
  }
  return model
}

interface Props {
  walking: boolean
  type: GameCharacterType
}

const Character: React.FC<Props> = ({ walking, type }) => {
  const Model = getCharacterModel(type)
  return (
    <Suspense fallback={<PlaceholderCube />}>
      <Model walking={walking} />
    </Suspense>
  )
}

export default Character
