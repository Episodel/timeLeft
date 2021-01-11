/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable array-callback-return */
import React from 'react'
import styled from 'styled-components'
import useSound from 'use-sound'
import sound from '../../sounds/clock.mp3'
import Button from '../../styles/elements/Button'
import { timeParse } from '../../utils/timeParse'
import AddTime from '../AddTime'
import SaveTime from '../SavedTime'
import { Stop, Play, Pause } from '../icon'
import { IInitialTime } from './interface'
import Time from '../Time'

interface ITimerProps {
  className?: string
}

const Timer: React.FC<ITimerProps> = ({ className }) => {
  const [timeLeft, setTimeLeft] = React.useState(0)
  const [timeVolume, setTimeVolume] = React.useState(0.02)
  const [isRunning, setIsRunning] = React.useState(false)
  const [initialTime, setInitialTime] = React.useState<IInitialTime[]>([])
  const [btnDisabled, setBtnDisabled] = React.useState(true)
  const [formData, setFormData] = React.useState<IInitialTime>({
    h: 0,
    m: 0,
    s: 0,
  })

  const intervalRef = React.useRef<number | null>(null)
  const chosenTime = React.useRef<number>(0)
  const clearForm = React.useRef<HTMLFormElement>(null)

  const [play, { stop }] = useSound(sound, { volume: timeVolume })

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
    setTimeLeft(chosenTime.current)
    setIsRunning(false)
    stop()
  }

  const handleChosenTime = (index: number) => {
    const setTime = initialTime.find((item, i) => i === index)
    if (setTime !== undefined) {
      chosenTime.current = timeParse(setTime)
    }
    setTimeLeft(chosenTime.current)
    startTimer()
    stop()
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeVolume(+e.target.value)
  }

  const handleForm = (e: any) => {
    e.preventDefault()
    if (clearForm.current !== null) clearForm.current.reset()
    const isTrue = Object.values(formData).some((v) => v !== 0)
    if (isTrue) {
      const newArr = [...initialTime, formData]
      setInitialTime(newArr)
      setBtnDisabled(true)
    }
  }
  return (
    <div className={className}>
      <Time timeLeft={timeLeft} />
      {initialTime && (
        <div className="savedTime">
          <div className="buttons">
            <SaveTime
              handleChosenTime={handleChosenTime}
              initialTime={initialTime}
            />
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
          value={timeVolume}
          onChange={handleVolume}
        />
      </div>
      <AddTime
        formData={formData}
        setFormData={setFormData}
        handleForm={handleForm}
        clearForm={clearForm}
        btnDisabled={btnDisabled}
        setBtnDisabled={setBtnDisabled}
      />
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
