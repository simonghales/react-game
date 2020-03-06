import React from 'react'
import styled from 'styled-components'
import Instruction from './components/Instruction/Instruction'
import { useCurrentPendingTurnPlayer, useUnsafePlayer } from '../../../../../../state/hooks'
import { getPlayerName } from '../../../../../../state/state'

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 50px;
  right: 50px;
`

const useIsPendingRoll = (): any | null => {
  const pendingPlayerTurn = useCurrentPendingTurnPlayer()
  const player = useUnsafePlayer(pendingPlayerTurn)
  if (!pendingPlayerTurn || !player) return null
  return (
    <>
      <strong>{getPlayerName(player)}'s</strong> turn to <strong>roll</strong>
    </>
  )
}

const InstructionsUI: React.FC = () => {
  const pendingRoll = useIsPendingRoll()
  return <Container>{pendingRoll && <Instruction>{pendingRoll}</Instruction>}</Container>
}

export default InstructionsUI
