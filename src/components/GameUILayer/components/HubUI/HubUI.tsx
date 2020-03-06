import React from 'react'
import styled from 'styled-components'
import { mediumHeadingCss } from '../../../../styles/typography'

const InstructionWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Instruction = styled.div`
  ${mediumHeadingCss};
  text-align: center;

  strong {
    font-weight: 900;
  }
`

const Code = styled.span`
  font-size: 4.5em;
  line-height: 1;
  font-weight: 900;
`

const Website = styled.span`
  font-weight: 900;
  text-decoration: underline;
`

const HubUI: React.FC = () => (
  <InstructionWrapper>
    <Instruction>
      <span>
        <strong>to join</strong>
        <span>, enter the code</span>
      </span>
      <br />
      <Code>1337</Code>
      <br />
      <span>
        at <Website>fruitsalad.party</Website>
      </span>
    </Instruction>
  </InstructionWrapper>
)

export default HubUI
