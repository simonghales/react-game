import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { IActiveRoll, useGameState } from '../../../../GameState/GameState'

const StepsContainer = styled.div`
  position: absolute;
  top: 50%;
  margin-top: -170px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  font-family: 'Coda Caption', sans-serif;
`

const Step = styled.div`
  font-size: 50px;
  color: rgb(38, 123, 255);
  -webkit-text-stroke: 3px rgb(255, 255, 255);
  text-shadow: 0 0 5px rgba(0, 20, 129, 0.19);
`

const getRemainingSteps = (activeRoll: IActiveRoll): number => {
  const diceRoll = activeRoll.result
  for (let i = activeRoll.path.length - 1, len = 0; i >= len; i--) {
    const tileKey = activeRoll.path[i]
    if (activeRoll.passedTiles[tileKey]) {
      return diceRoll - i - 1
    }
  }
  return diceRoll
}

const StepsCount: React.FC = () => {
  const { activeRoll } = useGameState()
  const remainingSteps = activeRoll ? getRemainingSteps(activeRoll) : 0
  const visible = !!(activeRoll && remainingSteps > 0)
  const props = useSpring({ opacity: visible ? 1 : 0 })
  return (
    <StepsContainer>
      <Step>
        <animated.div style={props}>{remainingSteps}</animated.div>
      </Step>
    </StepsContainer>
  )
}

export default StepsCount
