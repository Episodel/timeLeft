/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable array-callback-return */
import React from 'react'
import styled from 'styled-components'
import useSound from 'use-sound'
import sound from '../../sounds/clock.mp3'
import Button from '../../styles/elements/Button'
import { Stop, Play, Pause } from '../icon'

interface ITimerProps {
  className?: string
}

interface IInitialTime {
  h: number | string
  m: number | string
  s: number | string
}

const initialTime: Array<IInitialTime> = [
  { h: 0, m: 5, s: 0 },
  { h: 0, m: 7, s: 0 },
  { h: 0, m: 15, s: 0 },
  { h: 0, m: 0, s: 3 },
  { h: 1, m: 7, s: 50 },
]

const padTime = (time: number) => {
  return time.toString().padStart(2, '0')
}

const timeParse = (time: any) => {
  let setTime = 0
  Object.entries(time).forEach(([key, value]: any) => {
    if (key === 'h') {
      setTime += value * 3600
    }
    if (key === 'm') {
      setTime += value * 60
    }
    if (key === 's') {
      setTime += value
    }
  })

  return setTime
}

const Timer: React.FC<ITimerProps> = ({ className }) => {
  const [timeLeft, setTimeLeft] = React.useState(0)
  const [timeVolume, setTimeVolume] = React.useState(0.01)
  const [isRunning, setIsRunning] = React.useState(false)
  const hours = padTime(Math.floor(timeLeft / 60 / 60))
  const minutes = padTime(Math.floor((timeLeft / 60) % 60))
  const seconds = padTime(Math.floor(timeLeft % 60))

  const intervalRef = React.useRef<number | null>(null)
  const intervalTime = React.useRef<number>(0)

  const [play, { stop, isPlaying }] = useSound(sound, { volume: timeVolume })

  const startTimer = () => {
    if (intervalRef.current !== null) return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev >= 1) return prev - 1
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        resetTimer()
        play()
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
    setTimeLeft(intervalTime.current)
    setIsRunning(false)
    stop()
  }

  const handleSavedTime = (index: number) => {
    const setTime = initialTime.find((item, i) => i === index)
    intervalTime.current = timeParse(setTime)
    stop()
    setTimeLeft(intervalTime.current)
    startTimer()
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log()

    setTimeVolume(+e.target.value)
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
      {initialTime && (
        <div className="savedTime">
          <h2 className="timeTitle">Save time</h2>
          <div className="buttons">
            {initialTime.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Button key={i} onClick={() => handleSavedTime(i)}>
                {`${item.h !== 0 ? `${item.h} h` : ''} 
            ${item.m !== 0 ? `${item.m} m` : ''}
            ${item.s !== 0 ? `${item.s} s` : ''}`}
              </Button>
            ))}
          </div>
        </div>
      )}
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
        <input
          type="range"
          min="0"
          max="0.1"
          step="0.005"
          onChange={handleVolume}
        />
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

  .savedTime {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ece7e7;

    .timeTitle {
      font-size: 2rem;
      font-family: 'Major Mono Display', monospace;
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
