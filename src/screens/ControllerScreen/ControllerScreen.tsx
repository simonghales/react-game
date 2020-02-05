import React from 'react'
import { ablyChannel } from '../../ably/ably'

const ControllerScreen: React.FC = () => {
  const handleAddBlock = () => {
    ablyChannel.publish('addBlock', {
      timestamp: Date.now()
    })
  }

  return (
    <div>
      <button type="button" onClick={handleAddBlock}>
        add block!
      </button>
    </div>
  )
}

export default ControllerScreen
