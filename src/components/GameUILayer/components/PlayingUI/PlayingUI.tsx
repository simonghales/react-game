import React from 'react'
import StepsCounter from './components/StepsCounter/StepsCounter'
import ScoreUI from './components/ScoreUI/ScoreUI'
import InstructionsUI from './components/InstructionsUI/InstructionsUI'

const PlayingUI: React.FC = () => (
  <>
    <ScoreUI />
    <StepsCounter />
    <InstructionsUI />
  </>
)

export default PlayingUI
