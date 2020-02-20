import React from 'react'
import { useStore } from '../../../../state/store'
import { GameState } from '../../../../state/gameState'

const GameStateDebugger: React.FC = () => {
  const state = useStore(storeState => storeState.state)
  const setState = useStore(storeState => storeState.setGameState)
  return (
    <div>
      <div>
        <label>
          State:
          <select
            value={state}
            onChange={event => {
              const { value } = event.target
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              setState(value)
            }}
          >
            {Object.keys(GameState).map(stateKey => {
              return <option value={stateKey}>{stateKey}</option>
            })}
          </select>
        </label>
      </div>
    </div>
  )
}

export default GameStateDebugger
