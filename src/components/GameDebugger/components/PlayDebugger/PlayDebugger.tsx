import React, { useState } from 'react'
import { usePlayers } from '../../../../state/hooks'
import { useGameStateHandlerContext } from '../../../GameStateHandler/GameStateHandler'

const PlayDebugger: React.FC = () => {
  const { rollPlayerDice } = useGameStateHandlerContext()
  const players = usePlayers()
  const initialSelectedPlayer = Object.keys(players).length > 0 ? Object.keys(players)[0] : ''
  const [selectedPlayer, setSelectedPlayer] = useState(initialSelectedPlayer)
  const [selectedDice, setSelectedDice] = useState(1)

  const handleRollDice = () => {
    rollPlayerDice(selectedPlayer, selectedDice)
  }

  return (
    <div>
      <div>
        <select
          value={selectedPlayer}
          onChange={event => {
            setSelectedPlayer(event.target.value)
          }}
        >
          {Object.entries(players).map(([key, player]) => {
            return (
              <option key={key} value={key}>
                {player.name}
              </option>
            )
          })}
        </select>
      </div>
      <div>
        <select
          onChange={event => {
            setSelectedDice(parseInt(event.target.value, 10))
          }}
          value={selectedDice}
        >
          {Array.from({ length: 6 }).map((item, index) => {
            return (
              <option value={index + 1} key={index.toString()}>
                {index + 1}
              </option>
            )
          })}
        </select>
        <button onClick={handleRollDice}>roll dice</button>
      </div>
    </div>
  )
}

export default PlayDebugger
