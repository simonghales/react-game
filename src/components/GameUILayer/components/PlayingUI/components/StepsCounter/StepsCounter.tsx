import React from 'react'
import styled from 'styled-components'
import { useStore } from '../../../../../../state/store'
import { useActiveTurnDiceRoll, useLocalActiveTurn } from '../../../../../../state/hooks'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Steps = styled.div`
  margin-top: -170px;
  font-size: 50px;
  color: rgb(38, 123, 255);
  -webkit-text-stroke: 3px rgb(255, 255, 255);
  text-shadow: 0 0 5px rgba(0, 20, 129, 0.19);
  font-family: 'Coda Caption', sans-serif;
`

const useRemainingStepsCount = (): number => {
  const activeTurn = useLocalActiveTurn()
  const activeDiceRoll = useActiveTurnDiceRoll()
  if (!activeDiceRoll) {
    return 0
  }
  return activeDiceRoll - activeTurn.passedTiles.length
}

const StepsCounter: React.FC = () => {
  const remainingSteps = useRemainingStepsCount()
  return (
    <Container
      style={{
        visibility: remainingSteps ? 'visible' : 'hidden'
      }}
    >
      <Steps>{remainingSteps}</Steps>
    </Container>
  )
}

export default StepsCounter
