import React from 'react'
import styled from 'styled-components'

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
  text-align: center;
  color: #ffffff;
  font-size: 2rem;
  letter-spacing: 0.1px;
  text-shadow: 0px 1px 10px rgba(53, 26, 85, 0.35);

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
