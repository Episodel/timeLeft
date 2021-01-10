import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  border: 2px solid grey;
  margin-top: 20px;
  font-size: 2rem;
  border-radius: 10px;
  &:focus {
    outline: transparent;
    box-shadow: 2px 2px 8px grey;
  }

  padding: 10px 5px 10px 5px;
  text-align: center;
  width: 80px;
`

interface ITextField {
  type: string
  placeholder?: string
  value?: string | number
  name: string
  id?: string
  required?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField: React.FC<ITextField> = (props) => {
  const { placeholder, value, type, onChange, name, id, required } = props

  return (
    <Input
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
      name={name}
      id={id}
      required={required}
    />
  )
}

export default TextField
