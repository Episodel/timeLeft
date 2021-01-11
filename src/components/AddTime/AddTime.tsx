/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import styled from 'styled-components'
import Button from '../../styles/elements/Button'
import TextField from '../TextField'

const FormTime = styled.form`
  display: flex;
  justify-content: center;
`

const AddTime: React.FC<any> = (props) => {
  const {
    formData,
    setFormData,
    handleForm,
    clearForm,
    btnDisabled,
    setBtnDisabled,
  } = props

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
    <FormTime onSubmit={handleForm} ref={clearForm}>
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
  )
}

export default AddTime
