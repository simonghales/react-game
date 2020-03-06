import React, { useState } from 'react'
import styled from 'styled-components'
import { usePlayer, useUpdatePlayer } from '../../../../../hooks/player'
import FieldInput from './components/FieldInput/FieldInput'
import { useGameState } from '../../../GameState/GameState'

interface FieldProps {
  fieldKey: string
  field: any
  onUpdate: (value: any) => void
}

const Field: React.FC<FieldProps> = ({ fieldKey, field, onUpdate }) => {
  return (
    <div>
      <div>{fieldKey}</div>
      <FieldInput
        fieldKey={fieldKey}
        value={field}
        onChange={value => {
          onUpdate(value)
        }}
      />
    </div>
  )
}

const Container = styled.div`
  margin: 20px 0;
`

interface Props {
  playerKey: string
}

const PlayerDebugger: React.FC<Props> = ({ playerKey }) => {
  const [diceValue, setDiceValue] = useState(1)
  const updatePlayer = useUpdatePlayer()
  const player = usePlayer(playerKey)
  const { rollDice } = useGameState()

  const updatePlayerField = (fieldKey: string, fieldValue: any) => {
    updatePlayer({
      ...player,
      [fieldKey]: fieldValue
    })
  }

  const handleRoll = () => {
    rollDice(playerKey, diceValue)
  }

  return (
    <Container>
      <div>{playerKey}</div>
      <div>
        <select
          value={diceValue}
          onChange={event => {
            setDiceValue(parseInt(event.target.value, 10))
          }}
        >
          {Array.from({ length: 6 }).map((item, index) => {
            return <option value={index + 1}>{index + 1}</option>
          })}
        </select>
        <button type="button" onClick={handleRoll}>
          roll
        </button>
      </div>
      <div>
        {Object.entries(player).map(([key, field]) => {
          return (
            <Field
              key={key}
              fieldKey={key}
              field={field}
              onUpdate={(value: any) => {
                updatePlayerField(key, value)
              }}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default PlayerDebugger
