import React from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as Star } from '../../../../../../../../assets/svgs/star-solid.svg'
import { ReactComponent as BananaCoin } from '../../../../../../../../assets/svgs/bitcoin-brands.svg'
import { GameCharacterType } from '../../../../../../../../state/gameState'

const Container = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;
  text-shadow: 0px 1px 10px rgba(53, 26, 85, 0.35), 0 1px 2px rgba(53, 26, 85, 0.35);

  &:not(:first-child) {
    margin-top: 10px;
  }
`

const pendingTurnAvatarClass = css`
  transform: scale(1.15);
`

const Avatar = styled.div<{
  pendingTurn: boolean
}>`
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.1);
  border: 2px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 1px 5px rgba(0, 20, 129, 0.19);
  margin-right: 8px;
  transition: all 300ms ease;
  ${props => (props.pendingTurn ? pendingTurnAvatarClass : '')}
`

const Name = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1;
  margin-bottom: 2px;
`

const Counts = styled.div`
  display: flex;
  align-items: center;
`

const Count = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`

const starSvgClass = css`
  svg {
    path {
      fill: rgb(109, 100, 238);
    }
  }
`

const coinsSvgClass = css`
  svg {
    path {
      fill: rgb(243, 233, 95);
    }
  }
`

const Icon = styled.div<{
  coins?: boolean
  star?: boolean
}>`
  ${props => (props.star ? starSvgClass : '')}
  ${props => (props.coins ? coinsSvgClass : '')}
  position: relative;
  margin-right: 3px;

  &::before {
    content: '';
    position: absolute;
    top: 9px;
    left: 9px;
    right: 9px;
    bottom: 9px;
    box-shadow: 0 0 10px 5px rgba(0, 20, 129, 0.19);
    border-radius: 50%;
  }

  svg {
    display: block;
    position: relative;
    top: -1px;
  }
`

const AvatarWrapper = styled.div`
  position: relative;
`

const ScorePosition = styled.div`
  position: absolute;
  right: 13px;
  bottom: 4px;
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const getAvatarBackgroundColour = (characterType: GameCharacterType): string => {
  switch (characterType) {
    case GameCharacterType.BANANA:
      return 'rgb(240, 219, 154)'
    case GameCharacterType.DONUT:
      return 'rgb(226, 168, 203)'
    case GameCharacterType.PEACH:
      return 'rgb(233, 166, 161)'
    default:
      return 'rgba(0, 0, 0, 0.1)'
  }
}

interface Props {
  pendingTurn: boolean
  name: string
  score: number
  coins: number
  scorePosition: number
  characterType: GameCharacterType
}

const PlayerScore: React.FC<Props> = ({ name, score, coins, scorePosition, characterType, pendingTurn }) => {
  return (
    <Container>
      <AvatarWrapper>
        <Avatar style={{ backgroundColor: getAvatarBackgroundColour(characterType) }} pendingTurn={pendingTurn} />
        <ScorePosition>{(scorePosition + 1).toString()}</ScorePosition>
      </AvatarWrapper>
      <div>
        <Name>{name}</Name>
        <Counts>
          <Count>
            <Icon star>
              <Star width={18} height={18} />
            </Icon>
            {score}
          </Count>
          <Count>
            <Icon coins>
              <BananaCoin width={18} height={18} />
            </Icon>
            {coins}
          </Count>
        </Counts>
      </div>
    </Container>
  )
}

export default PlayerScore
