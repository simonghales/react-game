import React from 'react'
import styled from 'styled-components'
import { mediumHeadingCss } from '../../../../../../../../styles/typography'

const Message = styled.div`
  ${mediumHeadingCss};
  font-weight: 700;
  text-align: center;

  strong {
    font-weight: 900;
  }
`

const Instruction: React.FC = ({ children }) => <Message>{children}</Message>

export default Instruction
