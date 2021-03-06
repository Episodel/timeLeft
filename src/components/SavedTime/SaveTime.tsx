import React from 'react'
import Button from '../../styles/elements/Button'
import { IInitialTime } from '../Timer/interface'

interface ISaveTime {
  initialTime: Array<IInitialTime>
  handleChosenTime: (i: number) => void
}

const SaveTime: React.FC<ISaveTime> = (props) => {
  const { initialTime, handleChosenTime } = props
  return (
    <div>
      <h2 className="timeTitle">Save time</h2>
      <div className="buttons">
        {initialTime.map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Button key={i} onClick={() => handleChosenTime(i)}>
            {`${item.h !== 0 ? `${item.h} h` : ''} 
            ${item.m !== 0 ? `${item.m} m` : ''}
            ${item.s !== 0 ? `${item.s} s` : ''}`}
          </Button>
        ))}
        {/* <Button type="button">Add</Button> */}
      </div>
    </div>
  )
}

export default SaveTime
