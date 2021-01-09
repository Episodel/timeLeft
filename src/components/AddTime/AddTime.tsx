import React from 'react'
import Button from '../../styles/elements/Button'
import TextField from '../TextField'

const AddTime: React.FC = () => {
  return (
    <form>
      <label htmlFor="hour">
        <TextField id="hour" type="number" name="hour" placeholder="0" />
        Hours
      </label>
      <input type="number" />
      <input type="number" />
      <Button>Add</Button>
    </form>
  )
}

export default AddTime
