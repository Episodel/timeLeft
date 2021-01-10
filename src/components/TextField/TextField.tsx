import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  border: none;
  margin-top: 20px;
  font-size: 2rem;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  &:focus {
    outline: transparent;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  }

  padding: 10px 5px 10px 5px;
  text-align: center;
  width: 80px;
  background-color: transparent;
  margin-right: 8px;
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
