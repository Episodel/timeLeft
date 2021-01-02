import React from 'react'
import styled from 'styled-components'
import Button from '../../styles/elements/Button'
import { Stop, Play, Pause } from '../icon'

interface ITimerProps {
  className?: string
}

const padTime = (time: number) => {
  return time.toString().padStart(2, '0')
}

const Timer: React.FC<ITimerProps> = ({ className }) => {
  const [timeLeft, setTimeLeft] = React.useState(5)
  const [start, setStart] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const hours = padTime(Math.floor(timeLeft / 60 / 60))
  const minutes = padTime(Math.floor((timeLeft / 60) % 60))
  const seconds = padTime(Math.floor(timeLeft % 60))

  const intervalRef = React.useRef<number | null>(null)

  const startTimer = () => {
    if (intervalRef.current !== null) return
    setStart(true)
    setTitle('start')
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev >= 1) return prev - 1
        return 0
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (intervalRef.current === null) return
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setStart(false)
    setTitle('stop')
  }

  const resetTimer = () => {
    setTitle('reset')
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
    }
    // const intervalRef: React.MutableRefObject<number | null> check this information
    // clearInterval(intervalRef.current)
    intervalRef.current = null
    setTimeLeft(5)
    setStart(false)
  }
  return (
    <div className={className}>
      <h1>{title}</h1>
      <div className="time">
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="savedTime">
        <span>5</span>
        <span>10</span>
        <span>15</span>
        <span>1</span>
      </div>
      <div className="buttons">
        {!start && (
          <Button type="button" onClick={startTimer}>
            <Play className="icon" />
          </Button>
        )}
        {start && (
          <Button type="button" onClick={stopTimer}>
            <Pause className="icon" />
          </Button>
        )}
        <Button type="button" onClick={resetTimer}>
          <Stop className="icon" />
        </Button>
      </div>
    </div>
  )
}

export default styled(Timer)`
  .time {
    color: #ece7e7;
    font-size: 15rem;
    font-family: 'Major Mono Display', monospace;
  }

  .buttons {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        animation: strok 1s reverse;
      }
    }
  }

  .buttons button:not(:last-child) {
    margin-right: 10px;
  }

  .icon {
    width: 30px;
    height: 30px;
    stroke: #fff;
    fill: transparent;
    stroke-miterlimit: 10;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 400;
  }

  @keyframes strok {
    100% {
      stroke-dashoffset: 400;
    }
  }
`
