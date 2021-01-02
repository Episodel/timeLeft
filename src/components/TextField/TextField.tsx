import React from 'react'
import styled from 'styled-components'

import { color } from '../../styles/Colors'

const { link } = color
const Input = styled.input`
  border: 2px solid grey;
  margin-top: 20px;
  padding: 10px;
  font-size: 2rem;
  border-radius: 10px;
  color: ${link};

  &:focus {
    outline: transparent;
    box-shadow: 2px 2px 8px grey;
  }
`

interface ITextField {
  type: string
  placeholder?: string
  value?: string | number
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField: React.FC<ITextField> = (props) => {
  const { placeholder, value, type, onChange, name } = props

  return (
    <Input
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
      name={name}
    />
  )
}

export default TextField
