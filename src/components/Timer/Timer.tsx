/* eslint-disable array-callback-return */
import React from 'react'
import styled from 'styled-components'
import Button from '../../styles/elements/Button'
import { Stop, Play, Pause } from '../icon'

interface ITimerProps {
  className?: string
}

interface IInitialTime {
  h?: number | null
  m?: number | null
  s?: number | null
}

const initialTime: Array<IInitialTime> = [
  { h: null, m: 5, s: null },
  { h: 1, m: 7, s: 50 },
  { h: null, m: null, s: 10 },
]

const padTime = (time: number) => {
  return time.toString().padStart(2, '0')
}

// const timeParse = (time: any) => {
//   const newTime = Object.fromEntries(
//     Object.entries(time).map(([k, v]) => [v, k])
//   )

//   return newTime.5
// }

const Timer: React.FC<ITimerProps> = ({ className }) => {
  const [timeLeft, setTimeLeft] = React.useState(50)
  const [isRunning, setIsRunning] = React.useState(false)
  const hours = padTime(Math.floor(timeLeft / 60 / 60))
  const minutes = padTime(Math.floor((timeLeft / 60) % 60))
  const seconds = padTime(Math.floor(timeLeft % 60))

  const intervalRef = React.useRef<number | null>(null)

  const startTimer = () => {
    if (intervalRef.current !== null) return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev >= 1) return prev - 1
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        resetTimer()
        return 0
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (intervalRef.current === null) return

    clearInterval(intervalRef.current)
    intervalRef.current = null

    setIsRunning(false)
  }

  const resetTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = null
    setTimeLeft(5)
    setIsRunning(false)
  }
  return (
    <div className={className}>
      <div className="time">
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="savedTime buttons">
        {initialTime.map((item) => (
          <Button>
            {`${item.h !== null ? `${item.h} h` : ''} 
            ${item.m !== null ? `${item.m} m` : ''}
            ${item.s !== null ? `${item.s} s` : ''}`}
          </Button>
        ))}
      </div>
      <div className="buttons">
        {!isRunning && (
          <Button type="button" onClick={startTimer}>
            <Play className="icon" />
          </Button>
        )}
        {isRunning && (
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
    span {
      text-shadow: #999 1px 1px 5px;
    }
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
