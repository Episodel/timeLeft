import React from 'react'
import Button from '../../styles/elements/Button'
import TextField from '../TextField'

const AddTime: React.FC<any> = (props) => {
  const { formData, setFormData, handleForm } = props
  const [btnDisabled, setBtnDisabled] = React.useState(true)

  const handleInput = (e: any) => {
    if (e.target.value !== '') {
      setBtnDisabled(false)
      setFormData({
        ...formData,
        [e.target.name]: +e.target.value,
      })
    }
  }
  return (
    <form onSubmit={handleForm}>
      <label htmlFor="hour">
        <TextField
          id="hour"
          type="number"
          name="h"
          placeholder="0"
          onChange={handleInput}
        />
        Hours
      </label>
      <label htmlFor="minutes">
        <TextField
          id="minutes"
          type="number"
          name="m"
          placeholder="0"
          onChange={handleInput}
        />
        minutes
      </label>
      <label htmlFor="seconds">
        <TextField
          id="seconds"
          type="number"
          name="s"
          placeholder="0"
          onChange={handleInput}
        />
        seconds
      </label>
      <Button type="submit" disabled={btnDisabled}>
        Save
      </Button>
    </form>
  )
}

export default AddTime
