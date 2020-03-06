import React, { useEffect } from 'react'
import {useHandleRoundStateChanges, useHandleTurnCompleted} from '../../../../../../state/hooks'

const RoundStateListener: React.FC = () => {
  useHandleRoundStateChanges()
  useHandleTurnCompleted()

  return null
}

export default RoundStateListener
