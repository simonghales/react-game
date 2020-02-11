import React from 'react'
import { useTiles } from '../../../../../../hooks/player'

interface Props {
  fieldKey: string
  value: any
  onChange: (value: any) => void
}

const FieldInput: React.FC<Props> = ({ fieldKey, value, onChange }) => {
  const tiles = useTiles()
  if (fieldKey === 'position') {
    return (
      <select
        onChange={event => {
          onChange(event.target.value)
        }}
        value={value}
      >
        <option value="">none</option>
        {Object.entries(tiles).map(([key, tile]) => {
          return (
            <option key={key} value={key}>
              {key}:{tile.type}
            </option>
          )
        })}
      </select>
    )
  }
  return (
    <input
      type="text"
      value={value}
      onChange={event => {
        onChange(event.target.value)
      }}
    />
  )
}

export default FieldInput
