/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import styled from 'styled-components'
import Button from '../../styles/elements/Button'
import TextField from '../TextField'

const AddTime: React.FC<any> = (props, className) => {
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

  const clearForm = () => {}
  return (
    <div className={className}>
      <FormTime className="addForm" onSubmit={handleForm}>
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
          Minutes
        </label>
        <label htmlFor="seconds">
          <TextField
            id="seconds"
            type="number"
            name="s"
            placeholder="0"
            onChange={handleInput}
          />
          Seconds
        </label>
        <Button type="submit" disabled={btnDisabled}>
          Save
        </Button>
      </FormTime>
    </div>
  )
}

const FormTime = styled.form`
  display: flex;
  justify-content: center;
`

export default AddTime
