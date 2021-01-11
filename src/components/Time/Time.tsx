import React from 'react'
import styled from 'styled-components'
import { padTime } from '../../utils/padTime'

interface ITime {
  timeLeft: number
}

const StyleTime = styled.div`
  color: #ece7e7;
  font-size: 15rem;
  font-family: 'Major Mono Display', monospace;
  span {
    text-shadow: #999 1px 1px 5px;
  }
`

const Time: React.FC<ITime> = (props) => {
  const { timeLeft } = props

  const hours = padTime(Math.floor(timeLeft / 60 / 60))
  const minutes = padTime(Math.floor((timeLeft / 60) % 60))
  const seconds = padTime(Math.floor(timeLeft % 60))
  return (
    <StyleTime>
      <span>{hours}</span>
      <span>:</span>
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
    </StyleTime>
  )
}

export default Time
